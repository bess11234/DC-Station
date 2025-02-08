import { Metadata } from "next"

import { Card } from "@/app/components/Card"

export const metadata: Metadata = {
    title: "Knowledges"
}

export default function Knowledges() {
    const mockDate = Date.now()
    return (
        <>
            <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3 w-full">สร้างเสริมเกร็ดความรู้</p>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 sm:m-3">
                <Card hrefLink="/knowledges/1" src="/gallery/image0.webp" title="Test" desc="#" date={mockDate} />
                <Card hrefLink="/knowledges/1" src="/gallery/image0.webp" title="Test" desc="#" date={mockDate} />
                <Card hrefLink="/knowledges/1" src="/gallery/image0.webp" title="Test" desc="#" date={mockDate} />
                <Card hrefLink="/knowledges/1" src="/gallery/image0.webp" title="Test" desc="#" date={mockDate} />
                <Card hrefLink="/knowledges/1" src="/gallery/image0.webp" title="Test" desc="#" date={mockDate} />
                <Card hrefLink="/knowledges/1" src="/gallery/image0.webp" title="Test" desc="#" date={mockDate} />
            </div>
        </>
    )
}