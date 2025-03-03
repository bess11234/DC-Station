import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"

import parse from "html-react-parser"

import { fetchKnowledgeId } from "@/app/lib/data"

export const metadata: Metadata = {
    title: "Knowledges"
}

export default async function KnowledgesId({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const knowledge = await fetchKnowledgeId(id)
    if (!knowledge) notFound()
    // test()
    // Fetch From DB

    return (
        <>
            <div className="flex flex-col w-screen gap-3 items-center sm:px-16 xs:px-8 px-6">
                <div className="lg:max-w-[1000px] text-lg">
                    <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3">{knowledge.title}</p>
                    <p className="indent-4 opacity-50">{knowledge.describe}</p>
                    <Image
                        src={knowledge.image}
                        alt={`Picture of ${knowledge.title}`}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                        placeholder="blur"
                        blurDataURL={knowledge.image}
                        quality={74}
                        className="w-full sm:h-[500px] h-[300px] rounded-xl grow shadow my-3"
                    />
                    {knowledge.content && parse(knowledge.content)}
                </div>
            </div>
        </>
    )
}

async function test() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
}