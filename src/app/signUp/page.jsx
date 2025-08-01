'use client'

import HomePageImage from "@/components/HomePageImage.jsx";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/pt-br';
import Link from "next/link";
import { useState } from "react";
import { createUser } from "@/app/api/user.js";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "../utils/alerts.js";
import { Eye, EyeSlash } from "iconsax-react";

export default function SignUp() {

    const router = useRouter();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        birth_date: null,
        phone: '',
        address: ''
    });
    const [confPass, setConfPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value});
    };

    const handleConfPassChange = (e) => {

        
        setConfPass(e.target.value);
    }

    const handleDateChange = (date) => {
        setUserData({...userData, birth_date: date});
        
    };  

    const handleSubmit = async (e) => {

        e.preventDefault(); 

        if(userData.password !== confPass) {
            showError("",{Erro: ["Senhas não correspondem"]})
            return;
        }
        
        const response = await createUser(userData);

        console.log(response)
        
        if(response?.errors) {
            showError(response.message, response.errors);
            return;
        }

        showSuccess(response.message);

        const timer = setTimeout(() => {
            router.push("/signIn");
        }, 2000)
        

    }

    return (
        <div className="flex bg-white h-screen w-screen">
            <div className="w-1/2">
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-full">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Crie sua conta</h1>
                    </div>
                    <div>
                        <input id="name" type="text" value={userData.name} onChange={handleChange} placeholder="Nome" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <input id="email" type="email" value={userData.email} onChange={handleChange} placeholder="Email" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div className="relative w-[300px]">
                        <input id="password" type={showPassword ? "text" : "password"} value={userData.password} onChange={handleChange} placeholder="Senha" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none hover:cursor-pointer">
                            {showPassword ? <EyeSlash size={20} color="#999999" /> : <Eye size={20} color="#999999"/>}
                        </button>
                    </div>
                    <div className="relative w-[300px]">
                        <input id="confPass" type={showConfPassword ? "text" : "password"} value={confPass} onChange={handleConfPassChange} placeholder="Confirmar Senha" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                        <button type="button" onClick={() => setShowConfPassword(!showConfPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none hover:cursor-pointer">
                            {showConfPassword ? <EyeSlash size={20} color="#999999" /> : <Eye size={20} color="#999999"/>}
                        </button>                    
                    </div>
                    <div className="my-2.5">
                        <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>                         
                            <DatePicker className="w-[300px]" id="birth_date" value={userData.birth_date} onChange={handleDateChange} label="Data de nascimento" name="StartDate" slotProps={{ 
                                textField: 
                                {
                                    size: 'small',
                                    InputProps: {
                                        style: { borderColor: '#d1d5db' }
                                    }
                                }
                            }}/>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <input id="phone" type="text" value={userData.phone} onChange={handleChange} placeholder="Telefone" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <input id="address" type="text" value={userData.address} onChange={handleChange} placeholder="Endereço" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <button type="submit" className="font-semibold mt-4 mb-2 w-[300px] h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Cadastrar</button>
                    </div>
                    <div className="mb-10">
                        <p>Já possui uma conta? <Link href={"/signIn"} className="text-blue-500 font-semibold">Fazer Login</Link></p>
                    </div>
                </form>
            </div>
            <div className="w-1/2">
                <HomePageImage />
            </div>
        </div>
    );
};

