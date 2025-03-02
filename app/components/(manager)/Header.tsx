import Link from "next/link"
import Image from "next/image"

import { signOut } from "@/auth"
import { HeaderLink } from "./HeaderLink"

export default function Sidebar() {
    async function handleSignOut() {
        "use server"
        await signOut({ redirectTo: "/" })
    }
    return (
        <div className="sticky z-40 top-0 sm:h-screen flex sm:flex-col flex-row place-content-between sm:justify-items-center sm:py-10 sm:px-6 py-4 px-4 sm:border-r max-sm:border-b not-dark:border-black2/20 border-white/20 bg-white/80 dark:bg-black2/80 backdrop-blur-sm">
            {/* Sidebar */}
            <HeaderLink signOut={handleSignOut} />

            {/* Navbar */}
            <div className="block sm:hidden space-y-5 align-center">
                <Link
                    href="/dashboard"
                >
                    <div className="relative flex items-center space-x-2">
                        <Image
                            alt="Logo of Dogs and Cats"
                            src="/favicon.ico"
                            style={{ width: "40px", height: "40px" }}
                            width={40}
                            height={40}
                        />
                        <p className="font-semibold text-xl">DC <span className="max-xs:text-base">Station</span></p>
                    </div>
                </Link>
            </div>

            <div className="sm:hidden flex place-self-end self-center">
                <HeaderLink mobile={true} signOut={handleSignOut} />
            </div>
        </div >
    )
}