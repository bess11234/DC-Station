
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Layout({
    children,
    breadcrumbs
}: Readonly<{
    children: React.ReactNode;
    breadcrumbs: React.ReactNode;

}>) {

    return (
        <>
            <Navbar />
            {breadcrumbs}
            <div className="grid justify-items-center min-h-[88vh] overflow-x-hidden pb-3">
                <main className="flex flex-col gap-8 items-center sm:items-start">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    )
}