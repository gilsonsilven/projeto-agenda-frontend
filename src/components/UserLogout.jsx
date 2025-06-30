'use client'

import {
    Logout
} from "iconsax-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { showConfirm } from "@/app/utils/alerts.js";

export default function UserLogout() {

    const handleLogout = async (e) => {

        //e.preventDefault();

        const response = await showConfirm('Tem certeza que deseja sair?');
        if(!response.isConfirmed) {
            return;
        }
        
        try {
            await signOut({
                callbackUrl: "/signIn"
            });
        }
        catch (error) {
            console.log("Erro ao deslogar", error);
        }

    }

    return (
        <>
            <div onClick={handleLogout} className={`flex items-center rounded-md mb-4 w-full py-2 px-1 hover:bg-blue-500 hover:cursor-pointer`}>
                <Logout size={20} color="#d9e3f0" className="ml-1" />
                <span className="ml-2 flex-1 text-white">Sair</span>   
            </div>        
        </>
    )   
}