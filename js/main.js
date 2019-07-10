'use strict';

// console.log(photosArray);

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content
    .querySelector('.picture');

  // отрисовка одного фото
  var renderPhoto = function (photo) {
    var picturedElement = pictureTemplate.cloneNode(true);

    // console.log('photo.comments ' + photo.comments);
    picturedElement.querySelector('.picture__img').src = photo.url;
    picturedElement.querySelector('.picture__comments').textContent = photo.comments.length;
    picturedElement.querySelector('.picture__likes').textContent = photo.likes;

    return picturedElement;
  };

  // отрисовка всех фото
  var renderPhotos = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPhoto(array[i]));
    }

    pictures.appendChild(fragment);
  };


  var showLoadSuccess = function (array) {
    renderPhotos(array);
  };

  window.load(showLoadSuccess, window.showErrorOfLoad);

})();
