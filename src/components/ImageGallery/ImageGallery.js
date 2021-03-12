import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Modal from '../Modal';
import pixabayFetch from '../API/PixabayFetch';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    status: Status.IDLE,
    page: 1,
    error: null,
    showModal: false,
    largeImageSrc: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchQuery;
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevName !== searchQuery) {
      this.setState({ status: Status.PENDING });

      pixabayFetch(searchQuery)
        .then(res => {
          this.setState(prev => ({
            images: res.hits,
            status: Status.RESOLVED,
          }));

          window.scrollTo({ top: 0 });

          if (res.total === 0) {
            return Promise.reject(
              new Error(`По вашему запросу ${searchQuery} ничего не найдено`),
            );
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      pixabayFetch(searchQuery, page)
        .then(res => {
          this.setState(prev => ({
            images: [...prev.images, ...res.hits],
            status: Status.RESOLVED,
          }));
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }))
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  handleClickButton = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleClickImage = src => {
    this.setState({ largeImageSrc: src });
    this.handleToggleModal();
  };

  handleToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, showModal, largeImageSrc, error } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webSrc={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
              onClick={this.handleClickImage}
            />
          ))}
        </ul>

        {status === 'rejected' && <div>{error.message}</div>}

        {status === 'pending' && (
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        )}

        {(images.length > 0 || status === 'resolved') && (
          <Button onClick={this.handleClickButton} />
        )}

        {showModal && (
          <Modal image={largeImageSrc} onClose={this.handleToggleModal} />
        )}
      </>
    );
  }
}
