import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={even => onSubmit(even)}>
        <button type="submit" className={s.SearchForm__button}>
          <span className="s.SearchForm-button-label"></span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;
