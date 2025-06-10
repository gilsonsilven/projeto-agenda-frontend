
const API_BASE_URL = 'http://localhost:3001';
const id_user = 6; // Placeholder for user ID, replace with actual logic to get logged-in user ID
// deixar id_user como variável global para não precisar passar em todas as funções

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


export async function getUser() { // precisa receber o id do usuário logado como parâmetro

    const response = await fetch(`${API_BASE_URL}/user/${id_user}`, {
    headers: {
        'Content-Type': 'application/json'
    },
    cache: 'no-store'
    });

    const result = await response.json();

    console.log("api user linha 44:",result);

    
    return result;
}


export async function updateUser(userData) {

    const response = await fetch(`${API_BASE_URL}/user/${id_user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    
    return result;    
}


export async function deleteUser() {

    /// mudar a lógica para pegar o id do usuário que está logado


    console.log("api user linha 84: ",typeof(id_user));


    const response = await fetch(`${API_BASE_URL}/user/${id_user}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_user})
    });

    const result = await response.json();

    
    return result;        



}