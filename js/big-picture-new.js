'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var bigPictureImgBox = bigPicture.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureImgBox.querySelector('img');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureCommentsNow = bigPicture.querySelector('.social__comment-count-now');

  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureSocialCommentAvatar = bigPictureSocialComments.querySelector('.social__picture');
  var bigPictureSocialCommentText = bigPictureSocialComments.querySelector('.social__text');
  var userCommentTextarea = bigPictureSocialComments.querySelector('.social__footer-text');
  var bigPictureSocialCommentTemplate = document.querySelector('#social-comment-template').content
    .querySelector('.social__comment');
  var userCommentTextarea = bigPicture.querySelector('.social__footer-text');
  var userCommentLoader = bigPicture.querySelector('.comments-loader');

  // console.log(bigPictureImg);

  var onPopupEscPress = function (evt) {
    var isFocusedTextarea = (document.activeElement === userCommentTextarea);
    if (evt.keyCode === 27) {
      console.log('esc');
      onButtonClose();
    }
  };

  var onImageChange = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onButtonClose = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    commetFrom = 0;
    commetTo = commetFrom + 5;
    photoIndex = 0;
  };

  bigPicture.addEventListener('change', onImageChange);
  bigPictureClose.addEventListener('click', onButtonClose);

  var clearComments = function () {
    bigPictureSocialComments.querySelectorAll('.social__comment').forEach(function (element) {
      element.remove();
    });
  };

  var renderSocialComment = function (commetsArray) {
    var bigPictureElement = bigPictureSocialCommentTemplate.cloneNode(true);
    var commetsArrayRender = commetsArray;

    bigPictureElement.querySelector('.social__picture').src = commetsArrayRender.avatar;
    bigPictureElement.querySelector('.social__text').textContent = commetsArrayRender.message;

    return bigPictureElement;
  };

  var renderAllComments = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderSocialComment(array[i]));
    }

    bigPictureSocialComments.appendChild(fragment);
  };

  var commetFrom = 0;
  var commetTo = commetFrom + 5;

  window.renderBigPicture = function (photo, photoIndex) {
    bigPictureImg.src = photo[photoIndex].url;
    bigPictureLikes.textContent = photo[photoIndex].likes;
    bigPictureDescription.textContent = photo[photoIndex].description;
    bigPictureCommentsCount.textContent = photo[photoIndex].comments.length;
  };

  window.showLoadSuccessBig = function (array) {
    window.renderBigPicture(array);
  };

  var arrayIndexPhotoCheck = function (array, el) {
    console.log(array.length);
    for (var i = 0; i < 26; i++) {
      if (el === array[i].url) {
        return i;
      }
    }

    // var index = array.indexOf(url);
    // console.log(index + ' index')
  };

  var onLoaderClick = function () {
    console.log('loader click2');

    // commetTo = 5;
  };

  var photoIndex = 0;

  window.commentsArray = [];

  var printLog = function () {
    console.log(window.commentsArray);
  };
  printLog();


  window.openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    var src = this.getAttribute('src');
    photoIndex = arrayIndexPhotoCheck(window.picturesArrayCopy, src);

    // var photoIndex2 = window.picturesArrayCopy.indexOf(src);
    // console.log(photoIndex2 + ' photoIndex2');

    console.log(src + ' src ' + ' photoIndex ' + photoIndex);
    clearComments();
    console.log(window.picturesArrayCopy);
    window.renderBigPicture(picturesArrayCopy, photoIndex);

    window.commentsArray = picturesArrayCopy[photoIndex].comments;

    console.log(window.commentsArray);

    renderAllComments(picturesArrayCopy[photoIndex].comments.slice(commetFrom, commetTo));
    console.log(picturesArrayCopy[photoIndex].comments.length  + 'length');
    commetFrom = 0;
    commetTo = commetFrom + 5;

    if (picturesArrayCopy[photoIndex].comments.length > 5) {
      bigPictureCommentsNow.textContent = 5;

      userCommentLoader.addEventListener('click', onLoaderClick = function (evt) {
        evt.preventDefault();
        commetFrom += 5;
        commetTo = commetFrom + 5;
        console.log('click');
        console.log('length after click ' + picturesArrayCopy[photoIndex].comments.length);

        if (commetFrom < picturesArrayCopy[photoIndex].comments.length) {
          bigPictureCommentsNow.textContent = commetTo;
          console.log('commetFrom commetTo ' + commetFrom + ' ' + commetTo);
          renderAllComments(picturesArrayCopy[photoIndex].comments.slice(commetFrom, commetTo));

          if (commetFrom >= picturesArrayCopy[photoIndex].comments.length || commetTo >= picturesArrayCopy[photoIndex].comments.length) {
            bigPictureCommentsNow.textContent = picturesArrayCopy[photoIndex].comments.length;
            //userCommentLoader.disabled = true;
          }
        }
      });
    } else {
      bigPictureCommentsNow.textContent = picturesArrayCopy[photoIndex].comments.length;
      //userCommentLoader.disabled = true;
    }
  };

})();
