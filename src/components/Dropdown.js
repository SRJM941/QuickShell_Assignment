
import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingChange = (value) => {
    setGrouping(value);
    setIsDropdownOpen(false);
  };

  const handleOrderingChange = (value) => {
    setOrdering(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header" onClick={handleDropdownClick}>
        {/* Replace these placeholders with actual logo icons */}
        <span className="logo-left">
        <img src="/Untitled/icons_FEtask/Display.svg" alt="Logo 1" />
        </span>
        <span>Display</span>
        <span className="logo-right">
        <img className="logo" src="/Untitled/icons_FEtask/icons8-dropdown-50.png" alt="Logo 2" />
        </span>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className="grouping-section">
            <label>Grouping</label>
            <select
              value={grouping}
              onChange={(e) => handleGroupingChange(e.target.value)}
            >
              <option value="status">By Status</option>
              <option value="user">By User</option>
              <option value="priority">By Priority</option>
            </select>
          </div>

          <div className="ordering-section">
            <label>Ordering</label>
            <select
              value={ordering}
              onChange={(e) => handleOrderingChange(e.target.value)}
            >
              <option value="priority">By Priority</option>
              <option value="title">By Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

