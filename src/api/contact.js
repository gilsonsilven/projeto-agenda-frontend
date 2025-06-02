


const API_BASE_URL = 'http://localhost:3001';



export async function createContact(contactData) {

    /// mudar a lógica para pegar o id do usuário que está logado
    const id_user = contactData.id_user;
    console.log(id_user);


    const data = {
        ...contactData,
        birth_date: contactData.birth_date ? contactData.birth_date.toDate() : null
    };

    console.log(data);

    const response = await fetch(`${API_BASE_URL}/contacts/user/${id_user}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    console.log(result);
    
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

    console.log(result);
    
    return result;

}


export async function updateContact(contactData) {

        

    console.log(contactData);

    console.log(JSON.stringify(contactData))

    const response = await fetch(`${API_BASE_URL}/contacts/user/${contactData.id_user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    });

    const result = await response.json();

    console.log(result);
    
    return result;

}