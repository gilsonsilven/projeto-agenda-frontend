'use client'

import SideMenu from "./SideMenu.jsx"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";

export default function PageLayout({children}) {

    const {status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            const timer = setTimeout(() => {
                router.push("/signIn");
            }, 4000)
        }        
    }, [status])


    if (status === "loading") {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <p className="mb-4 text-xl font-semibold">Carregando...</p>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        )
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Você precisa estar logado para acessar esta página. Redirecionando...</p>
            </div>
        )
    }        


    return (

        <div className="h-screen w-auto grid grid-cols-7">
            <div>
                <SideMenu />
            </div>
            <div className="bg-[#f5f5f5] col-span-6">
                {children}
            </div>
            
        </div>
    )
}