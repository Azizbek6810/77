const loginButton = document.querySelector('.login-button');
const loginWrapper = document.querySelector('.login-wrapper');
const loginBackground = document.querySelector('.login-background');
const loginContent = document.querySelector('.login-content');
const loginClose = document.querySelector('.login-close');
const iconEyeClosed = document.querySelector('.icon-eye-closed');
const passwordInput = document.querySelector('#password-label');
let dropdownWrapper = document.querySelector('.dropdown-wrapper');

let isLoginContentOpened = false;

const renderLoginContent =()=>{

}

loginButton.addEventListener('click', () => {
  isLoginContentOpened = !isLoginContentOpened;

  if (isLoginContentOpened) {
    loginContent.classList.add('!opacity-100');
    loginContent.classList.add('!visible');
    dropdownBackground.classList.add("!opacity-100")
    dropdownBackground.classList.add("!visible")
  } else {
    loginContent.classList.remove('!opacity-100');
    loginContent.classList.remove('!visible');
    dropdownBackground.classList.remove("!opacity-100")
    dropdownBackground.classList.remove("!visible")
  }
})

loginClose.addEventListener("click", () => {
  isLoginContentOpened = !isLoginContentOpened;

  loginContent.classList.remove('!opacity-100');
  loginContent.classList.remove('!visible');
  dropdownBackground.classList.remove("!opacity-100")
  dropdownBackground.classList.remove("!visible")
})

iconEyeClosed.addEventListener('click', () => {
//   passwordInput.getAttribute("")
})
