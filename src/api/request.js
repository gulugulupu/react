/*
  封装axios
*/
import axios from  'axios';
import {
  message
} from 'antd';
import store from '../redux/store';
import codeMessage from '../config/code-message';
import {
  removeItem
} from '../utils/storage';
import history from '../utils/history';
import {
  removeUserSuccess
} from '../redux/action-creators/user'


// axiosInstance就是Axios实例对象，它的用法和axios基本一样
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // 基础路径：所有请求的公共路径
  timeout: 10000, // 如果请求超过10s都没有响应结果，就自动中断请求
  headers: {
    // 公共的请求头参数
  },
});

// 设置axios拦截器
// 请求拦截器: 在axios发送请求之前触发的拦截器回调函数
axiosInstance.interceptors.request.use(
  // 将要发送请求是成功的（内部没有出错）触发回调函数
  (config) => {
    // console.log(config); // 请求配置信息
    // 功能：修改请求信息
    if (config.method === 'post') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
      /* 
        修改data数据 成 urlencoded
          { key1: value1, key2: value2 } ---> 'key1=value1&key2=value2'
      */
      config.data = Object.keys(config.data).reduce((prev, key) => {
        const value = config.data[key];
        return prev + `&${key}=${value}`;
      }, '').substring(1);
    }

    // 从redux中读取user数据, 从user中读取token
    const {
      user: {
        token
      }
    } = store.getState();

    if (token) {
      config.headers.authorization = 'Bearer ' + token;
    }

    return config;
  },
  // 将要发送请求是失败的（内部出错了）触发回调函数
  /* (error) => {
    // 一般没啥用，所以一般不写
    return Promise.reject(error);
  } */
)
// 响应拦截器
axiosInstance.interceptors.response.use(
  // 响应成功触发的回调函数（status: [200, 300)）
  // 响应成功之后，用户设置回调函数之前触发
  ({
    data
  }) => {

    // 统一处理：功能成功/失败
    if (data.status === 0) {
      // 返回成功的数据
      return data.data;
    } else {
      // 功能失败
      message.error(data.msg)
      return Promise.reject(data.msg);
    }
  },
  // 响应失败触发的回调函数
  (error) => {
    let errorMessage = '';

    if (error.response) {
      // 说明服务器返回了响应
      errorMessage = codeMessage[error.response.status] || '未知错误';
    if (error.response.status ===401){
      //token有问题
      //清空本地token    重定向到login
      //先清空数据  再跳转
      removeItem();
      store.dispatch(removeUserSuccess());
      history.push('/login');
    }
    



    } else {
      // 说明服务器没有返回响应，请求还没给服务器 / 还没有接受到服务器的响应 请求就终止了
      if (error.message.indexOf('Network Error') !== -1) {
        errorMessage = '请检查网络连接';
      } else if (error.message.indexOf('timeout') !== -1) {
        errorMessage = '网络太卡了，请充钱';
      } else {
        errorMessage = '未知错误';
      }
    }
    message.error(errorMessage);
    return Promise.reject(errorMessage);
  }
)

export default axiosInstance;
