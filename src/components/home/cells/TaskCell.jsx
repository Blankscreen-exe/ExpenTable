import React from 'react'
import PropTypes from 'prop-types'

// helper
import {getTodayDay} from '../../../helpers'

function TaskCell(props) {
  const {value, day} = props;

  let isItToday = getTodayDay()===day.toLowerCase();

  return (
    <td className={isItToday ? 'has-text-primary it-is-today' : ''}>{value}</td>
  )
}

TaskCell.propTypes = {}

export default TaskCell
