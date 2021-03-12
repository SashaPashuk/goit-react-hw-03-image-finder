import s from './Button.module.css';
// Описание компонента Button
// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе
//  с предыдущими. После загрузки и рендера новой партии изображений страница должна плавно скролиться.
//   Для скрола используй следующий код.

const Button = ({ onClick }) => {
  return <button onClick={() => onClick()}>Load more</button>;
};
export default Button;
