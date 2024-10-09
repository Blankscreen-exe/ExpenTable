import React from 'react'
import PropTypes from 'prop-types'

function HeaderCell(props) {
    const {value} = props;

  return (
    <th>{value}</th>
  )
}

HeaderCell.propTypes = {}

export default HeaderCell
