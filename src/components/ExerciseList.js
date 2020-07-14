import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles,
} from '@material-ui/core';
import ExerciseListItem from './ExerciseListItem';

const useStyles = makeStyles((theme) => ({
  headerText: {
    fontWeight: 'bold',
  },
}));

export default function ExerciseList() {
  const [state, setState] = useState({ exercises: [] });
  const { headerText } = useStyles();

  useEffect(() => {
    axios.get('/exercises')
      .then(({ data }) => {
        setState({ exercises: data });
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`exercises/${id}`)
      .then(({ data }) => console.log(data));

    setState({ exercises: state.exercises.filter((el) => el._id !== id) });
  };

  return (
    <TableContainer>
      <Table aria-label='exercise table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={headerText}>Username</TableCell>
            <TableCell className={headerText}>Activity</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          { state.exercises.map((currentexercise) => (
            <ExerciseListItem
              exercise={currentexercise}
              deleteExercise={deleteExercise}
              key={currentexercise._id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
