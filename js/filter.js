'use strict';

(function () {
  var filter = document.querySelector('.img-filters');

  window.filters = function () {
    filter.classList.remove('img-filters--inactive');

    window.filterDiscussed = function (enterData) {
      var discussedEnterData = enterData.slice();
      discussedEnterData.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      return discussedEnterData;
    };

    window.newPicsFilter = function (enterData) {
      var randomEnterData = enterData.slice();
      randomEnterData.sort(function () {
        return Math.random() - 0.5;
      });
      randomEnterData.length = 10;
      return randomEnterData;

    };

    window.popularFilter = function (enterData) {
      var popularData = enterData.slice();
      return popularData;
    };

    // window.renderPhotos(filterDiscussed);
    // window.load(window.showLoadSuccess(), window.showErrorOfLoad);

  };

  window.filters();

  window.filterButton = function () {
    var buttonsFilter = document.querySelectorAll('.img-filters__button');
  };
})();
