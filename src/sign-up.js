'use strict';

import { printEmailErrorMessage } from './email.js';
import { toggleEyeIcon } from './password-icon.js';

const formSignUp = document.querySelector('#sign-up');
const inputEmail = document.querySelector('#email');
const emailErrorMessage = document.querySelector('.email-error-msg');
const inputPassword = document.querySelector('#password');
const passwordErrorMessage = document.querySelector('.password-error-msg');
const inputDoubleCheckPassword = document.querySelector('#check-password');
const doubleCheckPasswordErrorMessage = document.querySelector(
  '.check-password-error-msg'
);
const eyeIcon = document.querySelectorAll('.hide-password');

// 비밀번호 생성 유효성 검사
function isStrongPassword(value) {
  let regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  return regExp.test(value);
}

// 비밀번호 생성 유효성 검사 후 에러 메시지 표시
function printPasswordErrorMessage() {
  const value = inputPassword.value;

  if (!value) {
    passwordErrorMessage.textContent = '비밀번호를 입력해주세요.';
    inputPassword.classList.add('input__error');
    return false;
  }

  if (!isStrongPassword(value)) {
    passwordErrorMessage.textContent =
      '비밀번호는 영문, 숫자 조합 8자 이상 입력해주세요.';
    inputPassword.classList.add('input__error');
    return false;
  }

  passwordErrorMessage.textContent = '';
  inputPassword.classList.remove('input__error');
  return true;
}

// 비밀번호와 비밀번호 확인이 같지 않다면 에러 메시지 표시
function printDoubleCheckPasswordErrormessage() {
  const password = inputPassword.value;
  const checkPassword = inputDoubleCheckPassword.value;

  if (checkPassword === '' || password !== checkPassword) {
    doubleCheckPasswordErrorMessage.textContent = '비밀번호가 일치하지 않아요.';
    inputDoubleCheckPassword.classList.add('input__error');
    return false;
  }

  doubleCheckPasswordErrorMessage.textContent = '';
  inputDoubleCheckPassword.classList.remove('input__error');
  return true;
}

// 이미 존재하는 이메일인지 확인
function isUnresisteredEmail() {
  const value = inputEmail.value;

  if (value === 'test@codeit.com') {
    emailErrorMessage.textContent = '이미 사용 중인 이메일입니다.';
    inputEmail.classList.add('input__error');
    return false;
  }

  emailErrorMessage.textContent = '';
  inputEmail.classList.remove('input__error');
  return true;
}

// 비밀번호 확인란에 이미 입력 후, 비밀번호란에 추가로 입력 시, 비밀번호 확인란에 에러 메시지 표시
function checkAgainDoubleCheckPassword(e) {
  const password = e.target.value;
  const doubleCheckPassword = inputDoubleCheckPassword.value;

  if (doubleCheckPassword !== '' && password !== doubleCheckPassword) {
    doubleCheckPasswordErrorMessage.textContent = '비밀번호가 일치하지 않아요.';
    inputDoubleCheckPassword.classList.add('input__error');
  }

  doubleCheckPasswordErrorMessage.textContent = '';
  inputDoubleCheckPassword.classList.remove('input__error');
}

// 회원가입 시도 시, 한번 더 에러 요소 확인 후, 성공시 folder로 이동
function signUp(e) {
  e.preventDefault();
  const checkEmail = emailCheckBeforeSubmit();
  const checkPassword = passwordCheckBeforeSubmit();
  const doubleCheckPassword = doubleCheckPasswordBeforeSubmit();

  if (checkEmail && checkPassword && doubleCheckPassword) {
    window.location.href = '../folder.html';
  }
}

function emailCheckBeforeSubmit() {
  const isCorrectEmail = printEmailErrorMessage();
  if (!isCorrectEmail) {
    return false;
  }
  const unresisteredEmail = isUnresisteredEmail();
  unresisteredEmail ? true : false;
}

function passwordCheckBeforeSubmit() {
  const isCorrectPassword = printPasswordErrorMessage();
  isCorrectPassword ? true : false;
}

function doubleCheckPasswordBeforeSubmit() {
  const isCorrectdoubleCheck = printDoubleCheckPasswordErrormessage();
  isCorrectdoubleCheck ? true : false;
}

inputEmail.addEventListener('focusout', printEmailErrorMessage);
inputPassword.addEventListener('focusout', printPasswordErrorMessage);
inputDoubleCheckPassword.addEventListener(
  'focusout',
  printDoubleCheckPasswordErrormessage
);
inputPassword.addEventListener('keyup', checkAgainDoubleCheckPassword);
eyeIcon.forEach((icon) => {
  icon.addEventListener('click', toggleEyeIcon);
});
formSignUp.addEventListener('submit', signUp);
