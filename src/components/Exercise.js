import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${exercise._id}`}>edit</Link>
      {' '}
      |
      {' '}
      <button type='button' onClick={() => { deleteExercise(exercise._id); }}>delete</button>
    </td>
  </tr>
);

Exercise.propTypes = ({
  exercise: PropTypes.shape({
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  deleteExercise: PropTypes.func.isRequired,
});

export default Exercise;
