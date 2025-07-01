"use client"

import { getContacts, deleteAllContacts } from "@/app/api/contact.js";
import { getEvents, deleteAllEvents } from "@/app/api/events.js";
import { restoreData } from "@/app/api/backup.js";
import { useRouter, usePathname } from "next/navigation";
import dayjs from "dayjs";
import { showError, showSuccess } from "@/app/utils/alerts.js";


export default function BackupModal({ backupModalIsOpen, backupModalOnClose, id_user, onClose }) {

    const router = useRouter();
    const pathname = usePathname();

    const handleBackup = async () => {

        const contacts = await getContacts(id_user);
        const events = await getEvents(id_user);

        // tirar id dos contatos e eventos
        const formattedContacts = contacts.contacts.map(
            ({id_contact, ...contact}) => ({
            ...contact,
        }));
        const formattedEvents = events.events.map(
            ({id_event, ...event}) => ({
            ...event,
        }));


        const backupData = {
            contacts: formattedContacts,
            events: formattedEvents
        };

        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        //a.download = "backup.json"
        a.download = `backup-${dayjs().format("DD-MM-YYYY")}.json`; 
         
        a.click();

        showSuccess("Backup realizado com sucesso!");

        backupModalOnClose();

    }

    const handleRestore = async (e) => {

        try {
            const file = e.target.files[0];
            const reader = new FileReader();
            

            reader.onload = async (event) => {
                const data = JSON.parse(event.target.result);

                // deleta todos os contatos e eventos do usuário antes de restaurar
                await deleteAllContacts(id_user);
                await deleteAllEvents(id_user);

                const response = await restoreData(data, id_user);
                
                if(response?.errors) {
                    showError(response.message, response.errors);
                    return;

                }
                showSuccess(response.message);

                //// teste
                const timer = setTimeout(() => {
                    window.location.reload();
                }, 2000)
                


                //onClose(); // para fechar o modal de edição de usuário
                //backupModalOnClose();
            };   

            reader.readAsText(file);

        }
        catch(error) {
            console.error("Erro ao restaurar dados:", error);
            alert("Erro ao restaurar dados. Verifique o arquivo e tente novamente.");
        }
            
    };

    if (!backupModalIsOpen) return null;

    return (

        <div className="fixed inset-0 z-[9999] bg-black/25 flex justify-center items-center">
            <div className="h-auto w-auto bg-white p-8 mb-40 rounded-lg">
                <div className="flex justify-center">
                    <h2 className="text-3xl font-semibold mb-4">Backup</h2>
                </div>    
                <div className="flex flex-col justify-between">
                    <button onClick={handleBackup} className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-indigo-500 text-white hover:cursor-pointer">Realizar Backup</button>
                    <button className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-green-500 text-white hover:cursor-pointer">
                        <label className="cursor-pointer">
                            Restaurar Dados
                            <input onChange={handleRestore} className="hidden left-0 top-0 w-full h-full opacity-0" type="file" accept="application/json" />
                        </label>
                    </button>
                    
                    <button onClick={backupModalOnClose} className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-red-500 text-white hover:cursor-pointer">Cancelar</button>
                        
                </div>
            </div>
        </div>
    )
}