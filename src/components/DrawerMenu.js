import React from 'react';
import {
  Drawer, Typography, Divider, List, ListItem, ListItemText, makeStyles, Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#eee',
    },
  },
  button: {
    margin: 10,
  },
}));

export default function DrawerMenu({ isOpen, handleClose }) {
  const history = useHistory();
  const { listItem, button } = useStyles();
  const { dispatch } = useAuth();
  return (
    <Drawer anchor='left' open={isOpen} onClose={() => handleClose(false)}>
      <Typography variant='h6'>
        ExcerTracker
      </Typography>
      <Divider />
      <List>
        <ListItem
          className={listItem}
          onClick={() => {
            handleClose(false);
            history.push('/exercises');
          }}
        >
          <ListItemText primary='Exercises' />
        </ListItem>
        <ListItem
          className={listItem}
          onClick={() => {
            handleClose(false);
            history.push('/create');
          }}
        >
          <ListItemText primary='Create Exercise Log' />
        </ListItem>
        <ListItem
          className={listItem}
          onClick={() => {
            handleClose(false);
            history.push('/user');
          }}
        >
          <ListItemText primary='Create User' />
        </ListItem>
      </List>
      <Divider />
      <Button
        className={button}
        variant='contained'
        onClick={() => {
          dispatch({ type: 'signOut' });
          handleClose(false);
        }}
      >
        Sign out
      </Button>
    </Drawer>
  );
}

DrawerMenu.propTypes = ({
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
});
