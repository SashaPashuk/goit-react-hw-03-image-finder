import PropTypes from 'prop-types';
import st from './GalleryItem.module.css';

const GalleryItem = ({ src, alt, largeImageURL }) => {
  return (
    <li className={st.item}>
      <img
        className={st.image}
        src={src}
        alt={alt}
        data-large-url={largeImageURL}
      />
    </li>
  );
};

GalleryItem.propTypes = PropTypes.shape({
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageUrl: PropTypes.string,
}).isRequired;

export default GalleryItem;
