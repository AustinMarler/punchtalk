import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';

import ChannelSelectionList from './ChannelSelectionList'
import ChannelChatArea from './ChannelChatArea'
import ChannelUserList from './ChannelUserList'
import { AuthContext } from '../../lib/Auth'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function Channel (props) {
  const { classes } = props;
  const { signout } = useContext(AuthContext)

  function logout () {
    signout()
      .then(props.history.push('/'))
  }

  return (
    <div id="channel-container" className="flex-column">
      <div id="channel-header-bar">
        <div id="channel-logo-container" className="flex-row bold-font">
          <Typography component="h1" variant="h3">
            PUNCHTALK
          </Typography>
          <div id="punch-green-rec"></div>
        </div>
        <div id="channel-logout-container">
          <Button variant="contained" color="primary" className={classes.button}>
            <SettingsIcon className={classes.leftIcon} />
            Settings
          </Button>
          <Button onClick={logout} variant="contained" color="secondary" className={classes.button}>
            <PowerSettingsNewIcon className={classes.leftIcon} />
            Logout
          </Button>
        </div>
      </div>

      <div id="channel-content" className="flex-row">
        <div className="channel-content-bar">
          <ChannelSelectionList />
        </div>

        <div id="channel-center">
          <ChannelChatArea />
        </div>

        <div className="channel-content-bar">
          <ChannelUserList />
        </div>
      </div>
    </div>
  )
}

Channel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Channel)