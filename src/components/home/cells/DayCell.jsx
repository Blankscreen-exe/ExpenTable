import React from 'react'
import PropTypes from 'prop-types'

// helper
import {getTodayDay} from '../../../helpers'

function DayCell(props) {
    const {value} = props;

    let isItToday = getTodayDay()===value.toLowerCase();

  return (
    <td className={isItToday ? 'has-text-primary it-is-today has-text-weight-bold' : ''}>{value}</td>
  )
}

DayCell.propTypes = {}

export default DayCell
