import { useEffect, useRef } from "react";

export function SuccessModal({ onClose, name }: { onClose: () => void; name:string }) {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal(); // Open modal when component mounts
        }
    }, []);

    return (
        <dialog ref={modalRef} className="modal" onClose={onClose}>
            <div className="modal-box">
                <h3 className="text-lg font-semibold text-theme-700">🎉บันทึกคำขอสำเร็จ!</h3>
                <hr />
                <p className="py-4">ขอบคุณที่รับเลี้ยงหนู! น้อง{name}หวังว่าจะได้เป็นครอบครัวเดียวกับคุณ!</p>
                <div className="flex justify-end">
                     <button className="text-lg btn button-theme-primary " onClick={() => modalRef.current?.close()}>
                    ปิด
                </button>
                </div>
               
            </div>
        </dialog>

            // <div popover="auto" id={`deleteItem_${index}`} className="p-0! bg-transparent w-screen h-screen opacity-0 transition-all duration-500 transition-discrete open:opacity-100 starting:open:opacity-0">
            // <div className="relative grid size-full justify-center items-center">
            //     <div onClick={() => document.getElementById(`deleteItem_${index}`)?.hidePopover()} className="absolute bg-black2/10 dark:bg-black2/50 w-screen h-screen"></div>
            //     <div className="relative z-10 bg-white dark:bg-neutral-950 border border-white/10 rounded-xl">
            //         <div className="px-8 py-6">
            //             {/* Content */}
            //             <p>ต้องการลบข้อมูล <span className="text-theme-400">{name}</span> ?</p>
            //             <hr className="my-3" />
            //             <div className="flex justify-end space-x-3">
            //                 <button type="button" onClick={() => { document.getElementById(`deleteItem_${index}`)?.hidePopover(); handleDelete(id) }} className="button-theme rounded-xl py-1 px-3 cursor-pointer">ยืนยัน</button>
            //                 <button type="button" onClick={() => document.getElementById(`deleteItem_${index}`)?.hidePopover()} className="cursor-pointer">ยกเลิก</button>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            // </div>
    );
}
