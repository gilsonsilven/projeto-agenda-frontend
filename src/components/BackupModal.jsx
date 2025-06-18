"use client"


export default function BackupModal({ backupModalIsOpen, backupModalOnClose }) {




    if (!backupModalIsOpen) return null;

    return (

        <div className="fixed inset-0 z-[9999] bg-black/25 flex justify-center items-center">
            <div className="h-auto w-auto bg-white p-6 mb-40 rounded-lg">
                <div className="flex justify-center">
                    <h2 className="text-3xl font-semibold mb-1">Backup</h2>
                </div>    
                <div className="flex flex-col justify-between">
                    <button className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Salvar</button>
                    <button className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Salvar</button>
                    <button onClick={backupModalOnClose} className="font-semibold mt-4 mb-2 w-auto px-2 h-[36px] rounded bg-red-500 text-white hover:cursor-pointer">Cancelar</button>
                        
                </div>
            </div>
        </div>
    )
}