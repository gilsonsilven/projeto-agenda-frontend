
import HomepageImage from "@/components/HomepageImage.jsx"
import Link from "next/link";


export default function SignIn() {
    return (
        <div className="flex bg-white h-screen w-screen">
            <div className="w-1/2">
                <div className="flex flex-col justify-center items-center h-full">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Acesse sua conta</h1>
                    </div>
                    <div>
                        <input id="email" type="email" placeholder="Email" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <input id="pass" type="password" placeholder="Senha" className="border w-[300px] placeholder:text-black placeholder:opacity-60 border-[#d1d5db] rounded pl-3 py-2 border-opacity-30 hover:border-gray-700 my-2.5"></input>
                    </div>
                    <div>
                        <button className="font-semibold mt-4 mb-2 w-[300px] h-[36px] rounded bg-blue-500 text-white hover:cursor-pointer">Entrar</button>
                    </div>
                    <div className="mb-70">
                        <p>Não possui uma conta? <Link href={"/signUp"} className="text-blue-500 font-semibold">Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <HomepageImage />
            </div>
        </div>
    );
    
};