import Header from "@/app/components/(manager)/Header";

export const dynamic = 'force-dynamic'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex sm:flex-row flex-col min-h-screen">
                {/* Sidebar */}
                <Header />

                {/* Content */}
                <div className="flex flex-col w-full py-8">
                    {children}
                </div>
            </div>
        </>
    )
}