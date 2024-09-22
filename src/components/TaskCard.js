
import React from 'react';
import './TaskCard.css';

const TaskCard = ({ ticket, showRadio }) => {
  return (
    <div className="task-card">
      <p className="ticket-id">{ticket.id}</p>
      <div className="task-content">
        <div className="radio-title">
          {showRadio && (
            <input type="radio" checked={ticket.status === 'Done'} readOnly />
          )}
          <h5 className="task-title">{ticket.title}</h5>
        </div>
        
          <div className="ticket-details">
            <img src="/Untitled/icons_FEtask/3 dot menu.svg" alt="Logo" />
            <p className="tags">{ticket.tag.join(', ')}</p>
          </div>
      </div>
    </div>
  );
};

export default TaskCard;


// import React from 'react';
// import './TaskCard.css';

// const TaskCard = ({ ticket, showRadio }) => {
//   return (
//     <div className="task-card">
//       {showRadio && (
//         <div className="ticket-id">
//           <p>{ticket.id}</p>
//           <input type="radio" checked={ticket.status === 'Done'} readOnly />
//         </div>
//       )}
//       <h5>{ticket.title}</h5>
//       <div className="ticket-details">
//         <img src="/path/to/logo.svg" alt="Logo" /></div>}
//         <p>Tags: {ticket.tag.join(', ')}</p>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;


