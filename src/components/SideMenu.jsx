
import Link from "next/link";
import {
    Profile,
    House2,
    Calendar,
    People,
    Logout
} from "iconsax-react";


const MenuLink = ({ Icon, href, text }) => {

    return (
        <Link href={href} className={`flex items-center rounded-md mb-4 w-full py-2 px-1 hover:bg-blue-500`}>
            <Icon size={20} color="#d9e3f0" className="ml-1" />
            <span className="ml-2 flex-1 text-white">{text}</span>
        </Link>
    )
}

export default function SideMenu() {

 

    return (
        <div className="p-4 bg-[#0c1222] h-full w-auto">
        
            <nav className="flex flex-col h-full">
                <div className="">
                    <MenuLink Icon={Profile} href={"/about_blank"} text={"perfil usuário"}/>
                    <MenuLink Icon={House2} href={"/homepage"} text={"homepage usuário"}/>
                    <MenuLink Icon={Calendar} href={"/about_blank"} text={"Eventos"}/>
                    <MenuLink Icon={People} href={"/about_blank"} text={"Contatos"}/>
                </div>
                <div className="mt-auto">
                    <MenuLink Icon={Logout} href={"/about_blank"} text={"Sair"}/>
                </div>
                    
            </nav>
    
        </div>
    )
}