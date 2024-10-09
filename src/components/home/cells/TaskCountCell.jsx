import React from 'react'
import PropTypes from 'prop-types'

function TaskCountCell(props) {
    const {value} = props;

  return (
    <td>{value}</td>
  )
}

TaskCountCell.propTypes = {}

export default TaskCountCell
