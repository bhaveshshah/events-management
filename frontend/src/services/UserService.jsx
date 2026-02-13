const API_URL = 'http://localhost:3001/api';

// users

export async function fetchUsers(id = "") {
    const url = id ? `${API_URL}/users/${id}` : `${API_URL}/users`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load users');

    // parse as json
    const data = await response.json();

    // returning array of events  
    return data.results;
}; 

export async function deleteUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return true;
}