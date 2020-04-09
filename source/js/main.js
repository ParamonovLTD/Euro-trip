'use strict';

const escKeyCode = 27;
const enterKeyCode = 13;
const body = document.body;


function isEnterEvent (evt, cb) {
  if (evt.keyCode === enterKeyCode) {
    cb();
  }
}
function isEscapeEvent (evt, cb) {
  if (evt.keyCode === escKeyCode) {
    cb();
  }
}


function onDOMLoaded () {
  const telInputs = document.querySelectorAll('input[type="tel"]');
  const mailInputs = document.querySelectorAll('input[type="email"]');

  telInputs.forEach((telInput) => {
    telInput.value = JSON.parse(localStorage.getItem('phoneNumber'));
  })
  mailInputs.forEach((mailInput) => {
    mailInput.value = JSON.parse(localStorage.getItem('emailAddress'));
  })
}


function DOMLoaded () {
  document.addEventListener('DOMContentLoaded', onDOMLoaded);
}
DOMLoaded();


function smoothAnimationForAnchors () {
  const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockId = anchor.getAttribute('href');

      document.querySelector('' + blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  })
}
smoothAnimationForAnchors();


function numberMaskSet () {
  const telInputs = document.querySelectorAll('.form__input-control input[type="tel"]');

  telInputs.forEach(function (telInput) {
    Inputmask("+7 999 999 99 99", {
      placeholder: '',
      showMaskOnHover: false,
      showMaskOnFocus: false
    }).mask(telInput);
  })
}
numberMaskSet();


const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__nav');
const menuButtons = menu.querySelectorAll('.header__link');

function menuOpen () {
  menu.classList.remove('header__nav--nojs');
}
menuOpen();


function onMenuToggle () {
  if (!menu.classList.contains('header__nav--opened')) {
    menu.classList.add('header__nav--opened');
  }
  else {
    menu.classList.remove('header__nav--opened');
    body.classList.remove('body--scroll-locked');
  }
}


function onMenuLinkClick () {
  menuButtons.forEach((link) => {
    link.addEventListener('click', onMenuToggle)
  })
}
onMenuLinkClick();


function menuToggle () {
  burger.addEventListener('click', onMenuToggle);
}
menuToggle();


function onMenuFullWidth () {
  if (document.documentElement.clientWidth === menu.offsetWidth) {
    body.classList.add('body--scroll-locked');
  } else {
    body.classList.remove('body--scroll-locked');
  }
}


function menuFullWidth () {
  burger.addEventListener('click', onMenuFullWidth);
}
menuFullWidth();


const tabsButtons = document.querySelectorAll('.tabs__button');
const detailedLinks = document.querySelectorAll('.tours__link');

function tabsToggle (evt) {
  const clickedButtonId = evt.target.id;
  const splitedButtonId = clickedButtonId.split('_')[0];
  const clickedLinkId = evt.target.id;
  const splitedLinkId = clickedLinkId.split('_')[0] + '_btn';
  const currentButton = document.querySelector('.tabs__button--current');
  const descriptions = document.querySelectorAll('.description__tour-info');
  const currentDescription = document.querySelector('.tour-info--current');

  tabsButtons.forEach(function (button) {
    if ((button.id === clickedButtonId || button.id === splitedLinkId) && button.id !== currentButton.id) {
      currentButton.classList.remove('tabs__button--current');
      button.classList.add('tabs__button--current');
    }
  });

  descriptions.forEach(function (description) {
    if (description.id === splitedButtonId && description.id !== currentDescription.id) {
      currentDescription.classList.remove('tour-info--current');
      description.classList.add('tour-info--current');
    }
  });
}
tabsButtons.forEach(function (button) {
  button.addEventListener('click', tabsToggle)
});
detailedLinks.forEach(function (link) {
  link.addEventListener('click', tabsToggle)
});


const popupPurchase = document.querySelector('.purchase');
const popupPurchaseCloseButton = popupPurchase.querySelector('.popup__close');

function onPopupPurchaseEscapePress (evt) {
  isEscapeEvent(evt, onPopupPurchaseClose);
}
function onButtonEnterPress (evt) {
  isEnterEvent(evt, onPopupPurchaseOpen);
}
function onPopupPurchaseOverlayClick (evt) {
  if (!evt.target.closest('.purchase')) {
    onPopupPurchaseClose();
  }
}


function onPopupPurchaseOpen (evt) {
  evt.preventDefault();

  const formTelInput = popupPurchase.querySelector('.form__input-control input[type="tel"]');

  popupPurchase.classList.add('popup--opened');
  setTimeout(popupPurchaseClose, 100);

  body.classList.add('body--scroll-locked');
  formTelInput.focus();
}


function popupPurchaseOpen () {
  const descriptionButtons = document.querySelectorAll('.tour-info__button');
  const pricesButtons = document.querySelectorAll('.card__button');

  descriptionButtons.forEach(function (button) {
    button.addEventListener('click', onPopupPurchaseOpen);
    button.addEventListener('keydown', onButtonEnterPress);
  });
  pricesButtons.forEach(function (button) {
    button.addEventListener('click', onPopupPurchaseOpen);
    button.addEventListener('keydown', onButtonEnterPress);
  });
}
popupPurchaseOpen();


function onPopupPurchaseClose () {
  if (popupPurchase) {
    popupPurchase.classList.remove('popup--opened');
    body.classList.remove('body--scroll-locked');
  }

  popupPurchaseCloseButton.removeEventListener('click', onPopupPurchaseClose);
  document.removeEventListener('click', onPopupPurchaseOverlayClick);
  window.removeEventListener('keydown', onPopupPurchaseEscapePress);
}


function popupPurchaseClose () {
  popupPurchaseCloseButton.addEventListener('click', onPopupPurchaseClose);
  document.addEventListener('click', onPopupPurchaseOverlayClick);
  window.addEventListener('keydown', onPopupPurchaseEscapePress);
}


const popupSuccess = document.querySelector('.success');
const popupSuccessCloseButton = popupSuccess.querySelector('.popup__close');
const feedback = document.querySelector('.feedback');

function onPopupSuccessEscapePress (evt) {
  isEscapeEvent(evt, onPopupSuccessClose);
}
function onPopupSuccessOverlayClick (evt) {
  if (!evt.target.closest('.success')) {
    onPopupSuccessClose();
  }
}


function onPopupSuccessOpen (evt) {
  evt.preventDefault();

  popupSuccess.classList.add('popup--opened');
  setTimeout(popupSuccessClose, 100);

  body.classList.add('body--scroll-locked');
  popupSuccessCloseButton.focus();
}


function formValidityCheck (currentFormWrapper) {
  const currentForm = currentFormWrapper.querySelector('form');
  currentForm.setAttribute('novalidate', 'novalidate');

  currentForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (formInputsValidityCheck(currentForm)) {
      const currentTelInputValue = currentForm.querySelector('input[type="tel"]').value;
      const currentMailInputValue = currentForm.querySelector('input[type="email"]').value;

      currentForm.reset();
      localStorage.setItem('phoneNumber', JSON.stringify(currentTelInputValue));
      localStorage.setItem('emailAddress', JSON.stringify(currentMailInputValue))
      onPopupSuccessOpen(evt);
    }
  });
}
formValidityCheck(feedback);
formValidityCheck(popupPurchase);


function onPopupSuccessClose () {
  if (popupSuccess) {
    popupSuccess.classList.remove('popup--opened');
    body.classList.remove('body--scroll-locked');
  }

  popupSuccessCloseButton.removeEventListener('click', onPopupSuccessClose);
  document.removeEventListener('click', onPopupSuccessOverlayClick);
  window.removeEventListener('keydown', onPopupSuccessEscapePress);
}


function popupSuccessClose () {
  popupSuccessCloseButton.addEventListener('click', onPopupSuccessClose);
  document.addEventListener('click', onPopupSuccessOverlayClick);
  window.addEventListener('keydown', onPopupSuccessEscapePress);

  if (window.matchMedia('(max-width: 767px)').matches) {
    popupSuccess.addEventListener('click', onPopupSuccessClose)
  }
}


function formInputsValidityCheck (currentForm) {
  const phone = currentForm.querySelector('input[type="tel"]');
  const mail = currentForm.querySelector('input[type="email"]');
  const phoneValue = phone.value.trim();
  const mailValue = mail.value.trim();
  let phoneValueSplited;
  let isPhoneValid = false;
  let isMailValid = true;

  if (phoneValue) {
    phoneValueSplited = phoneValue.split('+')[1].split(' ').join('').trim();
  }

  if (phoneValue && phoneValueSplited.length !== 11) {
    setErrorFor(phone, 'Данные не верны');
  } else if (phoneValue === '') {
    setErrorFor(phone, 'Данные не верны');
  } else {
    isPhoneValid = true;
    setSuccessFor(phone);
  }

  if (!mailValue.includes('@') && mailValue !== '') {
    isMailValid = false;
    setErrorFor(mail, 'Данные не верны');
  } else {
    setSuccessFor(mail);
  }

  return isPhoneValid && isMailValid;
}


function setErrorFor (input, message) {
  const inputControl = input.parentElement;
  const small = inputControl.querySelector('small');
  inputControl.classList.add('form__input-control--error');
  small.textContent = message;
}


function setSuccessFor (input) {
  const inputControl = input.parentElement;
  inputControl.classList.remove('form__input-control--error');
}


function footerEmailChange () {
  const emailFooter = document.querySelector('.footer .contacts__link[href^="mailto"]');

  if (window.matchMedia('(max-width: 1023px)').matches) {
    emailFooter.textContent = 'Почта';
  } else {
    emailFooter.textContent = 'puteshestviemechta@gmail.ru';
  }
}
footerEmailChange();
