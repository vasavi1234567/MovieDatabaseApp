import React from 'react'
import Loader from 'react-loader-spinner'

import Movie from '../Movie'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import './index.css'

class TopRatedMovies extends React.Component {
  state = {
    isLoading: true,
    topRatedMovies: {},
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
    const API_KEY = ''
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const responseApi = await fetch(apiUrl)
    const data = await responseApi.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, topRatedMovies: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#2851a4" />
    </div>
  )

  renderPopularMovies = () => {
    const {topRatedMovies} = this.state
    const {results} = topRatedMovies

    return (
      <ul className="top-rated-movies-container">
        {results.map(movie => (
          <Movie key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovies} = this.state

    return (
      <>
        {' '}
        <Navbar />
        <div className="movies-container">
          {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
        </div>
        <Pagination
          totalPages={topRatedMovies.totalPages}
          apiCallback={this.getTopRatedMovies}
        />
      </>
    )
  }
}

export default TopRatedMovies
