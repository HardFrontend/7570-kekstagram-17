'use strict';
var COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHORS = ['Кекс', 'Феликс', 'Луна', 'Лапа', 'Чешир'];
var NUMBER_PHOTOS = 25;

// случайные данные
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// создание массива юзеров
var creatArrayUsers = function () {
  var users = [];

  for (var i = 0; i < AUTHORS.length; i++) {
    var user = {

      avatar: 'img/avatar-' + (i + 1) + '.svg',
      message: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
      name: AUTHORS[i]
    };

    users[i] = user;
  }

  return users;
};

var creatPhotosArray = function (count) {
  var photos = [];

  for (var i = 0; i < count; i++) {
    var randAuthor = Math.floor(Math.random() * usersArray.length);
    console.log();
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: [
        usersArray[randAuthor]
      ]
    };

    // console.log(photo);

    photos[i] = photo;
  }

  return photos;
};

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var usersArray = creatArrayUsers();
var photosArray = creatPhotosArray(NUMBER_PHOTOS);

var renderPhoto = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};
console.log(photosArray.length);

var fragment = document.createDocumentFragment();
for (var i = 0; i < photosArray.length; i++) {
  fragment.appendChild(renderPhoto(photosArray[i]));

}
pictures.appendChild(fragment);


