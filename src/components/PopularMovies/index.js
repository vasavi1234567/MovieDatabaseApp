import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import './index.css'

require('dotenv').config()

const apikey = process.env.API_KEY

class PopularMovies extends React.Component {
  state = {
    isLoading: true,
    popularMovie: {},
  }

  componentDidMount() {
    this.getPopularMovies()
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

  getPopularMovies = async (page = 1) => {
    const API_KEY = apikey
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const responseApi = await fetch(apiUrl)
    const data = await responseApi.json()
    const newData = this.getUpdatedData(data)
    this.setState({
      isLoading: false,
      popularMovie: newData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#2851a4" height={60} width={60} />
    </div>
  )

  renderPopularMovies = () => {
    const {popularMovie} = this.state
    const {results = []} = popularMovie

    return (
      <ul className="popular-movies-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovie} = this.state

    return (
      <>
        <Navbar />
        <div className="movies-container">
          {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
        </div>
        <Pagination
          totalPages={popularMovie.totalPages}
          apiCallback={this.getPopularMovies}
        />
      </>
    )
  }
}

export default PopularMovies
