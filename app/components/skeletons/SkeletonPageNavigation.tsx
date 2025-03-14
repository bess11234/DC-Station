export function SkeletonPageNavigation() {
    return (
        <div className="flex justify-end w-full max-w-[1500px] mx-auto mt-3 space-x-3 items-center select-none text-transparent">
            <div className="flex flex-row rounded-xl bg-black2/10 dark:bg-white/5 animate-pulse space-x-3">
                <p className="size-8 p-1">-</p>
                <p className="size-8 p-1">-</p>
                <p className="size-8 p-1">-</p>
                <p className="size-8 p-1">-</p>
                <p className="size-8 p-1">-</p>
            </div>
        </div>
    )
}