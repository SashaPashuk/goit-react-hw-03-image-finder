import { Component } from 'react';
import PropTypes from 'prop-types';
import GalleryItem from '../GalleryItem/GalleryItem';
import st from './Gallery.module.css';

class Gallery extends Component {
  static propTypes = PropTypes.shape({
    imgList: PropTypes.array,
    onClick: PropTypes.func,
  }).isRequired;

  render() {
    const { onClick, imgList } = this.props;
    return (
      <ul onClick={onClick} className={st.gallery}>
        {imgList.map(({ webformatURL, type, largeImageURL }, index) => (
          <GalleryItem
            key={index}
            src={webformatURL}
            alt={type}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

export default Gallery;
