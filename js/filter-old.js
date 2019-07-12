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

  var buttonsFilterForm = document.querySelector('.img-filters__form');
  var buttonsFilter = document.querySelectorAll('.img-filters__button');
  var buttonsFilterDiscussed = document.querySelector('#filter-discussed');
  var buttonsFilterNew = document.querySelector('#filter-new');
  var buttonsFilterPopular = document.querySelector('#filter-popular');

  var removeActiveButton = function () {
    for (var i = 0; i < buttonsFilter.length; i++) {
      buttonsFilter[i].classList.remove('img-filters__button--active');
    }

  };

    /*  buttonsFilterForm.addEventListener('click', function (e) {
      var id = e.target.id;
      removeActiveButton();
      e.target.classList.add('img-filters__button--active');
      window.applyFilterButton(id);
    });*/

    // window.filterButton();
  var pictures = document.querySelector('.pictures');

  var clearPictures = function () {
    pictures.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  var filterUpdate = function () {
    clearPictures();
    removeActiveButton();
    this.classList.add('img-filters__button--active');
    var id = this.id;
    console.log(id);
    applyFilterType(id);
    console.log(applyFilterType(id));
    window.updatePics(applyFilterType(id));
  };


    /*  buttonsFilterDiscussed.addEventListener('click', function () {
      clearPictures();
      removeActiveButton();
      this.classList.add('img-filters__button--active');
      window.updatePics(window.filterDiscussed);
    });*/

  buttonsFilterDiscussed.addEventListener('click', filterUpdate);
  buttonsFilterNew.addEventListener('click', filterUpdate);
  buttonsFilterPopular.addEventListener('click', filterUpdate);

  /* buttonsFilterNew.addEventListener('click', function () {
       clearPictures();
       removeActiveButton();
       this.classList.add('img-filters__button--active');
       window.updatePics(window.newPicsFilter);
     });*/

  /*  buttonsFilterPopular.addEventListener('click', function () {
        clearPictures();
        removeActiveButton();
        this.classList.add('img-filters__button--active');
        window.updatePics(window.popularFilter);
      });*/

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
})();
