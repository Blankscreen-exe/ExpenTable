import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'

// Constants
import appConstants from '../appConstants'

// Components
import Home from './home'
import About from './about'
import Form from './form'
import Error404 from './common/Error404'

function RoutesList(props) {
  return (
    <Routes>
        <Route path={appConstants.routes.home} element={<Home/>}/>
        <Route path={appConstants.routes.about} element={<About/>}/>
        <Route path={appConstants.routes.form} element={<Form/>}/>
        <Route path={"*"} element={<Error404/>}/>
    </Routes>
  )
}

RoutesList.propTypes = {}

export default RoutesList
