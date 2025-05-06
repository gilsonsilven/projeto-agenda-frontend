'use client'

import HomepageImage from "@/components/HomepageImage.jsx";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/pt-br';import dayjs from "dayjs";


export default function SignUp() {
    return (
        <div className="flex bg-white h-screen w-screen">
            <div className="w-1/2">
                <div className="flex flex-col justify-center items-center h-full">
                    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>                         
                        <DatePicker className="w-[300px]" label="Data de nascimento" name="StartDate" slotProps={{ 
                            textField: 
                            {
                                size: 'small'
                            }
                        }}/>
                    </LocalizationProvider>
                </div>
            </div>
            <div className="w-1/2">
                <HomepageImage />
            </div>
        </div>
    );
};

