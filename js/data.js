'use strict';

(function () {
/*  var COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];*/
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

    for (var i = 1; i <= AUTHORS.length; i++) {
      var user = {
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
        name: AUTHORS[i]
      };

      users[i] = user;
    }

    return users;
  };

  // создание массива фото
  var creatArrayPhotos = function (count) {
    var photos = [];
    for (var i = 0; i < count; i++) {
      var randAuthor = Math.floor(Math.random() * usersArray.length);
      var block = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: randomInteger(15, 200),
        comments: [
          usersArray[randAuthor]
        ]
      };
      // console.log(block);
      photos[i] = block;
    }
    return photos;
  };

  window.usersArray = creatArrayUsers();
  window.photosArray = creatArrayPhotos(NUMBER_PHOTOS);
})();
