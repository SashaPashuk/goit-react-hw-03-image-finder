import { Component } from 'react';
import fetchImages from './services/imgApi';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import QueryBar from './components/QueryBar/QueryBar';
import Gallery from './components/Gallery/Gallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    imgList: [],
    error: '',
    status: Status.IDLE,
    showModal: false,
    currentImgObj: { largeUrl: '', alt: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ imgList: [], status: Status.PENDING });
      this.fethProcess(nextQuery);
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.resetPage();
  };

  handleBtnClick = () => {
    const nextQuery = this.state.searchQuery;
    this.setState({ status: Status.PENDING });
    this.fethProcess(nextQuery);
  };

  fethProcess = nextQuery => {
    fetchImages(nextQuery, this.state.page)
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ status: Status.IDLE });
          return toast.error('There is nothing to show');
        }
        this.setState(prevState => ({
          imgList: [...prevState.imgList, ...data.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(({ message }) =>
        this.setState({ error: message, status: Status.REJECTED }),
      )
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        this.setState(prevState => ({ page: (prevState.page += 1) }));
      });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleGalleryClick = e => {
    const largeUrl = e.target.dataset.largeUrl;
    const alt = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState({ currentImgObj: { largeUrl, alt } });
    }
    this.toggleModal();
  };

  render() {
    const { imgList, error, status, showModal, currentImgObj } = this.state;

    return (
      <>
        <QueryBar onSubmit={this.handleFormSubmit} />
        {error && <h1>{error}</h1>}
        <Gallery imgList={imgList} onClick={this.handleGalleryClick} />
        {showModal && (
          <Modal
            src={currentImgObj.largeUrl}
            alt={currentImgObj.alt}
            onClose={this.toggleModal}
          ></Modal>
        )}
        <div className="container">
          {status === Status.PENDING && (
            <Loader type="ThreeDots" color="red" height={80} width={80} />
          )}
          {status === Status.RESOLVED && (
            <Button onClick={this.handleBtnClick} />
          )}
        </div>
        <ToastContainer autoClose={2500} />
      </>
    );
  }
}
