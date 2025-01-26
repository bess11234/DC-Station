import { HomeIcon, HeartIcon, PlusCircleIcon, GiftIcon } from "@heroicons/react/24/outline"

export function Stat() {
    return (
        <div className="stats stats-vertical md:stats-horizontal shadow-md dark:bg-white/5 ">
            <div className="stat">
                <div className="stat-figure text-theme-200 dark:text-theme-300">
                    <HomeIcon className="size-8" />
                </div>
                <div className="stat-title">หาบ้านให้น้อง</div>
                <div className="stat-value">31K</div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>

            <div className="stat">
                <div className="stat-figure text-theme-200 dark:text-theme-300">
                    <HeartIcon className="size-8" />
                </div>
                <div className="stat-title">ทำหมั่น</div>
                <div className="stat-value">10K</div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>

            <div className="stat">
                <div className="stat-figure text-theme-200 dark:text-theme-300">
                    <PlusCircleIcon className="size-8" />
                </div>
                <div className="stat-title">รักษา</div>
                <div className="stat-value">1.5K</div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>

            <div className="stat">
                <div className="stat-figure text-theme-200 dark:text-theme-300">
                    <GiftIcon className="size-8" />
                </div>
                <div className="stat-title">เคสทั้งหมด</div>
                <div className="stat-value">50K</div>
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>
        </div>
    )
}