export default function pixabayFetch(searchQuery, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=19147241-2fe73d03b0bbed93b469d5f85&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}
