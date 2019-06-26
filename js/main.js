'use strict';
var COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHORS = ['Кекс', 'Феликс', 'Луна', 'Лапа', 'Чешир'];
var NUMBER_PHOTOS = 25;


var creatArrayPictures = function () {
    var users = [];

    for(var i = 1; i <= AUTHORS.length; i++) {
          var user = {
              name: AUTHORS[i],
              message: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
              url: 'img/avatar' + i + '.svg'
          };

        users[i] = user;
    }

    return users;

};

console.log(creatArrayPictures());