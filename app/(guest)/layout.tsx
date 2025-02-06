import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Breadcrumbs } from "../components/Breadcrumbs";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <div className="grid justify-items-center min-h-[88vh] overflow-x-hidden pb-3">
                <main className="flex flex-col gap-8 items-center sm:items-start">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    )
}