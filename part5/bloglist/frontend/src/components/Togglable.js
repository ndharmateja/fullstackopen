import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible((oldVisible) => !oldVisible)

  return visible ? (
    <div>
      {props.children}
      <button onClick={toggleVisibility}>cancel</button>
    </div>
  ) : (
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  )
}

export default Togglable
