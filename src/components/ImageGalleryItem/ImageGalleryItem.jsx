import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={largeImageURL}
        className={s.ImageGalleryItem__image}
      />
    </li>
  );
};
export default ImageGalleryItem;
