'use client'

import HomePageImage from "@/components/HomePageImage.jsx"
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "../api/user.js";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "../utils/alerts.js";
import { Eye, EyeSlash } from "iconsax-react";

export default function SignIn() {

    const router = useRouter();


    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value});
    };


    const handleSubmit = async (e) => {

        e.preventDefault(); 

        
        const result = await loginUser(userData);

        console.log("signIn linha 32",result)

        
        if(result?.error) {
            const parsedResult = JSON.parse(result.error)
        
            showError(parsedResult.message, parsedResult?.errors);
            return;
        }
        else {
            showSuccess(result);

            const timer = setTimeout(() => {
                router.push("/events");
            }, 2000)                          
        }

    }


    return (
        <div className="flex bg-white h-screen w-screen">
            <div className="w-1/2">
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-full">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Acesse sua conta</h1>
                    </div>
                    <div>
                        <input id="email" value={userData.email} onChange={handleChange} placeholder="Email" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div className="relative w-[300px]">
                        <input id="password" type={showPassword ? "text" : "password"} value={userData.password} onChange={handleChange} placeholder="Senha" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none hover:cursor-pointer">
                            {showPassword ? <EyeSlash size={20} color="#999999" /> : <Eye size={20} color="#999999"/>}
                        </button>
                    </div>
                    <div>
                        <button type="submit" className="font-semibold mt-4 mb-2 w-[300px] h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Entrar</button>
                    </div>
                    <div className="mb-70">
                        <p>Não possui uma conta? <Link href={"/signUp"} className="text-blue-500 font-semibold">Cadastre-se</Link></p>
                    </div>
                </form>
            </div>
            <div className="w-1/2">
                <HomePageImage />
            </div>
        </div>
    );
    
};