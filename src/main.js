import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// importing functions from pixabay-api.js & render.functions.js
import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

// listening for submit in the form
const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['search-text'].value.trim(); // getting value from <input name="search-text">; using trim() to remove spaces if any

  if (!searchQuery) {
    // checking if input is not empty
    iziToast.error({
      position: 'topRight',
      message: 'Please enter a search query!',
    });

    return;
  }
  clearGallery(); // removing previous search results
  showLoader(); // showing loader

  getImagesByQuery(searchQuery) // sending API request whilst returning a Primise
    .then(data => {
      if (data.hits.length === 0) {
        // showing an alert message in case of no images matching request have been found (data.hits = array of images)
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });

        return;
      }

      createGallery(data.hits); // rendering found imags, creating HTML and pitting into DOM
    })
    .catch(error => {
      // catching internet problemts, server/API errors if any
      iziToast.error({
        position: 'topRight',
        message: 'Something went wrong. Please try again later!',
      });
    })
    .finally(() => {
      hideLoader(); // hiding the loader
      form.reset(); // resetting the form, i.e. clearing input field
    });
});
