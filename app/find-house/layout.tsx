import Navbar from "../components/Navbar";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <footer className="p-3 row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <p className="font-medium">
                    <span className="font-light">Created by <HeartIcon className="inline-block size-6 text-pink-300 dark:text-pink-200" /> </span>
                    @<span className="github-user">bess11234</span>, @<span className="github-user">KKMAI</span>.</p>
            </footer>
        </>
    )
}