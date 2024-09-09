import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import './index.css'

class TopRatedMovies extends React.Component {
  state = {
    isLoading: true,
    topRatedMovie: {
      totalPages: 0,
      results: [],
    },
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
    })),
  })

  getTopRatedMovies = async (page = 1) => {
    const API_KEY = '3446093c095453b151980f49a9f3576d'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const responseApi = await fetch(apiUrl)
    const data = await responseApi.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, topRatedMovie: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#2851a4" height={60} width={60} />
    </div>
  )

  renderPopularMovies = () => {
    const {topRatedMovie} = this.state
    const {results = []} = topRatedMovie

    return (
      <ul className="top-rated-movies-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovie} = this.state

    return (
      <>
        {' '}
        <Navbar />
        <div className="movies-container">
          {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
        </div>
        {topRatedMovie.totalPages && (
          <Pagination
            totalPages={topRatedMovie.totalPages}
            apiCallback={this.getTopRatedMovies}
          />
        )}
      </>
    )
  }
}

export default TopRatedMovies
