import React from 'react'
import {BrowserRouter as Router,Routes as Switch,Route} from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Predict from './components/Predict'
import Results from './components/Results'
import Home from './components/Home'

const Routing = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
            <Route element={<Home/>} path={'/'} />
            <Route element={<Predict/>} path={'/predict'} />
            <Route element={<Results/>} path={'/results'} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routing
