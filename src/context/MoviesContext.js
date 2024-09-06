import React from 'react'

const MoviesContext = React.createContext({
  response: () => {},
  apiStatus: () => {},
  input: () => {},
  onChangeInput: () => {},
  onTriggerInput: () => {},
})

export default MoviesContext
