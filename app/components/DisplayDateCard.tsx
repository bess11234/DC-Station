'use client'
import { displayMonthThai } from "../lib/utils"

interface Props {
    date: number
}

export function DisplayDateCard({ date }: Props) {

    function displayDate(date: number) {
        const nowDate = new Date(date)
        const day = nowDate.getDate()
        const month = displayMonthThai(nowDate.getMonth())
        const year = nowDate.getFullYear()
        return `${day} ${month} ${year}`
    }
    return (
        <p className="absolute sm:top-3 top-2 text-xs">วันที่ {displayDate(date)}</p>
    )
}