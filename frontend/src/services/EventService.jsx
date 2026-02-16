const API_URL = 'http://localhost:3001/api';

export async function getAllEvents() {
    const url = `${API_URL}/events/`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load users');

    const data = await response.json();

    return data.results;
}


export async function getEvent(id) {
    const url = `${API_URL}/events/${id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load event');
    const data = await response.json();
    return data.results;
}

export async function addEvent(data) {
    const url = `${API_URL}/events`;
    const token = localStorage.getItem('token');

    try {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add if needed
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                date: data.date,
                location: data.location,
                latitude: data.latitude,
                longitude: data.longitude
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error adding event:', error);
        throw error;
    }
}

