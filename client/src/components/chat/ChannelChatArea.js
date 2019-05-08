import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from 'react-redux';
import { sendMessage } from '../../actions/chat'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../lib/Auth';
import moment from 'moment';
import { isNull } from 'util';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function ChannelChatArea (props) {
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  const messages = useSelector(appstate => {
    return appstate.chatReducer.messages.map(message => ({
      ...message,
      timestamp: moment(message.timestamp).fromNow()
    }))
  })
  const chatBottom = useRef(null);

  useEffect(() => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSubmit (e) {
    e.preventDefault()
    if (message !== '') {
      sendMessage({ user, message, timestamp: new Date() })
      setMessage('')
    }
  }

  return (
    <div id="channel-chat-area-container" className="flex-column">
      <ul className="flex-column">
        {messages.map((message, i) => (
          <li className="message-container flex-row" key={"message" + i}>
            {!isNull(message.user.profileImage) 
              ? <div className="profile-image-avatar" style={{backgroundImage: message.user.profileImage}}></div>
              : <div className="profile-image-avatar" style={{backgroundImage: "url(https://www.naspp.com/App_Themes/NASPP/images/default_user.png"}}></div>}
            <div className="message-content">
              <p className="message-username">{message.user.username}: <span className="message-timestamp">{message.timestamp}</span></p>
              <p className="message-text">{message.message}</p>
            </div>
          </li>
        ))}
        <li id="dummy-list-item" ref={chatBottom}></li>
      </ul>
      <form id="chat-input-area" onSubmit={handleSubmit}>
        <input type="text" name="message" id="message" placeholder="Send a message..." value={message} onChange={e => setMessage(e.target.value)} />
        <button id="chat-send-button" type="submit">Send</button>
      </form>
    </div>
  )
}

ChannelChatArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelChatArea)