export default {
  API_KEY: `18650753-c8867d24a687d3baeda70b1dc`,
  HTTP: `https://pixabay.com/api/?`,
  getFullRequest(searchWord, searchPage) {
    return fetch(
      `${this.HTTP}q=${searchWord}&page=${searchPage}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
  },
};
