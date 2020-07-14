import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TableRow, TableCell, IconButton, makeStyles, Typography, Collapse, Box, Table, TableBody,
} from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  noBottomBorder: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
}));

const ExerciseListItem = ({ exercise, deleteExercise }) => {
  const history = useHistory();
  const { flex, noBottomBorder } = useStyles();
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  if (deleting) {
    return (
      <TableRow>
        <TableCell align='center' colSpan={3}>
          <Typography>
            Delete this entry?
          </Typography>
        </TableCell>
        <TableCell align='right'>
          <IconButton edge='start' color='inherit' aria-label='delete' onClick={() => deleteExercise(exercise._id)}>
            <CheckCircleOutlinedIcon />
          </IconButton>
          <IconButton edge='start' color='inherit' aria-label='delete' onClick={() => setDeleting(false)}>
            <CancelOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableRow className={noBottomBorder}>
        <TableCell>
          <IconButton aria-label='expand' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{exercise.username}</TableCell>
        <TableCell>{exercise.description}</TableCell>
        <TableCell align='right' className={flex}>
          <IconButton edge='start' color='inherit' aria-label='delete' onClick={() => setDeleting(true)}>
            <DeleteOutlined />
          </IconButton>
          <IconButton edge='start' color='inherit' aria-label='edit' onClick={() => history.push(`/edit/${exercise._id}`)}>
            <EditOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} colSpan={4}>
          <Collapse in={open} unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom>
                Details
              </Typography>
              <Table size='small' aria-label='details'>
                <TableBody>
                  <TableRow>
                    <TableCell>Duration</TableCell>
                    <TableCell align='right'>{`${exercise.duration} minutes`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align='right'>{exercise.date.substring(0, 10)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

ExerciseListItem.propTypes = ({
  exercise: PropTypes.shape({
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  deleteExercise: PropTypes.func.isRequired,
});

export default ExerciseListItem;
