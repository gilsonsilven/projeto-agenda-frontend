'use client'

import HomepageImage from "@/components/HomepageImage.jsx";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/pt-br';


export default function SignUp() {
    return (
        <div className="flex bg-white h-screen w-screen">
            <div className="w-1/2">
                <div className="flex flex-col justify-center items-center h-full">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Crie sua conta</h1>
                    </div>
                    <div>
                        <input id="name" type="text" placeholder="Nome" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <input id="email" type="email" placeholder="Email" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <input id="pass" type="password" placeholder="Senha" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <input id="confPass" type="password" placeholder="Confirmar Senha" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div className="my-2.5">
                        <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>                         
                            <DatePicker className="w-[300px]" label="Data de nascimento" name="StartDate" slotProps={{ 
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
                        <input id="phone" type="text" placeholder="Telefone" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <input id="address" type="text" placeholder="Endereço" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <button className="font-semibold mt-4 mb-2 w-[300px] h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Cadastrar</button>
                    </div>
                    <div className="mb-10">
                        <p>Já possui uma conta? Fazer Login</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <HomepageImage />
            </div>
        </div>
    );
};

