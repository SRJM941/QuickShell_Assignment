import React, { useState, useEffect } from 'react';
import Dropdown from './components/Dropdown';
import KanbanBoard from './components/KanbanBoard';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);


  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

  return (
    <div className="App">
      <Dropdown grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} ordering={ordering} />
    </div>
  );
};

export default App;

