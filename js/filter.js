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
  };

  window.filters();

  var buttonsFilterForm = document.querySelector('.img-filters__form');
  var buttonsFilter = document.querySelectorAll('.img-filters__button');
  var buttonsFilterDiscussed = document.querySelector('#filter-discussed');
  var buttonsFilterNew = document.querySelector('#filter-new');
  var buttonsFilterPopular = document.querySelector('#filter-popular');

  var pictures = document.querySelector('.pictures');

  var activeButton = function (buttonActive) {
    buttonsFilter.forEach(function (buttonsFilter) {
      buttonsFilter.classList.remove('img-filters__button--active');
    });

    buttonActive.classList.add('img-filters__button--active');
  };

  var clearPictures = function () {
    pictures.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  var filterUpdate = function (evt) {
    clearPictures();
    var id = evt.target.id;
    activeButton(evt.target);
    applyFilterType(id);
    window.updatePics(applyFilterType(id));
  };

  var applyFilterType = function (id) {
    if (id === 'filter-popular') {
      filter = window.popularFilter;
    } else if (id === 'filter-new') {
      filter = window.newPicsFilter;

    } else if (id === 'filter-discussed') {
      filter = window.filterDiscussed;
    }

    return filter;
  };

  var onFilterButtonClickDebounce = window.debounce(filterUpdate);

  buttonsFilterDiscussed.addEventListener('click', onFilterButtonClickDebounce);
  buttonsFilterNew.addEventListener('click', onFilterButtonClickDebounce);
  buttonsFilterPopular.addEventListener('click', onFilterButtonClickDebounce);
})();
