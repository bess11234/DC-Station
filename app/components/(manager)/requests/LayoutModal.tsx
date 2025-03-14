import { useEffect, useRef } from "react";

export function LayoutModal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Focus the modal when it mounts for accessibility
        modalRef.current?.focus();
    }, []);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === modalRef.current) {
            onClose(); // Close modal when clicking outside the content
        }
    };

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 w-screen h-screen bg-transparent flex justify-center items-center opacity-0 transition-all duration-500 data-[open=true]:opacity-100 z-[1000]"
            data-open="true" // Simulates the "open" state
            onClick={handleClickOutside}
        >
            {children}
        </div>
    );
}