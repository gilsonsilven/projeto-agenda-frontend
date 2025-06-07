'use client';

import { Scheduler } from "@aldabil/react-scheduler";
import { createEvent, getEvents, updateEvent, deleteEvent } from "@/api/events.js";
import { getContacts } from "@/api/contact.js";
import { useEffect, useState } from "react";

export default function HomePageScheduler() {

  const [eventList, setEventList] = useState([]);
  const [deletedEventFlag, setDeletedEventFlag] = useState(false);
  const [contactList, setContactList] = useState([]);


  useEffect(() => {
    const loadEventList = async () => {
      const data = await getEvents();
      /// tratar aqui depois
      console.log(data);

      
      setEventList(data)
    };

    loadEventList();
      
  }, [deletedEventFlag]);
  

  useEffect(() => {
    const loadContacts = async () => {
      const result = await getContacts(); 
      const data = result.map((c) => ({
        id: c.id_contact,
        text: c.name,
        value: c.name
      }));
      setContactList(data);
    };

    loadContacts();
    
  }, []);  


  const handleSubmit = async (event) => {

    if(event.event_id === null) {
      const {subtitle, Start, event_id, ...data} = event

      const response = await createEvent(data);

      console.log("Event created: linha 15", response);

      return {event_id: response.event_id, ...event};
    }
    else {

      const {subtitle, Start, ...data} = event

      const response = await updateEvent(data);

      console.log("Event updated: linha 15", response);

      return {event_id: response.event_id, ...event};      

    }
    //return {event_id: 1, ...event}
  } 

  const handleDelete = async (event) => {

    console.log("handleDelete: linha 54", event);

    //const {subtitle, Start, ...data} = event

    const response = await deleteEvent(event);

    console.log("Event deleted: linha 15", response);

    setDeletedEventFlag(true);

    return {event_id: response.event_id, ...event};     
  }


  return (

    <Scheduler
      view="month"
      agenda={false}
      day={false}
      //week={false}
      onConfirm={handleSubmit}
      onDelete={handleDelete}
      events={eventList}
      editable={true}
      fields={[
        {
          name: "subtitle",
          disabled: true,
        },
        {
          name: "address",
          type: "input",
          config: {
            label: "Endereço"
          }
        },
        {
          name: "Start"
        },          
        {
          name: "description",
          type: "input",
          config: { label: "Descrição", multiline: true, rows: 4 }
        },
        {
          name: "contacts",
          type: "select",
         
          
          // Should provide options with type:"select"
          // carregar a lista de contatos do usuário logado
          // depois
          options: contactList,
          config: { label: "Contatos", multiple: true}
        },          
      ]}
      key={contactList.length}
    
    />
  );

}