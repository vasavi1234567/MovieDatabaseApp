import {Link, withRouter} from 'react-router-dom'

import MoviesContext from '../../context/MoviesContext'

import './index.css'

const Navbar = props => {
  const renderSearchbar = () => (
    <MoviesContext.Consumer>
      {value => {
        const {input, onChangeInput, onTriggerInput} = value
        const onChangeHandler = event => onChangeInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerInput()
          history.push('/search')
        }

        return (
          <div className="search-container d-flex align-items-center">
            <input
              className="input"
              type="text"
              value={input}
              onChange={onChangeHandler}
              placeholder="Search"
            />
            <button
              className="search-button"
              type="button"
              onClick={onSearchHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
                color="#fff"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        )
      }}
    </MoviesContext.Consumer>
  )

  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <h1 className="logo">movieDB</h1>
      </div>
      <div className="items-list-container">
        <ul className="items-list d-flex align-items-center">
          <li className="list-item">
            <Link className="link" to="/">
              Popular
            </Link>
          </li>
          <li className="list-item">
            <Link className="link" to="/top-rated-movies">
              Top Rated
            </Link>
          </li>
          <li className="list-item">
            <Link className="link" to="/upcoming-movies">
              Upcoming
            </Link>
          </li>
        </ul>
        {renderSearchbar()}
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
