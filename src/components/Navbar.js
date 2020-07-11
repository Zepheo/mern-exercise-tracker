import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  listItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#eee',
    },
  },
}));

export default function Navbar() {
  const { root, title, listItem } = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor='left' open={menuOpen} onClose={() => setMenuOpen(false)}>
            <List>
              <ListItem
                className={listItem}
                onClick={() => {
                  setMenuOpen(false);
                  history.push('/');
                }}
              >
                <ListItemText primary='Exercises' />
              </ListItem>
              <ListItem
                className={listItem}
                onClick={() => {
                  setMenuOpen(false);
                  history.push('/create');
                }}
              >
                <ListItemText primary='Create Exercise Log' />
              </ListItem>
              <ListItem
                className={listItem}
                onClick={() => {
                  setMenuOpen(false);
                  history.push('/user');
                }}
              >
                <ListItemText primary='Create User' />
              </ListItem>
            </List>
          </Drawer>
          <Typography
            className={title}
            variant='h6'
            onClick={() => history.push('/')}
          >
            ExcerTracker
          </Typography>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
