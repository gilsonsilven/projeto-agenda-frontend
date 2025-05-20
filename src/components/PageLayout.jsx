
import SideMenu from "./SideMenu.jsx"


export default function PageLayout({children}) {

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