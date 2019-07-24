'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var bigPictureImgBox = bigPicture.querySelector('.big-picture__img');
  var bigPictureImg = bigPictureImgBox.querySelector('img');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var userCommentTextarea = bigPictureSocialComments.querySelector('.social__footer-text');
  var bigPictureSocialCommentTemplate = document.querySelector('#social-comment-template').content
        .querySelector('.social__comment');
  var userCommentTextarea = bigPicture.querySelector('.social__footer-text');


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
/*
    console.log(countClick + ' countClick in commenye');
    from = 5 * countClick;
     untilEl = 5 + from;

    var toElemet = untilEl;
    var fromElemet = from;

    if(untilEl < array.length){
      toElemet = untilEl;
      document.querySelector('.social__comment-count-now').textContent = toElemet;

    } else if (untilEl >= array.length) {
       toElemet = array.length;
      document.querySelector('.social__comment-count-now').textContent = array.length;
      bigPictureCommentsLoader.disabled = true;
    }

    console.log(from + ' to - ' + toElemet + ' from untilEl');*/

    for (var i = 0; i < array.length; i++) {               //i < array.length
      fragment.appendChild(renderSocialComment(array[i]));
    }


    bigPictureSocialComments.appendChild(fragment);
  };


  var countClick = 0;
  var from = 0;
  var until = 5;

  var renderFiveCommentsClick = function (array) {
    console.log((countClick += 1) + 'load click');
    console.log(window.picturesArrayCopy);

    //var arrayPics = array.slice(from, until);
    // renderFiveComments(arrayPics);
    //renderAllComments();
  };


  window.renderBigPicture = function (photo, photoIndex) {
    bigPictureImg.src = photo[photoIndex].url;
    bigPictureLikes.textContent = photo[photoIndex].likes;
    bigPictureDescription.textContent = photo[photoIndex].description;
    bigPictureCommentsCount.textContent = photo[photoIndex].comments.length;
  };

  var onPopupEscPress = function (evt) {
    var isFocusedTextarea = (document.activeElement === userCommentTextarea);
    if (evt.keyCode === 27) {
      onButtonClose();
    }
  };

  var onImageChange = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onButtonClose = function () {
    bigPicture.classList.add('hidden');
    bigPictureCommentsLoader.disabled = false;
    countClick = 0;
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
    clearComments();
    countClick = 0;
    var src = this.getAttribute('src');
    var photoIndex = arrayIndexPhotoCheck(window.picturesArrayCopy, src);

    console.log(photoIndex);
    //console.log(src);
    console.log(picturesArrayCopy[photoIndex].comments);
    console.log(window.picturesArrayCopy);
    window.renderBigPicture(window.picturesArrayCopy, photoIndex);
    // renderFiveComments(picturesArrayCopy[photoIndex].comments);
    renderAllComments(picturesArrayCopy[photoIndex].comments.slice(from, until));
    bigPictureCommentsLoader.addEventListener('click', renderFiveCommentsClick = function (evt) {
      evt.preventDefault();
      countClick += 1;
      from = 5 * countClick;
      until = 5 + from;
      console.log(from + ' to - ' + until + ' from untilEl')
      console.log(countClick + ' countClick');
      renderAllComments(picturesArrayCopy[photoIndex].comments.slice(from, until));
    });
  };

})();

 // work
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
        // userCommentLoader.disabled = true;
      }
    }
  });

} else {
  bigPictureCommentsNow.textContent = picturesArrayCopy[photoIndex].comments.length;
}