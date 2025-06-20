'use client';

import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import { updateUser, deleteUser } from '@/app/api/user.js';
import { deleteAllContacts } from '@/app/api/contact.js';
import { deleteAllEvents } from '@/app/api/events.js';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import BackupModal from './BackupModal.jsx';

export default function EditUserModal({isOpen, onClose, initialUserData}) {

    const {data: session} = useSession();
    
    const router = useRouter();
    const id_user = session?.user?.id_user;

    const [backupModalOpen, setBackupModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        id_user: id_user, // id do usuário que está logado
        name: '',
        email: '',
        birth_date: null,
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (initialUserData && typeof initialUserData === 'object' && Object.keys(initialUserData).length > 0) {
            setUserData({
            id_user: initialUserData.id_user ?? id_user,
            name: initialUserData.name ?? '',
            email: initialUserData.email ?? '',
            birth_date: initialUserData.birth_date ? dayjs(initialUserData.birth_date) : null,
            phone: initialUserData.phone ?? '',
            address: initialUserData.address ?? ''
            });
        }
    }, [initialUserData]);


    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value});
    };

    const handleDateChange = (date) => {
        setUserData({...userData, birth_date: date});
        console.log(date);
    };  

    const handleSubmit = async (e) => {

        e.preventDefault(); 

        console.log("edit user modal linha 55: ", userData)

        //// update user aqui
        /// tratar aqui depois

        const response = await updateUser(userData);

        
        // colocar uma mensagem de sucesso ou erro aqui
        // lembrar de limpar os campos do modal depois de enviar
        // adc algo para atualizar lista de contatos
        onClose(); // fecha o modal depois de enviar        
    }


    const handleDelete = async (e) => {
        e.preventDefault();

        if (!window.confirm("Tem certeza que deseja excluir esta conta?")) {
            return;
        }        

        try {
            const contactList = await deleteAllContacts(id_user);
            const eventList = await deleteAllEvents(id_user);
        }
        catch (error) {
            console.error("Erro ao deletar contatos ou eventos:", error);
         
        }

        router.push("/signIn");
       
    
        const response = await deleteUser(userData);

        // colocar uma mensagem de sucesso ou erro aqui
        // lembrar de limpar os campos do modal depois de enviar
        // adc algo para atualizar lista de contatos
        //onClose(); // fecha o modal depois de enviar     
    }


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/25 flex justify-center items-center">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="h-auto w-auto bg-white p-6 mb-20 rounded-lg">
                <div className="flex justify-center">
                    <h2 className="text-3xl font-semibold mb-1">Perfil</h2>
                </div>  
                <div className="flex justify-between mb-3">
                    <button onClick={handleDelete} className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-red-800 text-white text-[14px] hover:cursor-pointer">Deletar Contar?</button>
                    <button onClick={() => setBackupModalOpen(true)} type='button' className="font-semibold mt-4 mb-2 w-auto px-[34px] h-[36px] rounded bg-green-500 text-white text-[14px] hover:cursor-pointer">Backup</button>
                </div>
                <div className="flex justify-center">
                    <h3 className="text-2xl font-semibold mb-1">Editar Dados</h3>
                </div>  
                <div>
                    <input id="name" type="text" value={userData.name} onChange={handleChange} placeholder="Nome" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div>
                    <input id="email" type="email" value={userData.email} onChange={handleChange} placeholder="Email" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div>
                    <input  id="phone" type="text" value={userData.phone} onChange={handleChange} placeholder="Telefone" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div className="my-4">
                    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
                        <DatePicker className="w-[300px] z-[9989]" id="birth_date" value={userData.birth_date} onChange={handleDateChange} fullWidth label="Data de nascimento" name="StartDate" slotProps={{ textField: 
                            {
                                size: 'small',
                                InputProps: {
                                    style: { borderColor: '#d1d5db' }
                                }
                            }

                        }} />
                    </LocalizationProvider>
                </div>
                <div id="endereço">
                    <input id="address" type="text" value={userData.address} onChange={handleChange} placeholder="Endereço" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div className="flex justify-between">
                    <button onClick={onClose} className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-red-500 text-white hover:cursor-pointer">Cancelar</button>
                    <button type="submit" className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Salvar</button>
                </div>

            </form>
            <BackupModal backupModalIsOpen={backupModalOpen} backupModalOnClose={() => {setBackupModalOpen(false)}} onClose={onClose} id_user={id_user}/>
        </div>
    )
}

