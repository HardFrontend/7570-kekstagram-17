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
  var COMMENTS_COUNT = 5;

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
    commetTo = commetFrom + COMMENTS_COUNT;
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

    if (photo[photoIndex].comments.length > COMMENTS_COUNT) {
      bigPictureCommentsNow.textContent = COMMENTS_COUNT;
      userCommentLoader.disabled = false;
      userCommentLoader.addEventListener('click', showMoreComments);

    } else {
      bigPictureCommentsNow.textContent = photo[photoIndex].comments.length;
      userCommentLoader.disabled = true;
    }
  };

  var showMoreComments = function (evt) {
    evt.preventDefault();
    var src = bigPictureImg.getAttribute('src');
    photoIndex = arrayIndexPhotoCheck(window.picturesArrayCopy, src);
    var commenntsLength = window.picturesArrayCopy[photoIndex].comments.length;

    if (commenntsLength > COMMENTS_COUNT) {
      commetFrom += COMMENTS_COUNT;
      commetTo = commetFrom + COMMENTS_COUNT;
      bigPictureCommentsNow.textContent = commetTo;
      renderAllComments(window.picturesArrayCopy[photoIndex].comments.slice(commetFrom, commetTo));

      if (commetFrom >= commenntsLength || commetTo >= commenntsLength) {
        bigPictureCommentsNow.textContent = commenntsLength;
        userCommentLoader.disabled = true;
      }
    }
  };


  window.showLoadSuccessBig = function (array) {
    window.renderBigPicture(array);
  };

  var arrayIndexPhotoCheck = function (array, el) {
    for (var i = 0; i < 26; i++) {
      if (el === array[i].url) {
        return i;
      }
    }
  };

  var photoIndex = 0;


  window.openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    var src = this.getAttribute('src');
    photoIndex = arrayIndexPhotoCheck(window.picturesArrayCopy, src);
    var commentsArray = window.picturesArrayCopy[photoIndex].comments;

    clearComments();
    window.renderBigPicture(window.picturesArrayCopy, photoIndex);
    renderAllComments(commentsArray.slice(commetFrom, commetTo));
  };

})();
