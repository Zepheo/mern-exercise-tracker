import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Exercise from './Exercise';

export default function ExerciseList() {
  const [state, setState] = useState({ exercises: [] });

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

  const exerciseList = () => state.exercises.map((currentexercise) => (
    <Exercise
      exercise={currentexercise}
      deleteExercise={deleteExercise}
      key={currentexercise._id}
    />
  ));

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { exerciseList() }
        </tbody>
      </table>
    </div>
  );
}
