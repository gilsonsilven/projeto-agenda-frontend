'use client';

import PageLayout from "@/components/PageLayout.jsx"
import AddContact from "@/components/AddContact.jsx"
import EditContact from "@/components/EditContact.jsx";
import { getContacts } from "@/api/contact.js";
import { useState, useEffect } from "react";
import {
    Bag,
    Edit
} from "iconsax-react"




export default function Contacts() {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [contactList, setContactList] = useState([]);
    const [selectedContact, setSelectedContact] = useState(''); //pegar o id do contato para editar as info do contato



    /// Tratar data de nascimento do contato
    /// tratar caso não tenha contatos cadastrados
    /// tratar caso não conecte no backend


    ///// Mudar lógica de como pegar id do usuário 
    const id_user = 1;

    ///tratar isso aqui depois
    useEffect(() => {

      
        const loadContactList = async () => {

            console.log(id_user)

            const data = await getContacts(id_user);
            /// tratar aqui depois
            console.log(data);

            
            setContactList(data)
        };

        
        loadContactList();
         
    }, [addModalOpen, editModalOpen]); 

    
    const handleEditClick = (id_contact) => {

        const data = contactList.find(c => c.id_contact === id_contact);
        console.log("contacts linha 58 - ",data)
        setSelectedContact(data);

        

        setEditModalOpen(true);
    }

    return (

        <PageLayout>
            <div className="flex justify-between align-center mx-4 mt-4">
                <h1 className="text-xl font-semibold">Meus Contatos</h1>
                <button onClick={() => setAddModalOpen(true)} className="p-1 w-[70px] rounded bg-blue-500 text-white hover:cursor-pointer">Novo</button>
            </div>
            <div className="mx-4 mt-4">
                <table className="table-fixed bg-white border-separate border-spacing-0 w-full">
                    <thead>
                        <tr className="bg-[#E1E1E1] h-12">
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Data de nascimento</th>
                            <th>Email</th>
                            <th>Endereço</th>                        
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                         {contactList.map((val) => {
                                return (
                                    <tr key={val.id_contact}>
                                        <td className="h-12">{val.name}</td>
                                        <td className="h-12">{val.phone}</td>
                                        <td className="h-12">{val.birth_date
                                            ? new Date(val.birth_date).toLocaleDateString('pt-BR') 
                                            : 'N/A'}
                                        </td>
                                        <td className="h-12">{val.email}</td>
                                        <td className="h-12">{val.address}</td>
                                        <td className="h-12">
                                            <div className="flex justify-center">
                                                <Edit onClick={() => handleEditClick(val.id_contact) } size={20} color="#555555" className="mx-2 cursor-pointer" />
                                                <Bag size={20} color="#555555" className="mx-2 cursor-pointer" />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}                   
                    </tbody>

                </table>
            </div>
            <AddContact isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
            <EditContact contactData={selectedContact} isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} />
        </PageLayout>
    )
}