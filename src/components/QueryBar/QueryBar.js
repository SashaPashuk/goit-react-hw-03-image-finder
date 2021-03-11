import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import st from './QueryBar.module.css';

class QueryBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    initialValue: '',
  };

  handleInputChange = event => {
    this.setState({ initialValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { initialValue } = this.state;
    const { onSubmit } = this.props;

    if (initialValue.trim() === '') {
      toast.error('Please, enter your query');
    }

    onSubmit(initialValue.trim());
    this.setState({ initialValue: '' });
  };

  render() {
    const { initialValue } = this.state;
    return (
      <header className={st.bar}>
        <form onSubmit={this.handleSubmit} className={st.form}>
          <button type="submit" className={st.btn}>
            <span className={st.label}>Search</span>
          </button>
          <input
            className={st.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={initialValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default QueryBar;
