"use client"

import { deleteAnimal } from "@/app/lib/action"

interface Prop { id: string, name: string, index: number }

export function DeleteAnimal({ id, name, index }: Prop) {
    return (
        <>
            {/* Display Delete */}
            <div popover="auto" id={`deleteAnimal_${index}`} className="p-0! bg-transparent w-screen h-screen opacity-0 transition-all duration-500 transition-discrete open:opacity-100 starting:open:opacity-0">
                <div className="relative grid size-full justify-center items-center">
                    <div onClick={() => document.getElementById(`deleteAnimal_${index}`)?.hidePopover()} className="absolute bg-black2/10 dark:bg-black2/50 w-screen h-screen"></div>
                    <div className="relative z-10 bg-white dark:bg-neutral-950 border border-white/10 rounded-xl">
                        <div className="p-3">
                            <p>ต้องการลบข้อมูล <span className="text-theme-400">{name}</span> ?</p>
                            <hr className="my-3" />
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={() => { document.getElementById(`deleteAnimal_${index}`)?.hidePopover(); deleteAnimal(id) }} className="button-theme rounded-xl py-1 px-3 cursor-pointer">ยืนยัน</button>
                                <button type="button" onClick={() => document.getElementById(`deleteAnimal_${index}`)?.hidePopover()} className="cursor-pointer">ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}