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
                <h3 className="text-lg font-semibold text-theme-700 dark:text-theme-300">🎉บันทึกคำขอสำเร็จ!</h3>
                <hr />
                <p className="py-4">ขอบคุณที่รับเลี้ยงหนู! น้อง{name}หวังว่าจะได้เป็นครอบครัวเดียวกับคุณ! เราจะติดต่อคุณกลับไปผ่านช่องทางที่คุณได้ให้ไว้</p>
                <div className="flex justify-end">
                     <button className="text-lg btn button-theme-primary " onClick={() => modalRef.current?.close()}>
                    ปิด
                </button>
                </div>
               
            </div>
        </dialog>
    );
}
