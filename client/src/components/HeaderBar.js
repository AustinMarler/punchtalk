import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { AuthContext } from '../lib/Auth';

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

function HeaderBar (props) {
  const { classes } = props;
  const { signout } = useContext(AuthContext)

  function logout () {
    signout()
      .then(props.props.history.push('/'))
  }

  return (
    <div id="channel-header-bar">
      <div id="channel-logo-container" className="flex-row bold-font">
        <Typography component="h1" variant="h3">
          PUNCHTALK
        </Typography>
        <div id="punch-green-rec"></div>
      </div>
      <div id="channel-logout-container">
        {props.props.location.pathname === '/profile-settings' 
        ? <Button onClick={() => props.props.history.push('/channel')} variant="contained" color="primary" className={classes.button}>
          <PeopleIcon className={classes.leftIcon} />
          Back to Channel
        </Button>
        : <Button onClick={() => props.props.history.push('/profile-settings')} variant="contained" color="primary" className={classes.button}>
          <SettingsIcon className={classes.leftIcon} />
          Settings
        </Button>}
        <Button onClick={logout} variant="contained" color="secondary" className={classes.button}>
          <PowerSettingsNewIcon className={classes.leftIcon} />
          Logout
        </Button>
      </div>
    </div>
  )
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar)