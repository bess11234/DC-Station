import { useEffect, useRef } from "react"

export function LayoutModal({onClose, children} : {onClose: () => void, children:React.ReactNode}) {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal(); // Open modal when component mounts
        }
    }, []);

    // close when click outside
    const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        if (event.target === modalRef.current) {
            onClose(); // Close modal when clicking outside
        }
    };
    return (
        <dialog ref={modalRef} className="bg-transparent w-screen h-screen opacity-0 transition-all duration-500 open:opacity-100 starting:open:opacity-0" onClose={onClose} onClick={handleClickOutside}>
            <div className="relative m-auto size-full flex justify-center items-center md:w-3xl sm:w-xl w-md">
                <div className="bg-white p-6 w-3xl rounded-2xl dark:bg-neutral-950">
                    {children}
                </div>
            </div>
        </dialog>
    )
}