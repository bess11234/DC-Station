import { Metadata } from "next"

import { PhoneIcon } from "@heroicons/react/24/outline"
import { EnvelopeIcon } from "@heroicons/react/24/outline"

export const metadata: Metadata = {
    title: "Contact"
}

export default function Contact() {
    return (
        <div className="grid gap-3 max-w-[1000px]">
            {/* Contact Us */}
            <div className="sm:px-8 px-5 py-10 sm:m-6 m-3 bg-theme-100 dark:bg-theme-950 rounded-xl hover:shadow-xl">
                <p className="mb-4 md:text-5xl sm:text-4xl text-3xl">ติดต่อสอบถาม</p>
                <p className="md:text-xl xs:text-lg text-base indent-8">มอบการดูแลที่ดีที่สุดให้กับสัตว์เลี้ยงแสนรักของคุณ! ไม่ว่าจะเป็นโภชนาการที่เหมาะสม การดูแลสุขภาพ หรือการฝึกฝนเฉพาะทาง บริการของเราช่วยให้สุนัขและแมวของคุณมีสุขภาพดีและมีความสุข ติดต่อสอบถามขอรับเลี้ยงสัตว์ เพื่อเป็นบ้านแสนสุขให้สัตว์ที่น่าสงสาร</p>

                <div className="flex sm:flex-row flex-col sm:gap-6 sm:px-5">
                    {/* Phone */}
                    <div className="flex items-center gap-3 mt-4">
                        <button className="bg-theme-300/40 dark:bg-theme-700/80 rounded-full p-3"><PhoneIcon className="size-8 text-theme-800 dark:text-theme-50" /></button>
                        <span className="md:text-xl text-lg">123-456-7890</span>
                    </div>

                    {/* Mail */}
                    <div className="flex items-center gap-3 mt-4">
                        <button className="bg-theme-300/40 dark:bg-theme-700/80 rounded-full p-3"><EnvelopeIcon className="size-8 text-theme-800 dark:text-theme-50" /></button>
                        <span className="md:text-xl text-lg">test@mail.com</span>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="sm:px-8 px-5 py-10 sm:m-6 m-3 bg-theme-100 dark:bg-theme-950 rounded-xl hover:shadow-xl">
                <p className="mb-4 md:text-5xl sm:text-4xl text-3xl">เกี่ยวกับ</p>
                <p className="mb-4 md:text-xl xs:text-lg indent-8">ยินดีต้อนรับสู่ DC Station องค์กรไม่แสวงหาผลกำไรเพื่อช่วยเหลือสุนัขและแมว</p>
                <ol className="md:text-xl xs:text-lg text-base list-decimal mx-8">
                    <li>ภารกิจของเรา ช่วยเหลือ ดูแล และหาบ้านที่อบอุ่นให้กับสัตว์เลี้ยงที่ถูกทอดทิ้ง</li>
                    <li>การรักษาพยาบาลที่จำเป็น เพื่อให้สัตว์เลี้ยงมีสุขภาพแข็งแรง</li>
                    <li>โครงการอุปถัมภ์ เปิดโอกาสให้สัตว์เลี้ยงได้มีบ้านชั่วคราวที่อบอุ่น</li>
                    <li>ให้ความรู้เกี่ยวกับการเลี้ยงสัตว์อย่างรับผิดชอบ เพื่อสร้างสังคมที่ดีกว่าสำหรับสัตว์เลี้ยง</li>
                    <li>ร่วมเป็นส่วนหนึ่งของเรา ผ่านการรับเลี้ยง อาสาสมัคร หรือบริจาค</li>
                    <li>🐶🐱 ช่วยมอบโอกาสที่ดีกว่าให้กับสุนัขและแมวทุกตัว—ติดต่อเราวันนี้!</li>
                </ol>
            </div>
        </div>
    )
}