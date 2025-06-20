


const API_BASE_URL = 'http://localhost:3001';


export async function restoreData(backupData, id_user) {

    const response = await fetch(`${API_BASE_URL}/restore/user/${id_user}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(backupData)
    });


    const result = await response.json();
 
    return result;
}