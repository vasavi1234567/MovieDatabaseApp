import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import MoviesContext from '../../context/MoviesContext'

import './index.css'

const SearchedMovies = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found.</h1>
      <p>Try again.</p>
    </div>
  )

  const renderMovies = response => {
    const {results = []} = response

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul>
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#2851a4" />
    </div>
  )

  const renderResults = value => {
    const {response, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMovies(response)
      default:
        return renderEmptyView()
    }
  }

  return (
    <MoviesContext.Consumer>
      {value => {
        const {response, onTriggerInput} = value

        return (
          <>
            <Navbar />
            <div className="movies-container">{renderResults(value)}</div>
            <Pagination
              totalPages={response.totalPages}
              apiCallback={onTriggerInput}
            />
          </>
        )
      }}
    </MoviesContext.Consumer>
  )
}

export default SearchedMovies
