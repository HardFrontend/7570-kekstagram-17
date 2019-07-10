'use strict';
var URL = 'https://js.dump.academy/kekstagram/data';

(function () {

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    console.log(xhr.response + ' status');

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

    xhr.open('GET', URL);
    xhr.send();

    return xhr.response;
  };
})();

/*
(function () {
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log('onSuccess' + data);
  };

  window.load(URL, onSuccess, onError);
})();*/


