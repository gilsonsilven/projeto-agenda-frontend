'use client';


import { createContact } from "@/api/contact.js";
import ContactModalLayout from "./ContactModalLayout.jsx";


export default function AddContact({ isOpen, onClose  }) {

    const handleSubmit = async (contactData) => {

        const response = await createContact(contactData);


        console.log(response);
        // colocar uma mensagem de sucesso ou erro aqui
        // lembrar de limpar os campos do modal depois de enviar
        // adc algo para atualizar lista de contatos
        onClose(); // fecha o modal depois de enviar

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