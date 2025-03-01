import { useEffect, useRef } from "react";
import { Request } from "@/app/lib/definition"
import { changeRequestStatus } from "@/app/lib/action"
import { useRouter } from "next/navigation";

export function ModalAccepted({ onClose, request }: { onClose: () => void; request:Request }) {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const router = useRouter();

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

    const handleConfirm = async () => {
        await changeRequestStatus(request._id, "Accepted", request.animal); // Call API
        modalRef.current?.close(); // Close modal
        onClose(); // Ensure parent state updates
        router.push(`/dashboard/requests/detail/${request.animal}`);
    };

    // modal-box
    return (
        <dialog ref={modalRef} className="modal" onClose={onClose} onClick={handleClickOutside}>
            <div className="flex justify-center">
                <div className="bg-white p-6 w-3xl rounded-2xl">
                    <h3 className="text-lg font-semibold text-theme-700">ยืนยันการยอมรับคำขอนี้</h3>
                    <hr />
                    <div className="py-4">
                        <p><span className="">แน่ใจหรือไม่ที่จะยอมรับคุณ</span> {request.requester.idCard}</p>
                        <p className=" text-red-500">*เมื่อยืนยันแล้วจะไม่สามารถแก้ไขได้</p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button className="cursor-pointer text-lg px-5 py-2rounded-2xl" onClick={() => modalRef.current?.close()}>
                            ยกเลิก
                        </button>
                        <button className="cursor-pointer text-lg px-5 py-2 button-theme-primary rounded-2xl" onClick={handleConfirm}>
                            ยืนยัน
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
