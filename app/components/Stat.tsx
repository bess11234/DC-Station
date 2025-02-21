import { HomeIcon, HeartIcon, PlusCircleIcon, GiftIcon } from "@heroicons/react/24/outline"

export function Stat() {
    return (
        <div className="stats stats-vertical sm:stats-horizontal mt-3">
            <div className="stat">
                <div className="stat-figure">
                    <HomeIcon className="size-8" />
                </div>
                <div className="stat-title">หาบ้านให้น้อง</div>
                <div className="stat-value">31K</div>
            </div>

            <div className="stat">
                <div className="stat-figure">
                    <HeartIcon className="size-8" />
                </div>
                <div className="stat-title">ทำหมัน</div>
                <div className="stat-value">10K</div>
            </div>

            <div className="stat">
                <div className="stat-figure">
                    <PlusCircleIcon className="size-8" />
                </div>
                <div className="stat-title">รักษา</div>
                <div className="stat-value">1.5K</div>
            </div>

            <div className="stat">
                <div className="stat-figure">
                    <GiftIcon className="size-8" />
                </div>
                <div className="stat-title">เคสทั้งหมด</div>
                <div className="stat-value">50K</div>
            </div>
        </div>
    )
}