import s from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
const ImageGallery = ({ dataFetch, onClick }) => {
  return (
    <ul className={s.ImageGallery} onClick={even => onClick(even)}>
      {dataFetch.length > 0 &&
        dataFetch.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        ))}
    </ul>
  );
};
export default ImageGallery;
