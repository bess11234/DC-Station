import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className="grid justify-items-center min-h-[88vh] overflow-x-hidden">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    )
}