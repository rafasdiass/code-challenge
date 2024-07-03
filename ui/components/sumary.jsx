// client/components/Summary.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePeopleContext } from '../context/PeopleContext';

const Summary = ({ people }) => {
  const { state } = usePeopleContext();
  const [checkedInPeople, setCheckedInPeople] = useState(0);
  const [notCheckedInPeople, setNotCheckedInPeople] = useState(0);
  const [peopleByCompany, setPeopleByCompany] = useState({});

  useEffect(() => {
    const checkedIn = people.filter(person => state.people[person._id]?.checkInDate && !state.people[person._id]?.checkOutDate).length;
    const notCheckedIn = people.filter(person => !state.people[person._id]?.checkInDate).length;

    const byCompany = people.reduce((acc, person) => {
      if (state.people[person._id]?.checkInDate && !state.people[person._id]?.checkOutDate) {
        acc[person.companyName] = (acc[person.companyName] || 0) + 1;
      }
      return acc;
    }, {});

    setCheckedInPeople(checkedIn);
    setNotCheckedInPeople(notCheckedIn);
    setPeopleByCompany(byCompany);
  }, [people, state.people]);

  return (
    <div className="my-6 p-4 border border-main rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <p className="mb-1">People in the event right now: {checkedInPeople}</p>
      <p className="mb-1">People by company in the event right now:</p>
      <ul className="ml-4 mb-1">
        {Object.entries(peopleByCompany).map(([company, count]) => (
          <li key={company}>{company}: {count}</li>
        ))}
      </ul>
      <p className="mb-1">People not checked in: {notCheckedInPeople}</p>
    </div>
  );
};

Summary.propTypes = {
  people: PropTypes.array.isRequired,
};

export default Summary;
