import React from 'react'
import PropTypes from 'prop-types'

function AllottedTimeCell(props) {
    const {value} = props;

  return (
    <td>{value}</td>
  )
}

AllottedTimeCell.propTypes = {}

export default AllottedTimeCell
