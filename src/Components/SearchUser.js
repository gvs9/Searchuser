import React, { useState,useEffect } from 'react';
import './SearchUser.css';

function SearchUser() {
    const [searchName, setSearchName] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
  
    const fetchUsers = async (value) => {
      try {
        setError(null);
        if (value.trim() === '') {
          setUsers([]); 
        } else {
          const response = await fetch(
            `https://api.github.com/search/users?q=${value}&sort=followers`
          );

          if (response.ok) {
            const data = await response.json();
            setUsers(data.items);
          } else {
            setError(`Error: ${response.status} - ${response.statusText}`);
          }
        }
      } catch (err) {
        setError('whil fetching error occuredddd');
      }
    };
  
    useEffect(() => {
        setError(null);
      fetchUsers(searchName);
    }, [searchName]);
  
    return (
      <div className="user-search-container">
        <input
          type="text"
          placeholder="Search Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => fetchUsers(searchName)}
          className="search-button"
        >
          Search
        </button>
        <table className="user-list">
          <thead>
            <tr>
              <th>Username</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.login}</td>
                <td>{user.followers}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
  export default SearchUser;
