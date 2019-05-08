import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
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

function Welcome(props) {
  const { classes } = props;

  return (
    <div id="welcome-page-container">
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div className="welcome-box-header flex-column margin-bottom-24px">
            <Typography component="h1" variant="h5">
              Welcome to
            </Typography>
            <div className="flex-row bold-font">
              <Typography component="h1" variant="h3">
                PUNCHTALK
              </Typography>
              <div id="punch-green-rec"></div>
            </div>
          </div>
          <div className="welcome-login-button" onClick={() => {props.history.push('/user-login')}}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </div>
          <div className="align-center margin-top-24px">or</div>
          <div className="welcome-register-button" onClick={() => {props.history.push('/register-user')}}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Register
            </Button>
          </div>
        </Paper>
      </main>
    </div>
  );
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);