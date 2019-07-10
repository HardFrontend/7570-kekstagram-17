'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  window.showErrorOfLoad = function (message) {
      var errorElement = errorTemplate.cloneNode(true);

      errorElement.querySelector('.error__buttons > button:last-child').classList.add('hidden');
      errorElement.querySelector('.error__title').textContent = message;
      errorElement.querySelector('.error__button').addEventListener('click', function () {
          location.reload();
      });

      main.appendChild(errorElement);
  }
})();
