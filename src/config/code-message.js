 /*
      服务器没开 Network Error ---> error.message
      请求超时 timeout of 1000ms exceeded 
      没网 Network Error
      error.response 如果有值，服务器返回了响应 / 如果没有值，服务器没有返回响应
      error.response.status 401 没有携带token
      401 token过期或无效
      404 资源找不到
      403 禁止访问
      500 服务器内部错误
    */

export default {
  401: '没有权限访问接口',
  403: '禁止访问',
  404: '资源不存在',
  500: '哇哦，故障了，请联系管理员~'
}