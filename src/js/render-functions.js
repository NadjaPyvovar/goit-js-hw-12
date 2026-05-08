import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  //"a" tag a inside ul class="gallery" (meaning "apply lightbox to all links inside gallery")
  captionsData: 'alt',
  captionDelay: 250,
});

// rendering new images & creating html
export function createGallery(images) {
  const markup = images
    // desctructing "image" inside map
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <li class="gallery-item">
     <a class="gallery-link" href="${largeImageURL}">
      <img 
        class="gallery-image" 
        src="${webformatURL}"
        alt="${tags}"
        />
     </a>
 
     <div class="info">
      <p><b>Likes</b><span>${likes}</span></p>
      <p><b>Views</b><span>${views}</span></p>
      <p><b>Comments</b><span>${comments}</span></p>
      <p><b>Downloads</b><span>${downloads}</span></p>
     </div>
    </li>
  
  `;
      }
    )
    .join('');

  // adding into DOM
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh(); // activating lightbox for new DOM
}

// removing images from the page before new request => reseting screen
export function clearGallery() {
  gallery.innerHTML = '';
}

// showing spinner before the request
export function showLoader() {
  loader.classList.add('is-visible');
}

// hiding spinner after the request
export function hideLoader() {
  loader.classList.remove('is-visible');
}
