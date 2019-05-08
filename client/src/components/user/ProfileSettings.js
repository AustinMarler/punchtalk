import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { changeProfilePic, changePassword } from '../../actions/user';
import { AuthContext } from '../../lib/Auth';

import HeaderBar from '../HeaderBar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function ProfileSettings (props) {
  const { classes } = props;
  const [profilePicURL, setProfilePicURL] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { user } = useContext(AuthContext);

  function handleSubmit (e) {
    e.preventDefault()
    if (profilePicURL !== '') {
      changeProfilePic({ username: user.username, profile_image: profilePicURL })
    }
    if (password !== '' && newPassword !== '' && password === confirmPassword && newPassword === confirmNewPassword) {
      changePassword({ username: user.username, currentPassword: password, newPassword })
    }
  }

  return (
    <div id="profile-settings-container">
      <HeaderBar props={props} />

      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <TextField
              label="Current Password"
              className={classes.textField}
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Confirm Current Password"
              className={classes.textField}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="New Password"
              className={classes.textField}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Confirm New Password"
              className={classes.textField}
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Change Profile Image"
              className={classes.textField}
              value={profilePicURL}
              onChange={e => setProfilePicURL(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  )
}

ProfileSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSettings)