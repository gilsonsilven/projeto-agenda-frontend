

const API_BASE_URL = 'http://localhost:3001';




export async function createContact(contactData) {

    const id_user = contactData.id_user


    const data = {
        ...contactData,
        birth_date: contactData.birth_date ? contactData.birth_date.toDate() : null
    };

    const response = await fetch(`${API_BASE_URL}/contacts/user/${id_user}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    
    return result;

}


export async function getContacts(id_user) {

    const response = await fetch(`${API_BASE_URL}/contacts/user/${id_user}/list`, {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'

    });

    const result = await response.json();

    console.log(result.contacts)

    
    return result;

}


export async function updateContact(contactData) {

    

    const response = await fetch(`${API_BASE_URL}/contacts/user/${contactData.id_user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    });

    const result = await response.json();

    
    return result;
}


/// delete recebe todo o contato para que eu possa pegar id_user, mudar isso depois

export async function deleteContact(contactData) {

    /// mudar a lógica para pegar o id do usuário que está logado
    const {id_user, id_contact, ...data} = contactData;


    const response = await fetch(`${API_BASE_URL}/contacts/user/${id_user}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_contact})
    });

    const result = await response.json();

    
    return result;    
}


export async function deleteAllContacts(id_user) {

    /// mudar a lógica para pegar o id do usuário que está logado
    //const id_user = contactData.id_user;

    const response = await fetch(`${API_BASE_URL}/contacts/user/${id_user}/list`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    
    return result;    
}