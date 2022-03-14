'use strict';
const UserName = document.querySelector('#user-name')
const UserId = document.querySelector('#user-id')
const UserPass = document.querySelector('#user-pass')
const UserPass1 = document.querySelector('#user-pass1')
const UserEmail = document.querySelector('#user-email')
const UserMobile = document.querySelector('#user-tel')
const Btn = document.querySelector('button');
let regId = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/,
    regPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, 
    regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    regMobile = /^\d{3}-\d{3,4}-\d{4}$/;


import Attention from './attention.js';

//약관동의 모두체크
function checkBox(){
    agree.checked = all.checked;
    poll.checked = all.checked; 
}

//약관동의 체크
function check(){
  if(agree.checked && poll.checked){
    all.checked = true;
  }else if(!agree.checked || !poll.checked){
    all.checked = false;
  }
}  

//회원가입 폼 유효성 검사
function verify(){
  if(UserName.value == ""){   
    Attention(UserName,'이름을 입력하세요')
    return
  }else if(UserId.value == ""){
    Attention(UserId, '아이디를 입력하세요')
    return
  }else if(!regId.test(UserId.value)){
    Attention(UserId, '아이디를 형식에 맞게 다시 입력하세요')
    return
  }else if(UserPass.value == ""){
    Attention(UserPass, '비밀번호를 입력하세요')
    return
  }else if(!regPw.test(UserPass.value)){
    Attention(UserPass, '비밀번호는 영문자 + 숫자 + 특수문자 조합으로 8~15자리 사용해야 합니다')
    return
  }else if(UserPass1.value == ""){
    Attention(UserPass1, '비밀번호를 입력하세요.')
    return
  }else if(UserPass1.value !== UserPass.value){
    Attention(UserPass1, '비밀번호가 일치하지 않습니다.')
    return
  }else if(UserEmail.value == ""){
    Attention(UserEmail, '이메일을 입력하세요')
    return
  }else if(!regEmail.test(UserEmail.value)){
    Attention(UserEmail, '이메일 형식에 맞게 다시 입력하세요')
    return
  }else if(UserMobile.value == ""){
    Attention(UserMobile, '전화번호를 입력하세요')
    return
  }else if(!regMobile.test(UserMobile.value)){
    Attention(UserMobile, '전화번호를 형식에 맞게 다시 입력하세요')
    return
  } else if(!agree.checked){
    alert('약관동의를 클릭해주세요')
    return
  }else if(!poll.checked){
    alert('개인정보 동의를 클릭해주세요')
    return
  }
}

//회원가입버튼
function joinClick(e){  
  e.preventDefault();
  verify();
}

all.addEventListener('click', checkBox);
agree.addEventListener('click', check);
poll.addEventListener('click', check);
Btn.addEventListener('click',joinClick);

