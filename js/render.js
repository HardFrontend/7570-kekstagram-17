'use strict';

// console.log(photosArray);

(function () {
    var filter = document.querySelector('.img-filters');
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


  window.picturesArrayCopy = [];

  window.updatePics = function (TypeFilter) {
    var discussedEnterData = window.picturesArrayCopy.slice();
    var Data = TypeFilter(discussedEnterData);

    window.renderPhotos(Data);
  };


  window.showLoadSuccess = function (array) {
    window.picturesArrayCopy = array;
    // console.log(picturesArrayCopy);
    // var arrayFilter = window.filterDiscussed(array);
    // window.renderPhotos(arrayFilter);
    // window.updatePics();

    window.renderPhotos(picturesArrayCopy);
    filter.classList.remove('img-filters--inactive');
    // window.updatePics();
  };

  window.load(window.showLoadSuccess, window.showErrorOfLoad);

})();
