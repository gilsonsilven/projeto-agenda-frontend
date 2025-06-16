'use client'


import PageLayout from "@/components/PageLayout.jsx"
import HomePageScheduler from "@/components/HomePageScheduler.jsx"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Events() {

    const {status} = useSession();
    const router = useRouter();

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



    return (

        <PageLayout>
           <HomePageScheduler />
        </PageLayout>

    )
}