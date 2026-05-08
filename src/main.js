import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// importing functions from pixabay-api.js & render.functions.js
import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

// grabbing DOM elements from HTML
const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-btn');

// setting initial state of the variables for page/query/totalHits
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
// setting default number of hits per page
const PER_PAGE = 15;

// hiding loadMoreBtn prior to the first hits' load
hideLoadMoreButton();

// listening the submit event
form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.currentTarget.elements['search-text'].value.trim(); // getting value (text) from <input name="search-text">; using trim() to remove spaces if any

  // checking if input is not empty
  if (!currentQuery) {
    iziToast.error({
      position: 'topRight',
      message: 'Please enter a search query!',
    });
    return;
  }

  // setting the state after the first request
  currentPage = 1;
  totalHits = 0;

  clearGallery(); // removing previous search results
  hideLoadMoreButton(); // hiding loadMoreBtn / resetting every new search
  showLoader(); // showing loader

  // handling response
  try {
    const data = await getImagesByQuery(currentQuery, currentPage); // sending API request => response = Promise

    // checking if data.hits is an array of image objects (if not then potentially corrupted response, unexpected format, etc), if not = throw and error and immediately jump to .catch()
    if (!data || !Array.isArray(data.hits)) {
      throw new Error('Invalid API response');
    }

    totalHits = data.totalHits || 0;

    if (data.hits.length === 0) {
      // showing an alert message in case of no images matching request have been found (data.hits = array of images)
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    // rendering found images, creating HTML and pitting into DOM
    createGallery(data.hits);

    // showing loadMoreBtn only if more pages/hits to load exist
    if (currentPage * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    // catching internet problemts, server/API errors if any
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please try again later!',
    });
  } finally {
    hideLoader(); // hiding the loader
    // form.reset(); // resetting the form, i.e. clearing input field is not needed any more => because currentQuery is needed to load more hits (resseting input breaks UI logic)
  }
});

// listening the click on loadMoreBtn
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1; // increasing the number of page

  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits); // appending further hits (images) not replacing the loaded ones

    // adding smooth scrolling (getBoundingClientRect() measures the actual pixel size of an element on the screen; scrolling by 2 * cardHeight nudges the view down to show the newly loaded images naturally)
    const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // hiding loadMoreBtn once the total number hits reached
    if (currentPage * PER_PAGE >= totalHits) {
      hideLoadMoreButton();

      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    // otherwise keeping showing the loadMoreBtn
    showLoadMoreButton(); // re-showing the button if more pages remain to load
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Failed to load more images.',
    });
  } finally {
    hideLoader();
  }
});
