export function SkeletonAnimalInput() {
    return (
        <>
            <div className="w-full sm:h-[500px] h-[300px] rounded-xl grow shadow bg-black2/10 dark:bg-white/5 animate-pulse">
            </div>
            <div>
                <div className="grid sm:grid-cols-2 grid-cols-1 py-0! *:text-nowrap sm:space-x-3 items-center">
                    {/* ชื่อ */}
                    <div className="grid">
                        <label className="bg-black2/10 dark:bg-white/5 animate-pulse w-fit rounded-xl px-8 text-2xl my-2 py-1 text-transparent">a</label>
                        <input className="bg-black2/10 dark:bg-white/5 animate-pulse w-full rounded-xl px-8 text-2xl my-2 py-2 border-0" />
                    </div>

                    {/* วันเกิด */}
                    <div className="grid">
                        <label className="bg-black2/10 dark:bg-white/5 animate-pulse w-fit rounded-xl px-8 text-2xl my-2 py-1 text-transparent">a</label>
                        <input className="bg-black2/10 dark:bg-white/5 animate-pulse w-full rounded-xl px-8 text-2xl my-2 py-2 border-0" />
                    </div>
                </div>

                <div className="grid sm:grid-cols-4 grid-cols-1 py-0! *:text-nowrap sm:space-x-3 items-center">
                    {/* สายพันธ์ุ */}
                    <div className="grid col-span-3">
                        <label className="bg-black2/10 dark:bg-white/5 animate-pulse w-fit rounded-xl px-8 text-2xl my-2 py-1 text-transparent">a</label>
                        <input className="bg-black2/10 dark:bg-white/5 animate-pulse w-full rounded-xl px-8 text-2xl my-2 py-2 border-0" />
                    </div>

                    {/* เพศ */}
                    <div className="grid">
                        <label className="bg-black2/10 dark:bg-white/5 animate-pulse w-fit rounded-xl px-8 text-2xl my-2 py-1 text-transparent">a</label>
                        <input className="bg-black2/10 dark:bg-white/5 animate-pulse w-full rounded-xl px-8 text-2xl my-2 py-2 border-0" />
                    </div>
                </div>
            </div>
        </>
    )
}