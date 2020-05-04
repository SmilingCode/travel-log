import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import MapBox from './MapBox'

const App = () => {
  console.log("public_url", process.env.PUBLIC_URL)
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={MapBox} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;