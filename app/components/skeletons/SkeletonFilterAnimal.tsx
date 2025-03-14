export function SkeletonFilterAnimal() {
    return (
        <div className="flex flex-col sm:p-6 p-3 py-6 card-theme rounded-lg gap-3 sm:w-[500px] w-[300px] shadow-lg fonsemibold bg-black2/10 dark:bg-white/5 animate-pulse">
            {/* Filter Specie */}
            <div className="flex flex-row place-items-center justify-center text-transparent">
                <button className="bg-black2/10 dark:bg-white/5 animate-pulse sm:w-fit rounded-l-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:shadow dark:shadow-white/15">🐶 <span className="max-sm:hidden">น้อง</span>หมา</button>
                <button className="bg-black2/10 dark:bg-white/5 animate-pulse sm:w-fit rounded-r-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:shadow dark:shadow-white/15">🐱 <span className="max-sm:hidden">น้อง</span>แมว</button>
            </div>

            {/* Filter Gender */}
            <div className="grid w-full text-center text-transparent bg-black2/10 dark:bg-white/5 rounded-xl">
                <p className="sm:text-xl">เพศ</p>
                <div className="flex justify-center">
                    <button className="sm:w-fit rounded-l-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:shadow dark:shadow-white/15">♂ <span className="max-sm:hidden">ชาย</span><span className="sm:hidden">ช.</span></button>
                    <button className="sm:w-fit rounded-r-lg sm:px-6 sm:py-3 px-3 py-1.5 cursor-pointer sm:text-2xl text-xl transition hover:shadow dark:shadow-white/15">♀ <span className="max-sm:hidden">หญิง</span><span className="sm:hidden">ญ.</span></button>
                </div>
            </div>

            {/* Filter Age */}
            <div className="grid w-full text-center text-transparent bg-black2/10 dark:bg-white/5 animate-pulse">
                <p className="sm:text-xl"><span className="">เริ่มช่วงอายุ (ปี)</span></p>
                <input type="text" className="w-full" />
                <div className="flex justify-between px-2.5 mt-2 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                <div className="flex justify-between px-1.5 mt-2 text-xs">
                    <span>-</span>
                    <span>{"<1"}</span>
                    <span>1-5</span>
                    <span>5-10</span>
                    <span>10+</span>
                </div>
            </div>

        </div>
    )
}