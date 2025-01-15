import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  // Navigation bar with links to different pages
  return (
    <nav className='table nav'>
      <ul className='nav'>
        <li className="nav-item">
          <Link to="/CandidateSearch" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/SavedCandidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;