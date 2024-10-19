import React from 'react'
import PropTypes from 'prop-types'

// helper
import {getTodayDay, combineClassNames} from '../../../helpers'

function TaskCell(props) {
  const {value, day, isDone} = props;

  let isItToday = getTodayDay()===day.toLowerCase();

  let classList = combineClassNames(
    isItToday ? 'has-text-primary it-is-today' : '',
    isDone ? 'task-done' : ''
  )

  return (
    <td className={classList}>{value}</td>
  )
}

TaskCell.propTypes = {}

export default TaskCell
