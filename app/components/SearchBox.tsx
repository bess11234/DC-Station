// const ไหมจอง !!!!important
'use client';

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { usePathname, useSearchParams} from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


export function SearchAnimals() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    const [title, setTitle] = useState("");

    useEffect(() => {
        router.replace(pathName, { scroll: false });
    }, []);

    const searchName = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (term) {
            params.set("title", term);
        } else {
            params.delete("title");
        }
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }, 300)
    return (
        <>
            <div className="w-full flex justify-center ">
                <div className="flex items-center w-120 rounded-full border-1 overflow-hidden">
                    <input value={title}
                    className="bg-transparent focus:outline-none w-110 h-full px-5 border-0" 
                    type="text" 
                    placeholder="ค้นหาหัวข้อที่คุณต้องการ"
                    onChange={(e) => {
                        setTitle(e.target.value);
                        searchName(e.target.value);
                    }}/>

                    <div role="button"
                    className="flex items-center justify-center cursor-pointer w-10 h-10 bg-black2/10 hover:bg-black2/15 dark:bg-white/10 dark:hover:bg-white/5"
                    onClick={()=>{setTitle(""); searchName("")}}>
                        { title? <XMarkIcon className="size-5"/> :<MagnifyingGlassIcon className="size-5"/>}
                    </div>
                </div>
            </div>
        </>
    )
}