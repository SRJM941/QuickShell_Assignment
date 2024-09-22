import React from 'react';
import TaskCard from './TaskCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, users, grouping, ordering }) => {
  const groupAndSortTickets = () => {
    let groupedTickets = {};

    tickets.forEach(ticket => {
      let groupKey;

      if (grouping === 'user') {
        groupKey = ticket.userId;
      } else if (grouping === 'priority') {
        switch (ticket.priority) {
          case 4:
            groupKey = 'Urgent';
            break;
          case 3:
            groupKey = 'High';
            break;
          case 2:
            groupKey = 'Medium';
            break;
          case 1:
            groupKey = 'Low';
            break;
          case 0:
          default:
            groupKey = 'No priority';
        }
      } else {
        groupKey = ticket.status;
      }

      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      groupedTickets[groupKey].push(ticket);
    });

    Object.keys(groupedTickets).forEach(group => {
      if (ordering === 'priority') {
        groupedTickets[group].sort((a, b) => b.priority - a.priority);
      } else {
        groupedTickets[group].sort((a, b) => a.title.localeCompare(b.title));
      }
    });

    return groupedTickets;
  };

  const groupedTickets = groupAndSortTickets();

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => {
        const taskCount = groupedTickets[group].length;
        const showRadio = grouping !== 'status'; // Show radio button unless grouping is 'status'

        return (
          <div key={group} className="kanban-column">
            <div className="column-header">
              <div className='name'>
                {grouping === 'user' ? (
                  <img src="/Untitled/icons_FEtask/user.svg" alt="User Logo" className="header-logo" />
                ) : (
                  <>
                    {group === 'Todo' && (
                      <img src="/Untitled/icons_FEtask/To-do.svg" alt="To-do Logo" className="header-logo" />
                    )}
                    {group === 'In progress' && (
                      <img src="/Untitled/icons_FEtask/in-progress.svg" alt="In progress Logo" className="header-logo" />
                    )}
                    {group === 'Backlog' && (
                      <img src="/Untitled/icons_FEtask/Backlog.svg" alt="Backlog Logo" className="header-logo" />
                    )}
                    {group === 'No priority' && (
                      <img src="/Untitled/icons_FEtask/3 dot menu.svg" alt="No priority Logo" className="header-logo" />
                    )}
                    {group === 'Urgent' && (
                      <img src="/Untitled/icons_FEtask/exclamation_5584481.png" alt="Urgent Logo" className="header-logo" />
                    )}
                    {group === 'High' && (
                      <img src="/Untitled/icons_FEtask/Img - High Priority.svg" alt="High Logo" className="header-logo" />
                    )}
                    {group === 'Medium' && (
                      <img src="/Untitled/icons_FEtask/Img - Medium Priority.svg" alt="Medium Logo" className="header-logo" />
                    )}
                    {group === 'Low' && (
                      <img src="/Untitled/icons_FEtask/Img - Low Priority.svg" alt="Low Logo" className="header-logo" />
                    )}
                  </>
                )}
                <h2>{grouping === 'user' ? users.find(user => user.id === group)?.name : group}</h2>
                <span className="task-count">{taskCount}</span>
              </div>

              <div className="header-logos">
                <img src="/Untitled/icons_FEtask/add.svg" alt="Logo 1" className="header-logo" />
                <img src="/Untitled/icons_FEtask/3 dot menu.svg" alt="Logo 2" className="header-logo" />
              </div>
            </div>
            {groupedTickets[group].map(ticket => (
              <TaskCard key={ticket.id} ticket={ticket} showRadio={showRadio} />
            ))}
          </div>
        );
      })}

      {/* Ensure same CSS applies to Canceled and Done columns */}
      {grouping === 'status' ? (
        <>
          <div className="kanban-column">
            <div className="column-header">
              <div className='name'>
              <img src="/Untitled/icons_FEtask/Done.svg" alt="Backlog Logo" className="header-logo" />
                <h2>Done</h2>
                <span className="task-count">{groupedTickets['Done'] ? groupedTickets['Done'].length : 0}</span>
              </div>

              <div className="header-logos">
                <img src="/Untitled/icons_FEtask/add.svg" alt="Logo 1" className="header-logo" />
                <img src="/Untitled/icons_FEtask/3 dot menu.svg" alt="Logo 2" className="header-logo" />
              </div>
            </div>
            {groupedTickets['Done'] && groupedTickets['Done'].length > 0 ? (
              groupedTickets['Done'].map(ticket => (
                <TaskCard key={ticket.id} ticket={ticket} showRadio={false} />
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>

          <div className="kanban-column">
            <div className="column-header">
              <div className='name'>
              <img src="/Untitled/icons_FEtask/Cancelled.svg" alt="Backlog Logo" className="header-logo" />
                <h2>Canceled</h2>
                <span className="task-count">{groupedTickets['Canceled'] ? groupedTickets['Canceled'].length : 0}</span>
              </div>

              <div className="header-logos">
                <img src="/Untitled/icons_FEtask/add.svg" alt="Logo 1" className="header-logo" />
                <img src="/Untitled/icons_FEtask/3 dot menu.svg" alt="Logo 2" className="header-logo" />
              </div>
            </div>
            {groupedTickets['Canceled'] && groupedTickets['Canceled'].length > 0 ? (
              groupedTickets['Canceled'].map(ticket => (
                <TaskCard key={ticket.id} ticket={ticket} showRadio={false} />
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default KanbanBoard;
