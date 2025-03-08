export function SkeletonCard({ number = 1 }: { number: number }) {
    const arr = []
    for (let i = 0; i < number; i++) {
        arr.push(i)
    }
    return (
        <>
            {
                arr.map(v => (
                    <div key={v} className="select-none card card-theme rounded-xl md:max-h-[400px] max-h-[350px] max-w-full">
                        <figure className="rounded-t-xl">
                            <div className="bg-black2/10 dark:bg-white/5 animate-pulse h-[300px] w-full"></div>
                        </figure>
                        <div className="relative card-body max-sm:p-6 pb-4 lg:px-8 md:px-4 sm:px-4 max-sm:mt-1 text-transparent">
                            {/* Date */}
                            <p className="bg-black2/10 dark:bg-white/5 animate-pulse">-</p>
                            {/* Title */}
                            <p className="bg-black2/10 dark:bg-white/5 animate-pulse card-title lg:text-3xl text-xl">-</p>
                            {/* Description */}
                            <p className="bg-black2/10 dark:bg-white/5 animate-pulse card-title text-xs">-</p>
                            {/* Button */}
                            <button className="ml-auto mt-4 bg-black2/10 dark:bg-white/5 animate-pulse w-fit lg:px-6 lg:py-3 px-3 py-1.5 rounded-full cursor-pointer max-lg:text-xs">ดูรายละเอียด</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}