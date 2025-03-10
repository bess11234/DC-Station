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
                {children}
            </div>
        </>
    )
}