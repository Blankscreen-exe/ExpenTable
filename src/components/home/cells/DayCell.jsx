import React from 'react'
import PropTypes from 'prop-types'

function DayCell(props) {
    const {value} = props;

  return (
    <td>{value}</td>
  )
}

DayCell.propTypes = {}

export default DayCell
