import { Suspense, useEffect, useRef } from "react";
import { Request } from "@/app/lib/definition"
import { TableRow } from "./TableRow";

export function ModalDetail({ onClose, request }: { onClose: () => void; request: Request }) {
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
        <dialog ref={modalRef} className="bg-transparent w-screen h-screen opacity-0 transition-all duration-500 open:opacity-100 starting:open:opacity-0" onClose={onClose} onClick={handleClickOutside}>
            <div className="relative m-auto size-full flex justify-center items-center md:w-3xl sm:w-xl w-md">
                <div className="bg-white p-6 w-3xl rounded-2xl dark:bg-neutral-950">
                    <h3 className="text-lg font-semibold text-theme-700 dark:text-theme-400">รายละเอียดคำร้องขอ</h3>
                    <hr />
                    <div className="py-4">
                        <table className="text-left space-x-1 border-separate border-spacing-2">
                            <tbody>
                                <TableRow title="ชื่อ-นามสกุล" value={`${request.requester.firstname} ${request.requester.lastname}`} />
                                <TableRow title="อีเมล" value={request.requester.email} />
                                <TableRow title="ชื่อ/ลิงค์เฟซบุ๊ค" value={request.requester.fb} />
                                <TableRow title="เบอร์โทร" value={request.requester.phone} />
                                <TableRow title="ประสบการณ์" value={request.requester.experience} />
                                <TableRow title="เหตุผล" value={request.requester.reason} />
                                <Suspense fallback={<p>Loading...</p>}>
                                <TableRow title="วันที่ส่งคำร้อง:" value={<time suppressHydrationWarning dateTime={request.createdAt}>{new Date(request.createdAt).toLocaleString()}</time>}/>
                                </Suspense>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end">
                        <button className="cursor-pointer text-xl py-1 px-5 button-theme rounded-xl " onClick={() => modalRef.current?.close()}>
                            ปิด
                        </button>
                    </div>
                </div>
            </div>
            {/* <LayoutModal onClose={onClose}>
            <h3 className="text-lg font-semibold text-theme-700 dark:text-theme-400">รายละเอียดคำร้องขอ</h3>
            <hr />
            <div className="py-4">
                <table className="text-left space-x-1 border-separate border-spacing-2">
                    <tbody>
                        <TableRow title="ชื่อ-นามสกุล" value={`${request.requester.firstname} ${request.requester.lastname}`} />
                        <TableRow title="อีเมล" value={request.requester.email} />
                        <TableRow title="ชื่อ/ลิงค์เฟซบุ๊ค" value={request.requester.fb} />
                        <TableRow title="เบอร์โทร" value={request.requester.phone} />
                        <TableRow title="ประสบการณ์" value={request.requester.experience} />
                        <TableRow title="เหตุผล" value={request.requester.reason} />
                        <Suspense fallback={<p>Loading...</p>}>
                            <TableRow title="วันที่ส่งคำร้อง:" value={<time suppressHydrationWarning dateTime={request.createdAt}>{new Date(request.createdAt).toLocaleString()}</time>} />
                        </Suspense>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <button className="cursor-pointer text-xl py-1 px-5 button-theme rounded-xl " onClick={onClose}>
                    ปิด
                </button>
            </div>
            </LayoutModal> */}
        </dialog>
    );
}
