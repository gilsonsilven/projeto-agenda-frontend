'use client';

import PageLayout from "@/components/PageLayout.jsx"
import AddContact from "@/components/AddContact.jsx"
import EditContact from "@/components/EditContact.jsx";
import { getContacts, deleteContact } from "@/app/api/contact.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Bag,
    Edit
} from "iconsax-react"
import { useSession } from "next-auth/react";
import { showConfirm } from "../utils/alerts.js";



export default function Contacts() {

    const {data: session, status} = useSession();
    const id_user = session?.user?.id_user;   
    const router = useRouter();

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [contactDeletedFlag, setContactDeletedFlag] = useState(false)

    const [contactList, setContactList] = useState([]);
    const [selectedContact, setSelectedContact] = useState(''); //pegar o id do contato para editar as info do contato


    if (status === "loading") {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <p className="mb-4">Carregando...</p>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        )
    }

    if (status === "unauthenticated") {
        const timer = setTimeout(() => {
            router.push("/signIn");
        }, 5000)

        return (
            <div className="flex justify-center items-center h-screen">
                <p>Você precisa estar logado para acessar esta página. Redirecionando...</p>
            </div>
        )
    }

    useEffect(() => {

      
        const loadContactList = async () => {

            
            const data = await getContacts(id_user);            
            setContactList(data.contacts)
        };

        
        loadContactList();
        setContactDeletedFlag(false);
         
    }, [addModalOpen, editModalOpen, contactDeletedFlag]); 

    
    const handleEditClick = (id_contact) => {

        const data = contactList.find(c => c.id_contact === id_contact);
        
        setSelectedContact(data);

        setEditModalOpen(true);
    }


    const handleDeleteClick = async (id_contact) => {


        const response = await showConfirm('Tem certeza que deseja excluir este contato?');
        if(!response.isConfirmed) {
            return;
        }

        const data = contactList.find(c => c.id_contact === id_contact);
   

        const removeContact = async (data) => {

            await deleteContact(data)

   
            setContactDeletedFlag(true);

        }

        removeContact(data);
        
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
                                                <Bag onClick={() => handleDeleteClick(val.id_contact) } size={20} color="#555555" className="mx-2 cursor-pointer" />
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