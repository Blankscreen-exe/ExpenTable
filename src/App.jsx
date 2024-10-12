import { useState } from 'react'

// router
import RoutesList from './components/Routes.jsx';

// components
import Home from './components/home'

function App() {

  return (
    <div className='is-flex is-justify-content-space-around'>
      <RoutesList/>
    </div>
  )
}

export default App
