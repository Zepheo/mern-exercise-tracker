import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography, TextField, Button, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80vw',
    },
    maxWidth: 800,
  },
  formInput: {
    width: '100%',
    margin: 10,
  },
}));

export default function CreateUser() {
  const [state, setState] = useState({ username: '' });
  const { container, formContainer, formInput } = useStyles();

  const onChangeUsername = (e) => setState({ username: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(state);

    axios.post('/users/add', state)
      .then((res) => console.log(res.data));

    setState({ username: '' });
  };

  return (
    <div className={container}>
      <Typography variant='h3'>Create New User</Typography>
      <form action='.' onSubmit={onSubmit} className={formContainer}>
        <TextField
          required
          id='username'
          value={state.username}
          label='Username'
          variant='outlined'
          onChange={onChangeUsername}
          autoComplete='off'
          className={formInput}
        />
        <Button type='submit' variant='contained'>Create User</Button>
      </form>
    </div>
  );
}
