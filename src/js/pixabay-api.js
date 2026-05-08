import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '55760556-ecccc072bd7fbf440194d3609';

export async function getImagesByQuery(query, page = 1) {
  // building the whole URL resulting in: https://pixabay.com/api/?key=API_KEY&q=query&image_type=photo&orientation=horizontal&safesearch=true
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page, // shortcut for page: page,
    per_page: 15,
  });
  // axios sends request and revert data saved in const response
  // response (object) = { data: {actual server data}, status: 200, headers: {server info}, config: {request settings}, request: {}}
  // data for Pixabay looks like: { total: 500, totlaHits: 20, hits: [{webformatURL: "...", largeImageURL: "...", tags: "...", likes: 10}]}
  // response.data = actual API result

  const response = await axios.get(`${BASE_URL}?${params}`);

  // to show response & response.data in console:
  // console.log(response);
  // console.log(response.data);

  return response.data; // returning only API result not including headers, status, config
}

// // alternative for const response: to include params directly into response code line
// const response = await axios.get(BASE_URL, {
//   params: {
//     key: API_KEY,
//     q: query,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: page,
//     per_page: 30,
//   },
// });
