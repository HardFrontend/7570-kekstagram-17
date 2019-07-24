// насыщенности фильтра

'use strict';

(function () {
  // загрузка фотографии
  var popup = document.querySelector('.img-upload__overlay'); // pop up
  var form = document.querySelector('.img-upload__form');
  var uploadFileElement = document.querySelector('.img-upload__start'); // фото элемент
  var popupClose = popup.querySelector('.img-upload__cancel');
  var userCommentTextarea = popup.querySelector('.text__description');
  var ESC_KEYCODE = 27;

  var onPopupEscPress = function (evt) {
    var isFocusedTextarea = (document.activeElement === userCommentTextarea);
    if (evt.keyCode === ESC_KEYCODE && !isFocusedTextarea) {
      onButtonClose();
    }
  };

  var onImageChange = function () {
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onButtonClose = function () {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadFileElement.addEventListener('change', onImageChange);
  popupClose.addEventListener('click', onButtonClose);

  var imgPreviewContainer = popup.querySelector('.img-upload__preview');
  var imgPreview = imgPreviewContainer.querySelector('img');
  var fieldsetElement = popup.querySelector('.img-upload__effects');

  var levelEffect = popup.querySelector('.effect-level__pin');
  var levelEffectDepth = popup.querySelector('.effect-level__depth');
  var levelEffectLine = popup.querySelector('.effect-level__line');

  var applyFilter = function (percentage) {
    var checked = fieldsetElement.querySelector('input:checked');
    var filter;
    switch (checked.value) {
      case 'chrome':
        filter = 'grayscale(' + percentage / 100 + ')';
        break;
      case 'sepia':
        filter = 'sepia(' + percentage / 100 + ')';
        break;
      case 'marvin':
        filter = 'invert(' + percentage + '%)';
        break;
      case 'phobos':
        filter = 'blur(' + 3 * percentage / 100 + 'px)';
        break;
      case 'heat':
        filter = 'brightness(' + 3 * percentage / 100 + ')';
        break;
      default:
        imgPreview.style.filter = 'none';
    }
    imgPreview.style.filter = filter;
  };

  fieldsetElement.addEventListener('change', function () {
    applyFilter(100);
    levelEffect.style.left = 100 + '%';
    levelEffectDepth.style.width = 100 + '%';
  });

  levelEffect.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var rectCoords = levelEffectLine.getBoundingClientRect();
    var maxCoords = rectCoords.right;
    var minCoords = rectCoords.left;
    var fullWIdht = rectCoords.right - rectCoords.left;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var filterPercent = (levelEffect.offsetLeft - shift.x) / (fullWIdht / 100);

      if (startCoords.x >= minCoords && startCoords.x <= maxCoords) {
        levelEffect.style.left = (levelEffect.offsetLeft - shift.x) + 'px';
        levelEffectDepth.style.width = filterPercent + '%';
        applyFilter(filterPercent);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  var main = document.querySelector('main');
  var successShowMessege = document.querySelector('#success').content
    .querySelector('.success');
  var successFormButton = successShowMessege.querySelector('.success__button');
  var successFormInner = successShowMessege.querySelector('.success__inner');
  var successFormLabel = document.querySelector('.img-upload__label');

  var successShowMessegeError = document.querySelector('#error').content
    .querySelector('.error');
  var successShowMessegeErrorBtn = successShowMessegeError.querySelectorAll('.error__button');


  var onPopupFormSendEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onFormClose();
    }
  };

  var onPlaceClick = function (evt) {
    if (evt.target !== successFormInner) {
      onFormClose();
    }
  };

  var onFormClose = function () {
    successShowMessege.classList.add('hidden');
    document.removeEventListener('keydown', onPopupFormSendEscPress);
    document.removeEventListener('click', onPlaceClick);
    successFormButton.removeEventListener('click', onFormClose);
  };

  window.formSend = function () {
    popup.classList.add('hidden');
    successFormLabel.style.backgroundImage = 'inherit';
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successShowMessege);
    main.appendChild(fragment);

    document.addEventListener('keydown', onPopupFormSendEscPress);
    document.addEventListener('click', onPlaceClick);
    successFormButton.addEventListener('click', onFormClose);
  };

  var onMessegeErrorBtn = function () {
    successShowMessegeError.classList.add('hidden');
  };

  window.errorHandler = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successShowMessegeError);
    main.appendChild(fragment);

    for (var i = 0; i < successShowMessegeErrorBtn.length; i++) {
      successShowMessegeErrorBtn[i].addEventListener('click', onMessegeErrorBtn);
    }
  };


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    console.log('click');
    popup.classList.add('hidden');
    window.upload(new FormData(form), window.formSend, window.errorHandler);
  });

})();
