'use strict';

// console.log(photosArray);

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content
    .querySelector('.picture');

  // отрисовка одного фото
  window.renderPhoto = function (photo) {
    var picturedElement = pictureTemplate.cloneNode(true);

    // console.log('photo.comments ' + photo.comments);
    picturedElement.querySelector('.picture__img').src = photo.url;
    picturedElement.querySelector('.picture__comments').textContent = photo.comments.length;
    picturedElement.querySelector('.picture__likes').textContent = photo.likes;

    return picturedElement;
  };

  // отрисовка всех фото
  window.renderPhotos = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.renderPhoto(array[i]));
    }

    pictures.appendChild(fragment);
  };


  var picturesArrayCopy = [];

  window.showLoadSuccess = function (array) {
    picturesArrayCopy = array.slice();
    //console.log(picturesArrayCopy);
    var arrayFilter = window.popularFilter(picturesArrayCopy);
    window.renderPhotos(arrayFilter);
  };

  window.load(window.showLoadSuccess, window.showErrorOfLoad);

})();
