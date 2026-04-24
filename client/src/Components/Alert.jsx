import React from 'react'
import PropTypes from 'prop-types'
import "./Alert.css"
function Alert({data}) {
  return (
    <div className='alertdiv'>{data}</div>
  )
}

Alert.propTypes = {
  data: PropTypes.string.isRequired
}

export default Alert