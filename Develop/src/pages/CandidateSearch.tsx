import React, { useState } from 'react';

const searchGithub = async (term: string) => {
  const response = await fetch(`https://api.github.com/search/users?q=${term}`);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return await response.json();
};

const searchGithubUser = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error(`GitHub User API error: ${response.status}`);
  }
  return await response.json();
};

const CandidateSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      alert('Please enter a valid search term.');
      return;
    }
    try {
      const data = await searchGithub(searchTerm);
      if (data.items && data.items.length > 0) {
        const candidate = await searchGithubUser(data.items[0].login);
        setSelectedCandidate(candidate);
      } else {
        alert('No candidates found.');
        setSelectedCandidate(null);
      }
    } catch (error) {
      console.error('Error fetching candidate data:', error);
      alert('Failed to fetch candidates. Please try again.');
    }
  };

  const handleSaveCandidate = () => {
    if (!selectedCandidate) return;
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    const candidateData = {
      id: selectedCandidate.id,
      login: selectedCandidate.login,
      avatar_url: selectedCandidate.avatar_url,
      location: selectedCandidate.location || 'Unknown',
      email: selectedCandidate.email || 'Not Provided',
      company: selectedCandidate.company || 'Freelancer',
      bio: selectedCandidate.bio || 'No bio available.',
    };
    if (savedCandidates.some((candidate: { id: number }) => candidate.id === selectedCandidate.id)) {
      alert('This candidate is already saved.');
      return;
    }
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidateData]));
    alert('Candidate saved successfully.');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      <h1>Candidate Search</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search GitHub users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '250px',
            marginRight: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#008cff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>
      {selectedCandidate && (
        <div
          style={{
            margin: '0 auto',
            maxWidth: '300px',
            backgroundColor: '#000',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <img
            src={selectedCandidate.avatar_url}
            alt={selectedCandidate.login}
            style={{ width: '100%', borderRadius: '10px' }}
          />
          <h2 style={{ margin: '8px 0', fontSize: '18px' }}>
            {selectedCandidate.name || selectedCandidate.login} (
            <span style={{ fontStyle: 'italic', color: '#bbb' }}>{selectedCandidate.login}</span>)
          </h2>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>
            Location: {selectedCandidate.location || 'Unknown'}
          </p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>
            Email:{' '}
            {selectedCandidate.email ? (
              <a
                href={`mailto:${selectedCandidate.email}`}
                style={{ color: '#008cff' }}
              >
                {selectedCandidate.email}
              </a>
            ) : (
              'Not Provided'
            )}
          </p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>
            Company: {selectedCandidate.company || 'Freelancer'}
          </p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>
            Bio: {selectedCandidate.bio || 'No bio available.'}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
              gap: '30px',
            }}
          >
            <button
              onClick={() => setSelectedCandidate(null)}
              style={{
                backgroundColor: 'red',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.8)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              &minus;
            </button>
            <button
              onClick={handleSaveCandidate}
              style={{
                backgroundColor: 'green',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
