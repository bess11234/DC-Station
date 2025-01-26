import Link from "next/link";
import Image from "next/image";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export const metadata = {
    icons: {
        icon: '/favicon.ico',
    },
};

// Narbar Component
function Navbar() {
    return (
        <>
            <div className="sticky top-0 z-40 w-full backdrop-blur-2xl h-fit">
                <div className="max-w-8xl mx-auto border-b not-dark:border-black2/20 border-white/20">
                    <div className="py-4 lg:px-8 lg:mx-0 mx-4">
                        <div className="relative grid xs:grid-cols-3 grid-cols-2 place-items-center max-xs:col-span-2">
                            {/* Left side */}
                            <Link
                                className="max-sm:justify-self-start mr-3 flex-none overflow-hidden md:w-auto text-nowrap"
                                href="/"
                            >
                                <div className="relative flex items-center space-x-2">
                                    <Image
                                        alt="Logo of Dogs and Cats"
                                        // Importing an image will
                                        // automatically set the width and height
                                        src="/favicon.ico"
                                        // Make the image display full width
                                        style={{ width: "40px", height: "40px"}}
                                        width={40}
                                        height={40}
                                    />
                                    <p className="font-semibold text-xl">DC Station</p>
                                </div>
                            </Link>

                            {/* Right side */}
                            <div className="flex flex-row max-sm:justify-self-end xs:col-span-2">
                                <div className="hidden xs:flex sm:space-x-5 space-x-3">
                                    <Link href="#" className="link-color duration-300">
                                        <span>หาบ้านให้น้อง</span>
                                    </Link>
                                    <Link href="#" className="link-color duration-300">
                                        <span>เกร็ดความรู้</span>
                                    </Link>
                                    <Link href="#" className="link-color duration-300">
                                        <span>การติดต่อ</span>
                                    </Link>
                                </div>

                                <div className="xs:hidden flex">
                                    {/* Button for Display Navbar */}
                                    <button type="button" popoverTarget="popoverNavbar">
                                        <EllipsisVerticalIcon className="size-6" />
                                    </button>

                                    {/* Display Navbar */}
                                    <div className="fixed z-50 transition-all duration-300 transition-discrete open:opacity-100 starting:open:opacity-0 opacity-0 open:top-[4.5rem] starting:open:top-[4.1rem] top-[4.1rem]"
                                        popover="auto" id="popoverNavbar" aria-label="Navbar popover" aria-description="Show the navbar items.">
                                        <div className="w-[100vw] overflow-y-hidden bg-neutral-100 dark:bg-neutral-950 dark:text-white shadow-inner border-t">
                                            <div className="py-4 lg:px-8 lg:mx-0 mx-4">
                                                <div className="flex flex-col space-y-3">
                                                    <Link href="#" className="link-color">
                                                        <span>หาบ้านให้น้อง</span>
                                                    </Link>
                                                    <Link href="#" className="link-color">
                                                        <span>เกร็ดความรู้</span>
                                                    </Link>
                                                    <Link href="#" className="link-color">
                                                        <span>การติดต่อ</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Navbar;
