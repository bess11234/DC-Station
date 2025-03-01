import { useEffect, useRef } from "react";
import { Request } from "@/app/lib/definition"

export function ModalDetail({ onClose, request }: { onClose: () => void; request:Request }) {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal(); // Open modal when component mounts
        }
    }, []);

    const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        if (event.target === modalRef.current) {
            onClose(); // Close modal when clicking outside
        }
    };

    // modal-box
    return (
        <dialog ref={modalRef} className="modal" onClose={onClose} onClick={handleClickOutside}>
            <div className="flex justify-center">
                <div className="bg-white p-6 w-3xl rounded-2xl">
                    <h3 className="text-lg font-semibold text-theme-700">รายละเอียดคำร้องขอ</h3>
                    <hr />
                    <div className="py-4">
                        <p><span className="font-semibold">ชื่อ-นามสกล:</span> {request.requester.firstname}</p>
                        <p><span className="font-semibold">อีเมล:</span> {request.requester.lastname}</p>
                        <p><span className="font-semibold">ชื่อ/ลิงค์เฟซบุ๊ค:</span> {request.requester.fb}</p>
                        <p><span className="font-semibold">เบอร์โทร:</span> {request.requester.phone}</p>
                        <p><span className="font-semibold">ประสบการณ์:</span> {request.requester.experience}</p>
                        <p><span className="font-semibold">เหตุผล:</span> {request.requester.reason}</p>
                    </div>
                    <div className="flex justify-end">
                        <button className="cursor-pointer text-xl py-3 px-6 btn button-theme-primary rounded-2xl" onClick={() => modalRef.current?.close()}>
                        ปิด
                    </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
