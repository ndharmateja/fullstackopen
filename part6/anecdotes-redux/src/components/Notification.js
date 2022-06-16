import { connect } from 'react-redux'

const Notification = (props) => {
  const { show, notification } = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return show ? <div style={style}>{notification}</div> : null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
