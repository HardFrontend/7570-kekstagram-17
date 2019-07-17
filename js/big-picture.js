'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var bigPictureImgBox = bigPicture.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureImgBox.querySelector('img');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');

  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureSocialCommentAvatar = bigPictureSocialComments.querySelector('.social__picture');
  var bigPictureSocialCommentText = bigPictureSocialComments.querySelector('.social__text');
  var userCommentTextarea = bigPictureSocialComments.querySelector('.social__footer-text');
  var bigPictureSocialCommentTemplate = document.querySelector('#social-comment-template').content
        .querySelector('.social__comment');
  var userCommentTextarea = bigPicture.querySelector('.social__footer-text');

  // console.log(bigPictureImg);


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
    clearComments();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderSocialComment(array[i]));
    }

    bigPictureSocialComments.appendChild(fragment);
  };


  window.renderBigPicture = function (photo, photoIndex) {
    bigPictureImg.src = photo[photoIndex].url;
    bigPictureLikes.textContent = photo[photoIndex].likes;
    bigPictureDescription.textContent = photo[photoIndex].description;
    bigPictureCommentsCount.textContent = photo[photoIndex].comments.length;

    renderAllComments(photo[photoIndex].comments);
  };

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
  };

  bigPicture.addEventListener('change', onImageChange);
  bigPictureClose.addEventListener('click', onButtonClose);


  window.showLoadSuccessBig = function (array) {
    window.renderBigPicture(array);
  };

  var arrayIndexPhotoCheck = function (array, el) {
    for (var i = 0; i < array.length; i++) {
      if (el === array[i].url) {
        return i;
      }
    }
  };

  window.openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    var src = this.getAttribute('src');
    var photoIndex = arrayIndexPhotoCheck(window.picturesArrayCopy, src);

    console.log(photoIndex);
    console.log(src);
    //console.log(window.picturesArrayCopy);
    window.renderBigPicture(picturesArrayCopy, photoIndex);
  };

})();
