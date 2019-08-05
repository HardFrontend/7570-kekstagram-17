'use strict';
var URL = 'https://js.dump.academy/kekstagram/data';

(function () {
  window.mainPhotoArrya = [];

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // console.log(xhr.response + ' status');

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        // window.mainPhotoArrya = xhr.response;
        // return window.mainPhotoArrya;
        // console.log(window.mainPhotoArrya); // массив json

      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();

    return xhr.response;
  };
})();


/* (function () {
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);
  };

  window.load(onSuccess, onError);
})();*/


(function () { // отправка формы
  var URL_SEND = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };
})();
