import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton, useScrollTrigger, Slide,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DrawerMenu from './DrawerMenu';
import { useAuth } from '../context/auth';

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
  const { root, title } = useStyles();
  const { state } = useAuth();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={root}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            {state.isAuthenticated ? (
              <IconButton edge='start' color='inherit' aria-label='menu' onClick={() => setMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography
              className={title}
              variant='h6'
              onClick={() => { state.isAuthenticated ? history.push('/exercises') : history.push('/'); }}
            >
              ExcerTracker
            </Typography>
            {state.isAuthenticated ? (
              <IconButton edge='end' color='inherit' aria-label='create' onClick={() => history.push('/create')}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            ) : null}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <DrawerMenu isOpen={menuOpen} handleClose={setMenuOpen} />
    </nav>
  );
}
