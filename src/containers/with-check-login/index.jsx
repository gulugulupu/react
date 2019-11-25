/* 
  登陆检查
*/
import React, { Component } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";



//高阶组件   接受一个组件作为参数   返回一个新组建
//CheckLogin  登陆检查
const withChecklogin =WrappedComponent =>{
  return connect (
    state =>({token:state.user.token}),
    null
  )(
    class extends Component{
      static displayName=`CheckLogin(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;
      render() {
        const {
          token,
          location,
          ...rest
        }=this.props;
        if(location.pathname ==="/login"){
          if(token){
            return<Redirect to ="/" />;
          }
        }else{
          if (!token) {
            return <Redirect to="/login" />;
          }
        }
        return <WrappedComponent {...rest} location={location} />;
        }
    }
  );
};
export default withChecklogin;