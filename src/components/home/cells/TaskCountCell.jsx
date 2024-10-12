import React from 'react'
import PropTypes from 'prop-types'

// helper
import {combineClassNames} from '../../../helpers'

function TaskCountCell(props) {
  const {value} = props;

  let qtyHighlight;
  let title;
  if (value<=3) {
    qtyHighlight = 'has-text-success less-qty-tasks';
    title = 'Feasible amount of tasks! You will have some free time today';
  } else if (value<=5) {
    qtyHighlight = 'has-text-warning medium-qty-tasks';
    title = 'Moderate amount of tasks! It is going to be a busy day';
  } else {
    qtyHighlight = 'has-text-danger high-qty-tasks';
    title = 'Too many tasks! Make sure you can handle them';
  }

  return (
    <td className='has-text-centered has-text-weight-bold' title={title}><span className={qtyHighlight}>{value}</span></td>
  )
}

TaskCountCell.propTypes = {}

export default TaskCountCell
