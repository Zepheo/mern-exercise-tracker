import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton,
  Drawer, List, ListItem, ListItemText, Divider, useScrollTrigger, Slide,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

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

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = ({
  children: PropTypes.element.isRequired,
});

export default function Navbar() {
  const { root, title, listItem } = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={root}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu' onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography
              className={title}
              variant='h6'
              onClick={() => history.push('/')}
            >
              ExcerTracker
            </Typography>
            <IconButton edge='end' color='inherit' aria-label='create' onClick={() => history.push('/create')}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Drawer anchor='left' open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Typography variant='h6'>
          ExcerTracker
        </Typography>
        <Divider />
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
    </nav>
  );
}
