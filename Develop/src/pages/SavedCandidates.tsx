import React, { useState, useEffect } from 'react';
import '../SavedCandidates.css'; // Assuming you have CSS for styling

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  email: string;
  company: string;
  bio: string;
}

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]') as Candidate[];
    setSavedCandidates(candidates);
  }, []);

  // Remove candidate and update localStorage
  const handleRemoveCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    style={{ width: '50px', borderRadius: '50%' }}
                  />
                </td>
                <td>
                  <strong>{candidate.login}</strong>
                </td>
                <td>{candidate.location || 'Unknown'}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`} style={{ color: '#008cff' }}>
                      {candidate.email}
                    </a>
                  ) : (
                    'Not Provided'
                  )}
                </td>
                <td>{candidate.company || 'Freelancer'}</td>
                <td>{candidate.bio || 'No bio available.'}</td>
                <td>
                  <button
                    onClick={() => handleRemoveCandidate(candidate.id)}
                    style={{
                      backgroundColor: 'red',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      color: '#fff',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    &minus;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}>
          No saved candidates.
        </p>
      )}
    </div>
  );
};

export default SavedCandidates;
