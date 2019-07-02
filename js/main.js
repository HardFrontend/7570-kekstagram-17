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

    for(var i = 1; i <= AUTHORS.length; i++) {
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
        //console.log(block);
        photos[i] = block;
    }
    return photos;
};

var usersArray = creatArrayUsers();
var photosArray = creatArrayPhotos(NUMBER_PHOTOS);

//console.log(photosArray);


var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content
    .querySelector('.picture');

// отрисовка одного фото
var renderPhoto = function (photo) {
    var picturedElement = pictureTemplate.cloneNode(true);

    //console.log('photo.comments ' + photo.comments);
    picturedElement.querySelector('.picture__img').src = photo.url;
    picturedElement.querySelector('.picture__comments').textContent  = photo.comments.length;
    picturedElement.querySelector('.picture__likes').textContent  = photo.likes;

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



renderPhotos(photosArray);



// upload image


// загрузка фотографии
var popup = document.querySelector('.img-upload__overlay'); // pop up
var uploadFileElement = document.querySelector('.img-upload__start'); // фото элемент
var popupClose = popup.querySelector('.img-upload__cancel');
var userCommentTextarea = popup.querySelector('.text__description');
var ESC_KEYCODE = 27;

var onPopupEscPress = function (evt) {
    var isFocusedTextarea = (document.activeElement === userCommentTextarea);
    if (evt.keyCode === 27 && !isFocusedTextarea) {
        onButtonClose();
    }
};

var onImageChange = function () {
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
};

var onButtonClose = function () {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
};

uploadFileElement.addEventListener('change', onImageChange);
popupClose.addEventListener('click', onButtonClose);


// отслеживаем нажатие ползунка и меняем насыщенность

var imgPreviewContainer = popup.querySelector('.img-upload__preview');
var imgPreview = imgPreviewContainer.querySelector('img');
var fieldsetElement = popup.querySelector('.img-upload__effects');

var levelEffect = popup.querySelector('.effect-level__pin');
var levelEffectDepth = popup.querySelector('.effect-level__depth');
var STEP = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;

// насыщенности фильтра
var applyFilter = function (percentage) {
    var checked = fieldsetElement.querySelector('input:checked');
    var filter;
    switch (checked.value) {
        case 'chrome':
            filter = 'grayscale(' + percentage / 100 + ')';
            break;
        case 'sepia':
            filter = 'sepia(' + percentage / 100 + ')';
            break;
        case 'marvin':
            filter = 'invert(' + percentage + '%)';
            break;
        case 'phobos':
            filter = 'blur(' + 3 * percentage / 100 + 'px)';
            break;
        case 'heat':
            filter = 'brightness(' + 3 * percentage / 100 + ')';
            break;
        default:
            imgPreview.style.filter = 'none';
    }
    imgPreview.style.filter = filter;
    levelEffect.style.left = percentage + '%';
    levelEffectDepth.style.width = percentage + '%';
};

fieldsetElement.addEventListener('change', function () {
    applyFilter(100);
});

levelEffect.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    applyFilter(50);
});

// нажатие ползунка и меняем насыщенность
levelEffect.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    applyFilter(50);
});