'use client'
import { Animal } from "@/app/lib/definition"

import { FaPaw, FaVenusMars, FaClock, FaHistory, FaCheckCircle, FaHeartbeat, FaHandHoldingHeart, FaClinicMedical, FaEye } from "react-icons/fa";

import { displayIllness } from "@/app/lib/utils";

export function ShowData({ animal }: { animal: Animal }) {
    const now = new Date(Date.now())
    const animal_dob = new Date(animal.dob)
    const animal_age = new Date(now.getTime() - animal_dob.getTime())

    return (
        <div className="xs:px-10 xs:py-8 px-8 py-6 rounded-xl bg-theme-200/50 dark:bg-theme-950 p-4 mt-4 shadow-md text-lg space-y-4">
            {/* Breed & Gender */}
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-3 *:hover:shadow-sm dark:*:hover:shadow-white/5">
                <div className="card-theme p-4 rounded-lg shadow-md dark:text-white!">
                    <div className="flex flex-col items-center gap-y-1">
                        <FaPaw className="size-5 text-theme-400 dark:text-theme-300" />
                        <p className="font-semibold">พันธุ์</p>
                        <p className="w-full text-center truncate">{animal.breed}</p>
                    </div>
                </div>

                {/* Gender */}
                <div className="card-theme p-4 rounded-lg shadow-md dark:text-white!">
                    <div className="flex flex-col items-center gap-y-1">
                        <FaVenusMars className={`size-5 ${animal.gender == "M" ? "text-sky-400" : "text-pink-400"}`} />
                        <p className="font-semibold">เพศ</p>
                        <p className="w-full text-center truncate">{animal.gender == "M" ? "ผู้ชาย" : "ผู้หญิง"}</p>
                    </div>
                </div>

                {/* Age */}
                <div className="max-sm:col-span-2 card-theme p-4 rounded-lg shadow-md dark:text-white!">
                    <div className="flex flex-col sm:items-center gap-y-1">
                        <FaClock className="size-5 text-theme-400 dark:text-theme-300" />
                        <p className="font-semibold">อายุ</p>
                        <p className="w-full sm:text-center truncate">{`${animal_age.getFullYear() - 1970} ปี ${animal_age.getMonth()} เดือน`}</p>
                    </div>
                </div>
            </div>

            {/* Personality */}
            <div className="card-theme p-4 rounded-lg shadow-md dark:text-white! hover:shadow-sm dark:hover:shadow-white/5">
                <div className="flex flex-col gap-y-1">
                    <FaCheckCircle className="size-5 text-theme-400 dark:text-theme-300" />
                    <p className="font-semibold">อุปนิสัย</p>
                    <p>{animal.personalities.join(", ")}</p>
                </div>
            </div>

            {/* History */}
            <div className="card-theme p-4 rounded-lg shadow-md dark:text-white! hover:shadow-sm dark:hover:shadow-white/5">
                <div className="flex flex-col gap-y-1">
                    <FaHistory className="size-5 text-theme-400 dark:text-theme-300" />
                    <p className="font-semibold">ประวัติ</p>
                    <p>{animal.history ? animal.history : "-"}</p>
                </div>
            </div>

            {/* Status & Illness */}
            <div className="card-theme p-4 rounded-lg shadow-md dark:text-white! hover:shadow-sm dark:hover:shadow-white/5">
                <div className="flex flex-col gap-y-1">
                    <FaHandHoldingHeart className="size-5 text-theme-400 dark:text-theme-300" />
                    <p className="font-semibold">สถานะการทำหมั่น</p>
                    <p>{animal.healthHistories.spayingStatus ? "ทำหมันแล้ว" : "ยังไม่ได้ทำหมัน"}</p>
                </div>
            </div>

            {/* Illness */}
            <div className="card-theme p-4 rounded-lg shadow-md dark:text-white! hover:shadow-sm dark:hover:shadow-white/5">
                <div className="flex flex-col gap-y-1">
                    <FaHeartbeat className="size-5 text-red-500" />
                    <p className="font-semibold">ประวัติสุขภาพ</p>
                    {animal.healthHistories.illnesses?.length ? (
                        <div>
                            {animal.healthHistories.illnesses.map((illness, i) => (
                                <div className="flex space-x-2" key={i}>
                                    {illness.status == "Chronic" && <FaHeartbeat className="size-5 text-red-500" />}
                                    {illness.status == "Recovered" && <FaCheckCircle className="size-5 text-green-500 dark:text-green-400" />}
                                    {illness.status == "Under surveillance" && <FaEye className="size-5 text-blue-300 dark:text-blue-400" />}
                                    {illness.status == "Under treatment" && <FaClinicMedical className="size-5 text-theme-500 dark:text-theme-300" />}
                                    <p>{illness.name} - <span className=
                                        {`font-semibold ${illness.status == "Chronic" && "text-red-500"}
                                        ${illness.status == "Recovered" && "text-green-500 dark:text-green-400"}
                                        ${illness.status == "Under surveillance" && "text-blue-300 dark:text-blue-400"}
                                        ${illness.status == "Under treatment" && "text-theme-500 dark:text-theme-300"}
                                        `}
                                    >{displayIllness(illness.status)}
                                    </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : "-"}
                </div>
            </div>


        </div>
    )
}