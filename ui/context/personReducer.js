// context/personReducer.js
import { CHECK_IN, CHECK_OUT, RESET } from './constants';

export const initialState = {
  people: {}
};

export const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IN:
      return {
        ...state,
        people: {
          ...state.people,
          [action.personId]: { checkInDate: true, checkOutDate: false }
        }
      };
    case CHECK_OUT:
      return {
        ...state,
        people: {
          ...state.people,
          [action.personId]: { checkInDate: false, checkOutDate: true }
        }
      };
    case RESET: {
      const newPeople = Object.assign({}, state.people);
      delete newPeople[action.personId];
      return {
        ...state,
        people: newPeople
      };
    }
    default:
      return state;
  }
};
