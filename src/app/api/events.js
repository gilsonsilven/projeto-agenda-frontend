


const API_BASE_URL = 'http://localhost:3001';
/// mudar a lógica para pegar o id do usuário que está logado
// id do usuário não está em eventData
//const id_user = 11; // Placeholder for user ID, replace with actual logic to get logged-in user ID

export async function createEvent(eventData, id_user) {

    const data = {
        ...eventData,
        event_start_date: eventData.start,
        event_end_date: eventData.end,
        contact_names: eventData.contacts.join(',') // converte de array de strings para uma única string
    };

    delete data.contacts; 
    delete data.start
    delete data.end

 

    const response = await fetch(`${API_BASE_URL}/events/user/${id_user}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    
    return result;

}


export async function getEvents(id_user) {


    const response = await fetch(`${API_BASE_URL}/events/user/${id_user}/list`, {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'

    });

    const result = await response.json();

    console.log("api events 53",result)
    
    /// tratar caso não tenha eventos
    /// tratar propriedades pois se não tiver o nome correto, o scheduler não renderiza
    const formattedEvents = result.events.map(
        ({ event_start_date, event_end_date, contact_names, id_event, ...event }) => ({
        ...event,
        start: new Date(event_start_date),
        end: new Date(event_end_date),
        contacts: contact_names ? contact_names.split(', ') : [], // passa de string para array de strings
        event_id: id_event


    }));

    // formattedEvents são eventos já formatados para serem carregados no scheduler
    const events = {
        events: result.events,
        formattedEvents: formattedEvents
    }
    
    return events

}


export async function updateEvent(eventData) {

    const data = {
        ...eventData,
        event_start_date: eventData.start,
        event_end_date: eventData.end,
        contact_names: eventData.contacts.join(','),
        id_event: eventData.event_id
    };

    delete data.contacts; 
    delete data.start;
    delete data.end;
    delete data.event_id;


 

    const response = await fetch(`${API_BASE_URL}/events/user/${eventData.id_user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    
    return result;

}


export async function deleteEvent(event_id, id_user) {

    const id_event = event_id;

 

    const response = await fetch(`${API_BASE_URL}/events/user/${id_user}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_event})
    });

    const result = await response.json();

    
    return result;

}


export async function deleteAllEvents(id_user) {


    const response = await fetch(`${API_BASE_URL}/events/user/${id_user}/list`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    
    return result.events;    
}
