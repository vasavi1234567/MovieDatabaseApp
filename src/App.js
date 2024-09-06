import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import PopularMovies from './components/PopularMovies'
import SearchedMovies from './components/SearchedMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'

import MoviesContext from './context/MoviesContext'

import './App.css'

const API_KEY = ''

// write your code here
const App = () => {
  const [response, setResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [input, setInput] = useState('')

  const onChangeInput = text => setInput(text)

  const getUpdatedData = responseData => ({
    total_pages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
    })),
  })

  const onTriggerInput = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${input}&page=${page}`
    const responseApi = await fetch(apiUrl)
    const data = await responseApi.json()
    setResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <MoviesContext.Provider
      value={{
        response,
        apiStatus,
        input,
        onChangeInput,
        onTriggerInput,
      }}
    >
      <div className="app d-flex flex-column">
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/search-movies" component={SearchedMovies} />
          <Route exact path="/top-rated-movies" component={TopRatedMovies} />
          <Route exact path="/upcoming-movies" component={UpcomingMovies} />
        </Switch>
      </div>
    </MoviesContext.Provider>
  )
}

export default App
