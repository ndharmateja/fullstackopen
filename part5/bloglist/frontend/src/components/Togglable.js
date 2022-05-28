import React, { useState, forwardRef, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible((oldVisible) => !oldVisible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return visible ? (
    <div>
      {props.children}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  ) : (
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
}

export default Togglable
