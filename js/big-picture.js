'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImgBox = bigPicture.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureImgBox.querySelector('img');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');

  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureSocialCommentAvatar = bigPictureSocialComments.querySelector('.social__picture');
  var bigPictureSocialCommentText = bigPictureSocialComments.querySelector('.social__text');
  var bigPictureSocialCommentTemplate = document.querySelector('#social-comment-template').content
      .querySelector('.social__comment');

  // console.log(bigPictureImg);

  bigPicture.classList.remove('hidden');

  var bigPicture = {
    src: 'photos/1.jpg'
  };

  var clearComments = function () {
    bigPictureSocialComments.querySelectorAll('.social__comment').forEach(function (element) {
      element.remove();
    });
  };

  var renderSocialComment = function (commetsArray) {

    var bigPictureElement = bigPictureSocialCommentTemplate.cloneNode(true);

    var commetsArrayRender = commetsArray;
    console.log(commetsArrayRender);

    bigPictureElement.querySelector('.social__picture').src = commetsArrayRender.avatar;
    bigPictureElement.querySelector('.social__text').textContent = commetsArrayRender.message;

    return bigPictureElement;

  };

  var renderAllComments = function (array) {
    clearComments();
    var fragment = document.createDocumentFragment();
    console.log(array.length);
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderSocialComment(array[i]));
    }

    bigPictureSocialComments.appendChild(fragment);
  };


  // renderSocialComments();

  window.renderBigPicture = function (photo) {
    bigPictureImg.src = photo[0].url;
    bigPictureLikes.textContent = photo[0].likes;
    bigPictureDescription.textContent = photo[0].description;
    bigPictureCommentsCount.textContent = photo[0].comments.length;
    // renderSocialComments(photo);
    console.log(photo[0].comments);

    renderAllComments(photo[0].comments);
  };

  window.showLoadSuccessBig = function (array) {
    // window.picturesArrayCopy = array;
    console.log(window.picturesArrayCopy);

    window.renderBigPicture(array);
  };

  window.load(window.showLoadSuccessBig, window.showErrorOfLoad);
})();
