'use client'

import { updateContact } from "@/app/api/contact.js";
import ContactModalLayout from "./ContactModalLayout.jsx";
import { showError, showSuccess } from "@/app/utils/alerts.js";

export default function EditContact({ isOpen, onClose, contactData}) {


    const handleSubmit = async (contactData) => {



        const response = await updateContact(contactData);

        if(response?.errors) {
            showError(response.message, response.errors)
        }
        else {
            showSuccess(response.message)

            const timer = setTimeout(() => {
                onClose();
            }, 1000)           
        }


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