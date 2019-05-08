import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from 'react-redux';
import { sendMessage } from '../../actions/chat'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../../lib/Auth';
import moment from 'moment';

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
  const { classes } = props;
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
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List dense={false}>
              {messages.map((message, i) => (
                <div className="message-container" key={"message" + i}>
                  <p className="message-username">{message.user}: <span className="message-timestamp">{message.timestamp}</span></p>
                  <p className="message-text">{message.message}</p>
                </div>
              ))}
            </List>
          </div>
        </Grid>
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