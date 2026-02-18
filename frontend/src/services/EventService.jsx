const API_URL = import.meta.env.VITE_API_URL;

export async function getAllEvents() {
    const url = `${API_URL}/events/`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load events');

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

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export async function updateEvent(data) {
    const id = data.id;
    
    const url = `${API_URL}/events/${id}`;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        console.error('Error updating event:', error);
        throw error;
    }
}

export async function removeEvent(id) {
    const url = `${API_URL}/events/${id}`;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;

    } catch (error) {
        console.error('Error removing event:', error);
        throw error;
    }
}

