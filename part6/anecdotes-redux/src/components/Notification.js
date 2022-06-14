import { useSelector } from 'react-redux'

const Notification = () => {
  const { show, notification } = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return show ? <div style={style}>{notification}</div> : null
}

export default Notification
