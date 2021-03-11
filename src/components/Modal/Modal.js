import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import st from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.element,
  }).isRequired;

  state = {
    isImageLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
      this.setState({ isImageLoading: true });
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
      this.setState({ isImageLoading: true });
    }
  };

  onImageLoad = () => {
    this.setState({ isImageLoading: false });
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={st.Overlay} onClick={this.handleBackdropClick}>
        <div className={st.Modal}>
          {this.state.isImageLoading && (
            <Loader type="ThreeDots" color="red" height={80} width={80} />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={this.onImageLoad}
            className={st.image}
          />
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
