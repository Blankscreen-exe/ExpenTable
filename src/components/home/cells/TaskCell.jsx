import React from 'react'
import PropTypes from 'prop-types'

function TaskCell(props) {
    const {value} = props;

  return (
    <td>{value}</td>
  )
}

TaskCell.propTypes = {}

export default TaskCell
