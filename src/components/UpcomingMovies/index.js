import React from 'react'
import Loader from 'react-loader-spinner'

import Movie from '../Movie'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import './index.css'

class UpcomingMovies extends React.Component {
  state = {
    isLoading: true,
    upcomingMovies: {},
  }

  componentDidMount() {
    this.getUpcomingMovies()
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

  getUpcomingMovies = async (page = 1) => {
    const API_KEY = ''
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const responseApi = await fetch(apiUrl)
    const data = await responseApi.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovies: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#2851a4" />
    </div>
  )

  renderPopularMovies = () => {
    const {upcomingMovies} = this.state
    const {results} = upcomingMovies

    return (
      <ul className="upcoming-movies-container">
        {results.map(movie => (
          <Movie key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovies} = this.state

    return (
      <>
        <Navbar />
        <div className="movies-container">
          {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
        </div>
        <Pagination
          totalPages={upcomingMovies.totalPages}
          apiCallback={this.getUpcomingMovies}
        />
      </>
    )
  }
}

export default UpcomingMovies
