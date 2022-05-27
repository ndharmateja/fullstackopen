import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible((oldVisible) => !oldVisible)

  return visible ? (
    <div>
      {props.children}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  ) : (
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  )
}

export default Togglable
