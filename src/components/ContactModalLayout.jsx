'use client';

import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

export default function ContactModalLayout({title, isOpen, onClose, initialContactData, onSubmit}) {


    // id do usuario que está logado vem da onde? Pesquisar depois
    const [id_user] = useState(1);
    ///////

    const [contactData, setContactData] = useState({
        id_user: id_user, // id do usuário que está logado
        name: '',
        email: '',
        birth_date: null,
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (initialContactData && typeof initialContactData === 'object' && Object.keys(initialContactData).length > 0) {
            setContactData({
            id_user: initialContactData.id_user ?? id_user,
            id_contact: initialContactData.id_contact ?? '',
            name: initialContactData.name ?? '',
            email: initialContactData.email ?? '',
            birth_date: initialContactData.birth_date ? dayjs(initialContactData.birth_date) : null,
            phone: initialContactData.phone ?? '',
            address: initialContactData.address ?? ''
            });
        }
    }, [initialContactData]);




    const handleChange = (e) => {
        setContactData({...contactData, [e.target.id]: e.target.value});
    };

    const handleDateChange = (date) => {
        setContactData({...contactData, birth_date: date});
        console.log(date);
    };  

    const handleSubmit = async (e) => {

        e.preventDefault(); 


        onSubmit(contactData)
        /// tratar aqui depois

    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/25 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="h-auto w-auto bg-white p-8 mb-40 rounded-lg">
                <div className="flex justify-center">
                    <h2 className="text-3xl font-semibold mb-3">{title}</h2>
                </div>  
                <div>
                    <input id="name" type="text" value={contactData.name} onChange={handleChange} placeholder="Nome" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div>
                    <input id="email" type="email" value={contactData.email} onChange={handleChange} placeholder="Email" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div>
                    <input  id="phone" type="text" value={contactData.phone} onChange={handleChange} placeholder="Telefone" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div className="my-4">
                    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
                        <DatePicker className="w-[300px]" id="birth_date" value={contactData.birth_date} onChange={handleDateChange} fullWidth label="Data de nascimento" name="StartDate" slotProps={{ textField: 
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
                    <input id="address" type="text" value={contactData.address} onChange={handleChange} placeholder="Endereço" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-4"></input>
                </div>
                <div className="flex justify-between">
                    <button onClick={onClose} className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-red-500 text-white hover:cursor-pointer">Cancelar</button>
                    <button type="submit" className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Salvar</button>
                </div>
            </form>
        </div>
    )
}

