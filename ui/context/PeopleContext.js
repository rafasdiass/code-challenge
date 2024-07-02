// context/PeopleContext.js
import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { personReducer, initialState } from './personReducer';

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  return (
    <PeopleContext.Provider value={{ state, dispatch }}>
      {children}
    </PeopleContext.Provider>
  );
};

PeopleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePeopleContext = () => useContext(PeopleContext);
