'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var formScaleValue = form.querySelector('.scale__control--value');
  var formScaleMinus = form.querySelector('.scale__control--smaller');
  var formScalePlus = form.querySelector('.scale__control--bigger');
  var formPreview = form.querySelector('.img-upload__preview');
  var formImgPreview = formPreview.querySelector('img');

  var STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var scale = 100;

  var scaleMinus = function () {
    if (scale <= MAX_SCALE_VALUE) {
      scale = scale - STEP;
      formScaleValue.value = scale + '%';
      formImgPreview.style.transform = 'scale(' + scale / 100 + ')';
    }
  };

  var scalePlus = function () {
    if (scale >= MIN_SCALE_VALUE) {
      scale = scale + STEP;
      formScaleValue.value = scale + '%';
      formImgPreview.style.transform = 'scale(' + scale / 100 + ')';
    }
  };

  formScaleMinus.addEventListener('click', scaleMinus);
  formScalePlus.addEventListener('click', scalePlus);

})();