import s from './Modal.module.css';

const Modal = ({ src, onClickClose, keyClose }) => {
  return (
    <div
      className={s.Overlay}
      tabIndex={0}
      onKeyDown={even => keyClose(even)}
      onClick={even => onClickClose(even)}
    >
      <div className={s.Modal}>
        <img src={src} alt="open full hd img" />
      </div>
    </div>
  );
};

export default Modal;
