import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext(initialState);

export function useAuth() {
  return useContext(AuthContext);
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'signOut':
      return initialState;
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = ({
  children: PropTypes.element.isRequired,
});
