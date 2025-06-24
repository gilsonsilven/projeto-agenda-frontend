'use client'

import { updateContact } from "@/app/api/contact.js";
import ContactModalLayout from "./ContactModalLayout.jsx";


export default function EditContact({ isOpen, onClose, contactData}) {


    const handleSubmit = async (contactData) => {


        console.log("editcontact linha 15 - ", contactData)

        const response = await updateContact(contactData);

        
        console.log("response", response.errors);

        alert(response.message);

        onClose(); 

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