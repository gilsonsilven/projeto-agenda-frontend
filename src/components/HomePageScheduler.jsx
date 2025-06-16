'use client';

import { Scheduler } from "@aldabil/react-scheduler";
import { createEvent, getEvents, updateEvent, deleteEvent } from "@/app/api/events.js";
import { getContacts } from "@/app/api/contact.js";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";


export default function HomePageScheduler() {

  const {data: session, status} = useSession();
  const id_user = session?.user?.id_user;

  const [eventList, setEventList] = useState([]);
  const [deletedEventFlag, setDeletedEventFlag] = useState(false);
  const [createdEventFlag, setCreatedEventFlag] = useState(false);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const loadEventList = async () => {
      const data = await getEvents(id_user);
      /// tratar aqui depois

      
      setEventList(data)

    
      setCreatedEventFlag(false);
      setDeletedEventFlag(false);
    };

    loadEventList();
      
  }, [deletedEventFlag, createdEventFlag]);
  

  useEffect(() => {
    const loadContacts = async () => {
      const result = await getContacts(id_user); 
      const data = result.contacts.map((c) => ({
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

      const response = await createEvent(data, id_user);


      setCreatedEventFlag(true);

      return {event_id: response.event_id, ...event};
    }
    else {

      const {subtitle, Start, ...data} = event

      const response = await updateEvent(data);

      return {event_id: response.event_id, ...event};      

    }

  } 

  const handleDelete = async (event) => {


    const response = await deleteEvent(event, id_user);

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
          config: { label: "Contatos", multiple: true, placeholder: "Selecione os contatos" }
        },          
      ]}
      key={contactList.length}
      locale={ ptBR }
      translations={{
        navigation: {
          today: "hoje",
          month: "mês",
          week: "semana"
        },
        form: {
          addTitle: "Adicionar Evento",
          editTitle: "Editar Evento",
          confirm: "Salvar",
          delete: "Excluir",
          cancel: "Cancelar"
        },
        event: {
          title: "Título",
          start: "Início",
          end: "Fim"
        },                
      }}
    
    />
  );

}