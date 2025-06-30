'use client';


import { createContact } from "@/app/api/contact.js";
import ContactModalLayout from "./ContactModalLayout.jsx";
import { useSession } from "next-auth/react";
import { showError, showSuccess } from "@/app/utils/alerts.js";


export default function AddContact({ isOpen, onClose  }) {

    const {data: session} = useSession();

    const handleSubmit = async (contactData) => {

        contactData.id_user = session.user.id_user;

        const response = await createContact(contactData);


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
            title={"Novo Contato"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )


}