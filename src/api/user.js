
const API_BASE_URL = 'http://localhost:3001';

export async function createUser(userData) {

    const data = {
        ...userData,
        birth_date: userData.birth_date ? userData.birth_date.toDate() : null
        
    }
    
    console.log(data);
    console.log(userData)

    const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();


    console.log(result);
    
} 