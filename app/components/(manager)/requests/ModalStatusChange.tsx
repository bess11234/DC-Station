import { useEffect, useRef } from "react";
import { Request } from "@/app/lib/definition"
import { changeRequestStatus } from "@/app/lib/action"
import { useRouter } from "next/navigation";

export function ModalStatusChange({ onClose, request, newStatus }: { onClose: () => void; request:Request; newStatus:string }) {
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
        await changeRequestStatus(request._id, newStatus); // Call API
        modalRef.current?.close(); // Close modal
        onClose(); // Ensure parent state updates
        router.push(`/dashboard/requests/detail/${request.animal}`);
    };

    // modal-box
    return (
        <dialog ref={modalRef} className="bg-transparent w-screen h-screen opacity-0 transition-all duration-500 open:opacity-100 starting:open:opacity-0" onClose={onClose} onClick={handleClickOutside}>
            <div className="relative m-auto size-full flex justify-center items-center md:w-xl sm:w-xl w-md">
                <div className="bg-white p-6 w-3xl rounded-2xl dark:bg-neutral-950">
                    {newStatus === "Rejected"?
                    <h3 className="text-lg font-semibold text-theme-700 dark:text-theme-400">ยืนยันการปฏิเสธคำขอ</h3> :
                    <h3 className="text-lg font-semibold text-theme-700 dark:text-theme-400">ยืนยันการยอมรับคำขอนี้</h3>}
                    <hr />
                    <div className="py-4">
                        <p>{newStatus === "Rejected"?
                            "แน่ใจหรือไม่ที่จะปฏิเสธคุณ":
                            "แน่ใจหรือไม่ที่จะยอมรับคุณ"} <span className="font-semibold">{request.requester.firstname} {request.requester.lastname}</span></p>
                        <p className="text-base text-red-500">*เมื่อยืนยันแล้วจะไม่สามารถแก้ไขได้</p>
                    </div>
                    <div className="flex justify-end gap-2 ">
                        <button className="cursor-pointer text-lg py-1 px-3 button-theme-primary rounded-xl " onClick={handleConfirm}>
                            ยืนยัน
                        </button>
                        <button className="cursor-pointer text-lg py-1 px-3 rounded-xl " onClick={() => modalRef.current?.close()}>
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
