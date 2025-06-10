'use client'

import { updateContact } from "@/api/contact.js";
import ContactModalLayout from "./ContactModalLayout.jsx";


export default function EditContact({ isOpen, onClose, contactData}) {


    const handleSubmit = async (contactData) => {


        console.log("editcontact linha 15 - ", contactData)

        const response = await updateContact(contactData);

        
        // colocar uma mensagem de sucesso ou erro aqui
        // lembrar de limpar os campos do modal depois de enviar
        // adc algo para atualizar lista de contatos
        onClose(); // fecha o modal depois de enviar

    }
    

    return (

        <ContactModalLayout 
            title={"Editar Contato"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            initialContactData={contactData}
        />
    )



}