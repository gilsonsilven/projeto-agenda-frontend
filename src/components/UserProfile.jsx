'use client'

import { useEffect, useState } from "react";
import { getUser } from "@/api/user.js";
import EditUserModal from "./EditUserModal.jsx";
import {
    Profile
} from "iconsax-react";

export default function UserProfile() { 

    const [userData, setUserData] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);


    useEffect(() => {

        const loadUserData = async () => {
            
            const data = await getUser();
            console.log("User data loaded:", data);
            setUserData(data);

        };

        loadUserData();

    }, [editModalOpen]); // 

    return (
        <>
            <div onClick={() => {setEditModalOpen(true)}} className={`flex items-center rounded-md mb-4 w-full py-2 px-1 hover:bg-blue-500 hover:cursor-pointer`}>
                <Profile size={20} color="#d9e3f0" className="ml-1" />
                <span className="ml-2 flex-1 text-white">{userData.name}</span>
                
            </div>
            <EditUserModal isOpen={editModalOpen} initialUserData={userData} onClose={() => {setEditModalOpen(false)}} />
        </>
    )
}