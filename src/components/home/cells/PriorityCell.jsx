import React from 'react'
import PropTypes from 'prop-types'

function PriorityCell(props) {
    const {value} = props;

  return (
    <td>{value}</td>
  )
}

PriorityCell.propTypes = {}

export default PriorityCell
