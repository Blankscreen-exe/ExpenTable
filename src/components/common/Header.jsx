import React from 'react'

import pack from '../../../package.json'

function Header() {
  return (
    <div className="header p-5">
        <div className="content-wrapper">
        <h1 className="title is-1 has-text-centered">ExpenTable <sub>{pack.version}</sub></h1>
        <p className="has-text-centered">
            An expendable time table. Manage your daily schedule with this
            feature-rich minimalistic timetable app. It storess all data
            locally so nothing ever leaves your device.
        </p>
        </div>
    </div>
  )
}

export default Header