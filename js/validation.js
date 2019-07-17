'use strict';

(function () {
  var popup = document.querySelector('.img-upload__overlay'); // pop up
  var popupHashtags = popup.querySelector('.text__hashtags');
  var MIN_HASHTAG = 2;
  var MAX_HASHTAG = 20;

  var checkHashtags = function () {
    var popupHashtagsValue = popupHashtags.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var popupHashtagArray = popupHashtagsValue.split(' ');
    var errorMessage;
    var repeatedHashtags = popupHashtagArray.filter(function (element, indexElement, array) {
      return indexElement !== array.indexOf(element) || indexElement !== array.lastIndexOf(element);
    });

    console.log(popupHashtagArray);

    for (var i = 0; i < popupHashtagArray.length; i++) {
      var hash = popupHashtagArray[i];
      console.log(hash);
      console.log(hash.length);

      if (hash.charAt(0) !== '#') {
          errorMessage = 'Первый знак Хештега должен начинаться с #';
      } else if (hash.length <= MIN_HASHTAG) {
          errorMessage = 'Длина тега минимум 2 знака';
      } else if (hash.length >= MAX_HASHTAG) {
          errorMessage = 'Длина тега максимум 20 знаков';
      }

      if (hash.length > 1 && hash.charAt(0) === '#') {
        console.log('hash.length ' + hash.match(/#/g));
        var result = hash.match(/#/g).length;
        if (result > 1) {
            errorMessage = 'Хэш-теги должны быть разделены пробелами';
        }
      }

      if (popupHashtagArray.length >= MAX_HASHTAG) {
          errorMessage = 'Тегов может быть максимум 20';
      }

      if (errorMessage) {
        popupHashtags.setCustomValidity(errorMessage);
        popupHashtags.style.border = '2px solid red';
      } else {
        popupHashtags.setCustomValidity(' ');
        popupHashtags.style.border = 'none';
      }
    }
  };

  popupHashtags.addEventListener('change', checkHashtags);
})();
