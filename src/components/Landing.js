import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
  },
}));

export default function Landing() {
  const { button, container } = useStyles();
  const { dispatch } = useAuth();
  return (
    <div className={container}>
      <Button
        className={button}
        variant='contained'
        color='primary'
        onClick={() => dispatch({ type: 'signIn' })}
      >
        Sign in
      </Button>
      <Button
        className={button}
        variant='contained'
        color='secondary'
      >
        Sign up
      </Button>
    </div>
  );
}
