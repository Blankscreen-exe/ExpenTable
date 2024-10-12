import { useState } from 'react'

// router
import RoutesList from './components/Routes.jsx'

// components
import Home from './components/home'
import Tabs from './components/common/Tabs.jsx'
import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'

function App() {

  return (
    <div className='is-flex is-justify-content-space-around'>
      <div className="container main-container">
        <Header/>
        <Tabs/>
        <RoutesList/>
        <Footer/>
      </div>
    </div>
  )
}

export default App
