"use client"
import { FaTrashAlt } from "react-icons/fa"

interface Prop { 
    id: string;
    name: string;
    index: string;
    handleDelete: (id: string) => void;
}

export function DeleteItem({ id, name, index, handleDelete }: Prop) {
    return (
        <>
            {/* Delete button */}
            <div className="absolute z-10 -right-1 -top-1" aria-label="Delete" role="button" tabIndex={-1}>
                <button popoverTarget={`deleteItem_${index}`} title="Delete" className="rounded-full cursor-pointer">
                    <FaTrashAlt className={`button-secondary hover:opacity-60 active:opacity-80 transition-colors size-5`} />
                </button>
            </div>

            {/* Display Delete */}
            <div popover="auto" id={`deleteItem_${index}`} className="p-0! bg-transparent w-screen h-screen opacity-0 transition-all duration-500 transition-discrete open:opacity-100 starting:open:opacity-0">
                <div className="relative grid size-full justify-center items-center">
                    <div onClick={() => document.getElementById(`deleteItem_${index}`)?.hidePopover()} className="absolute bg-black2/10 dark:bg-black2/50 w-screen h-screen"></div>
                    <div className="relative z-10 bg-white dark:bg-neutral-950 border border-white/10 rounded-xl">
                        <div className="px-8 py-6">
                            {/* Content */}
                            <p>ต้องการลบข้อมูล <span className="text-theme-400">{name}</span> ?</p>
                            <hr className="my-3" />
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={() => { document.getElementById(`deleteItem_${index}`)?.hidePopover(); handleDelete(id) }} className="button-theme rounded-xl py-1 px-3 cursor-pointer">ยืนยัน</button>
                                <button type="button" onClick={() => document.getElementById(`deleteItem_${index}`)?.hidePopover()} className="cursor-pointer">ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}