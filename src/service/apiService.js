//  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ';

function fetchImages(query, page = 1) {
  const API_KEY = '22384514-a4280542ebcdb73106bba1593';
  const BASE_URL = 'https://pixabay.com';
  const url = `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`;

  return fetch(url).then(response => {
    if (response.status === 404) {
      return Promise.reject('Something went wrong!');
    }
    return response.json();
  });
}
export { fetchImages };
