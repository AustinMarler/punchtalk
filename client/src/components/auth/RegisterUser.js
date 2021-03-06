import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackButton from '@material-ui/icons/ArrowBack';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CreateIcon from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import { AuthContext } from '../../lib/Auth'

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
    backgroundColor: green[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: '#FFF',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

function RegisterUser(props) {
  const { classes } = props;
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirm] = useState('')
  const [userError, setUserError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const { register } = useContext(AuthContext)

  function sendRegister(e) {
    e.preventDefault()
    if (password === confirmPassword && username !== '') {
      setPassError(false)
      register(username, password)
        .then(() => {
          props.history.push("/channel")
        })
        .catch(err => {
          setUserError(true)
          setErrorText(err)
        })
    } else {
      setPassError(true)
      setErrorText("Passwords must match")
    }
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <div className="back-button-container">
          <IconButton className={classes.button} aria-label="ArrowBack" onClick={() => {props.history.push('/')}}>
            <ArrowBackButton />
          </IconButton>
        </div>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={sendRegister}>
          {userError || passError ? (
            <Typography color="error">{errorText}</Typography>
          ) : (
            ''
          )}
          <FormControl error={userError} margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input onChange={e => setUsername(e.target.value)} id="username" name="username" autoFocus />
          </FormControl>
          <FormControl error={passError} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input onChange={e => setPassword(e.target.value)} name="password" type="password" id="password" />
          </FormControl>
          <FormControl error={passError} margin="normal" required fullWidth>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input onChange={e => setConfirm(e.target.value)} name="confirmPassword" type="password" id="confirmPassword" />
          </FormControl>
          <MuiThemeProvider theme={theme}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </MuiThemeProvider>
          <div className="flex-row flex-justify-center margin-top-24px">or</div>
          <div onClick={() => {props.history.push('/user-login')}}>
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
        </form>
      </Paper>
    </main>
  );
}

RegisterUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterUser);
