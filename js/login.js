const LoginId = document.querySelector('#loginId');
const LoginPw = document.querySelector('#loginPw');
const LoginBtn = document.querySelector('#login-btn');
const JoinBtn = document.querySelector('#join-btn');

import Attention from './attention.js';


function init(){
  LoginBtn.addEventListener('click', () => {
    if(LoginId.value == ""){
      Attention(LoginId, '아이디를 입력하세요');
      return
    }else if(LoginPw.value == ""){
      Attention(LoginPw, '비밀번호를 입력하세요');
      return
    }
  });
};

window.addEventListener('DOMContentLoaded',init);
