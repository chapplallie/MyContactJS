const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment 
|| 'https://mycontactjs.onrender.com';
const API_URL = `${baseUrl}/api`;

export async function createUser(data) {
    try {
        const response = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dataToSend = await response.json();
        window.location.href = "/auth";
        return dataToSend;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function authentUser(data) {
    try {
        const response = await fetch(`${API_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const dataToSend = await response.json();
    
        if (dataToSend.token) {
            localStorage.setItem('token', dataToSend.token);
            localStorage.setItem('userId', dataToSend.id);
            localStorage.setItem('userEmail', data.email);
            window.location.href = `/${dataToSend.id}/contacts`;
        } else {
            console.error('No token received from server');
        }
        return dataToSend;
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}