export function SkeletonManagerDataItem({ number = 1 }: { number: number }) {
    const arr = []
    for (let i = 0; i < number; i++) {
        arr.push(i)
    }
    return (
        <>
            {arr.map(v => (
                <div key={v} className="relative grid rounded-3xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base sm:py-4 sm:px-6 py-3 px-3 hover:shadow-md bg-black2/10 dark:bg-white/5 animate-pulse p-3">
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full">
                        <div className="grid space-y-1 flex-none">
                            {/* Main Image */}
                            <div className="bg-black2/10 dark:bg-white/5 animate-pulse rounded-3xl w-[100px] h-[100px] flex-none"></div>
                        </div>

                        {/* Description */}
                        <div className="relative grid pr-6 pt-2 text-transparent w-full">
                            <div className="grid ml-2 mr-6">
                                <p className="bg-black2/10 dark:bg-white/5 animate-pulse line-clamp-1 mb-1 w-full"></p>
                                <p className="bg-black2/10 dark:bg-white/5 animate-pulse line-clamp-3 mb-1 w-full sm:line-clamp-2 opacity-50 sm:text-base text-sm">
                                    -
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}