import { signIn } from "next-auth/react";

const API_BASE_URL = 'http://localhost:3001';
//const id_user = 11; // Placeholder for user ID, replace with actual logic to get logged-in user ID
// deixar id_user como variável global para não precisar passar em todas as funções



export async function createUser(userData) {

    const data = {
        ...userData,
        birth_date: userData.birth_date ? userData.birth_date.toDate() : null
        
    }


    const response = await fetch(`${API_BASE_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();


    console.log(result);
    
} 


export async function getUser(id_user) { // precisa receber o id do usuário logado como parâmetro

    const response = await fetch(`${API_BASE_URL}/user/${id_user}`, {
    headers: {
        'Content-Type': 'application/json'
    },
    cache: 'no-store'
    });

    const result = await response.json();

    console.log("get user linha 45", result.user)
    
    return result.user;
}


export async function updateUser(userData) {

    const response = await fetch(`${API_BASE_URL}/user/${userData.id_user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    console.log("update user linha 60", result)
    if (result.error) {
        throw new Error(result.error);
    }
    
    return result;    
}


export async function deleteUser(userData) {

    
    const id_user = userData.id_user;

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


export async function loginUser(userData) {

    const email = userData.email;
    const password = userData.password;
    
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false
    });




    if (result.ok) {
        return result
  
    } else {
        return console.log("erro"); 
    }
}