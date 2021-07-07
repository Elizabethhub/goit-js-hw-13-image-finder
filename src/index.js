import './sass/main.scss';
import galleryCard from './tpl/cards.hbs';
import debounce from 'lodash.debounce';
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { fetchImages } from './service/apiService.js';

const refs = {
  searchform: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};
const errorRef = document.querySelector('.error');

refs.searchform.addEventListener('submit', toSearchImg);
refs.loadMoreBtn.addEventListener('click', toLoadMore);
let page = 1;
let searchWord = '';
function toSearchImg(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  searchWord = e.currentTarget.elements.query.value;
  if (searchWord === '') {
    refs.loadMoreBtn.classList.add('is-hidden');
    alert({
      text: 'Enter what would you like to find',
    });
    return;
  }
  page = 1;

  fetchImages(searchWord).then(renderGallery);
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function toLoadMore() {
  page += 1;
  fetchImages(searchWord, page).then(renderGallery);
}

function renderGallery({ hits }) {
  if (!hits.length) {
    refs.loadMoreBtn.classList.add('is-hidden');
    handleError('No results by your request!');
    return;
  }
  refs.gallery.insertAdjacentHTML('beforeend', galleryCard(hits));

  const element = document.querySelector('.gallery').lastElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });

  errorRef.textContent = '';
}

function handleError(err) {
  errorRef.textContent = err;
}

// var hiddenElement = document.getElementById("box");
// var btn = document.querySelector('.btn');

// function handleButtonClick() {
//    hiddenElement.scrollIntoView({block: "center", behavior: "smooth"});
// }

// btn.addEventListener('click', handleButtonClick);
