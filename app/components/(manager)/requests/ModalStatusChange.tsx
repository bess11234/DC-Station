import { useRouter } from "next/navigation";
import { Request } from "@/app/lib/definition";
import { changeRequestStatus } from "@/app/lib/action";
import { LayoutModal } from "./LayoutModal";

export function ModalStatusChange({ onClose, request, newStatus }: { onClose: () => void; request: Request; newStatus: string }) {
    const router = useRouter();

    const handleConfirm = async () => {
        await changeRequestStatus(request._id, newStatus); // Call API
        onClose(); // Close modal and update parent state
        router.push(`/dashboard/requests/detail/${request.animal}`); // Redirect
    };

    return (
        <LayoutModal onClose={onClose}>
            <div className="relative bg-white p-6 md:w-lg sm:w-md w-64 rounded-2xl dark:bg-neutral-950 z-[1001]">
                <h3 className="text-lg font-semibold text-theme-700 dark:text-theme-400">
                    {newStatus === "Rejected" ? "ยืนยันการปฏิเสธคำขอ" : "ยืนยันการยอมรับคำขอนี้"}
                </h3>
                <hr />
                <div className="py-4">
                    <p>
                        {newStatus === "Rejected" ? "แน่ใจหรือไม่ที่จะปฏิเสธคุณ" : "แน่ใจหรือไม่ที่จะยอมรับคุณ"}
                        <span className="font-semibold"> {request.requester.firstname} {request.requester.lastname}</span>
                    </p>
                    <p className="text-base text-red-500">*เมื่อยืนยันแล้วจะไม่สามารถแก้ไขได้</p>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        className="cursor-pointer text-lg py-1 px-3 button-theme-primary rounded-xl"
                        onClick={handleConfirm}
                    >
                        ยืนยัน
                    </button>
                    <button
                        className="cursor-pointer text-lg py-1 px-3 rounded-xl"
                        onClick={onClose} // Fixed typo from onclose to onClose
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </LayoutModal>
    );
}