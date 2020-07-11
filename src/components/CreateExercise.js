import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button, makeStyles,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

export default function CreateExercise() {
  const { container, formContainer, formInput } = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    username: '', description: '', duration: 0, date: new Date(), users: [],
  });

  useEffect(() => {
    axios.get('/users')
      .then(({ data }) => {
        if (data.length > 0) {
          setState((s) => ({
            ...s,
            username: data[0].username,
            users: data,
          }));
        }
      })
      .catch((error) => console.log(error));
  }, [history]);

  const onChangeUsername = (e) => setState({ ...state, username: e.target.value });

  const onChangeDescription = (e) => setState({ ...state, description: e.target.value });

  const onChangeDuration = (e) => setState({ ...state, duration: e.target.value });

  const onChangeDate = (date) => setState({ ...state, date });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(state);

    axios.post('/exercises/add', state)
      .then((res) => console.log(res.data));

    history.push('/');
  };

  return (
    <div className={container}>
      <Typography variant='h3'>Create New Exercise Log</Typography>
      <form action='.' onSubmit={onSubmit} className={formContainer}>
        <FormControl variant='outlined' className={formInput}>
          <InputLabel id='username-select-label'>Username</InputLabel>
          <Select
            labelId='username-select-label'
            id='username'
            value={state.username}
            onChange={onChangeUsername}
            label='Username'
          >
            {state.users.map((user, i) => (
              <MenuItem key={user._id} value={user.username}>{user.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          id='description'
          value={state.description}
          label='Description'
          variant='outlined'
          onChange={onChangeDescription}
          autoComplete='off'
          className={formInput}
        />
        <TextField
          required
          id='duration'
          value={state.duration}
          label='Duration'
          variant='outlined'
          onChange={onChangeDuration}
          autoComplete='off'
          type='number'
          className={formInput}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='dd/MM/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='Date picker inline'
            value={state.date}
            onChange={onChangeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Button type='submit'>Create Exercise Log</Button>
      </form>
    </div>
  );
}
