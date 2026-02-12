const API_URL = 'http://localhost:3001/api';

// users

export async function fetchUsers(id = "") {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to load users');

    // parse as json
    const data = await response.json();

    // returning array of events  
    return data.results;
}; 