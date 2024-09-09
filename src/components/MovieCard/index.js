import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-container d-flex flex-column col-12 col-sm-6 col-lg-3 mb-2">
      <img className="movie-image" src={posterPath} alt={title} />
      <div className="d-flex flex-column align-items-center mt-2">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
      <Link className="align-self-center" to={`/movie/${id}`}>
        <button className="view-details-button" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
