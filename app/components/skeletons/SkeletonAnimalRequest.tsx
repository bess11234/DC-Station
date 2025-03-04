export function SkeletonAnimalRequest({ number = 1 }: { number: number }) {
    const arr = []
    for (let i = 0; i < number; i++) {
        arr.push(i)
    }
    return (
        <>
            {arr.map(v => (
                <div key={v} className="rounded-3xl bg-black2/10 dark:bg-white/5 animate-pulse p-3 text-transparent">
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full mb-5">
                        <div className="relative flex flex-col pr-6 pt-2">
                            <div className="ml-2 mr-6">
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>-</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>-</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>-</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>-</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>-</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>-</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p>-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}