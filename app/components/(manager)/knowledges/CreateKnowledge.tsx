"use client"

import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react"

import Image from "next/image"
import dynamic from "next/dynamic"

import parse from "html-react-parser"

import { useDebouncedCallback } from "use-debounce"

import { PencilSquareIcon } from "@heroicons/react/24/outline"

import { Knowledge } from "@/app/lib/definition"
import { KnowledgeState, createAndUpdateKnowledge } from "@/app/lib/action"

const CustomEditor = dynamic(() => import('../../EditorV2'), { ssr: false });

export function CreateKnowledge({ knowledge }: { knowledge: Knowledge }) {
    const [preview, setPreview] = useState(false)

    const initialState: KnowledgeState = {
        errors: {},
        message: null
    }

    // Input Form
    const inputForm = useRef<HTMLFormElement>(null)

    const [inputKnowledge, setInputKnowledge] = useState({ ...knowledge })

    const [inputContentKnowledge, setInputContentKnowledge] = useState<string>(inputKnowledge.content)

    const [mainImage, setMainImage] = useState<File | null>(null)

    const createAndUpdateKnowledgeWithInformation = createAndUpdateKnowledge.bind(null, mainImage, inputKnowledge)

    const [state, formAction] = useActionState(createAndUpdateKnowledgeWithInformation, initialState)

    const handleInput = useDebouncedCallback((value: string, key: string) => {
        if (value == undefined) value = ""
        setInputKnowledge((prevState) => ({ ...prevState, [key]: value }))
    }, 300)


    function handleUploadMainImage(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            setMainImage(file);
        }
    }

    function resetForm() {
        setMainImage(null)
        setInputKnowledge({ ...knowledge })
        setInputContentKnowledge(knowledge.content ? knowledge.content : "")
    }

    useEffect(() => {
        handleInput(inputContentKnowledge, "content")
    }, [handleInput, inputContentKnowledge])

    return (
        <form ref={inputForm} action={formAction} className={`sm:px-6 xs:px-4 px-2 ${preview && "text-lg gap-y-3"}`}>
            <button type="button" onClick={() => setPreview(prevState => !prevState)} className="button-theme text-base rounded-xl cursor-pointer w-fit px-6 py-3">Preview</button>

            {/* Title Content */}
            <p className="md:text-5xl sm:text-4xl text-3xl text-center py-3">{preview ? inputKnowledge.title : knowledge.title}</p>
            {preview && <p className="indent-4 opacity-50">{inputKnowledge.describe}</p>}

            <div className="relative">
                <div className={`${preview && "hidden"} absolute bottom-0 right-0 mr-2 mb-2`} aria-label="Edit main image" role="button">
                    {/* Edit button */}
                    <label htmlFor="animalMainImage" title="Edit">
                        <div className="button-theme bg-theme-200/90! dark:bg-black2/50! p-1.5 rounded-full cursor-pointer">
                            <PencilSquareIcon className={`transition-colors size-6`} />
                        </div>
                    </label>
                    <input onChange={(e) => handleUploadMainImage(e)} accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff" type="file" name="animalMainImage" id="animalMainImage" hidden required />
                </div>

                {/* Main Image */}
                <Image
                    src={mainImage ? URL.createObjectURL(mainImage) : "/default_image.webp"}
                    alt={`Picture of ${knowledge.title}`}
                    sizes="100%"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL={"/default_image.webp"}
                    quality={74}
                    className={`w-full sm:h-[500px] h-[300px] rounded-xl grow shadow ${!mainImage && `border-2 border-red-500`}`}
                />
            </div>

            <div className={`${preview ? "hidden" : "grid"} *:py-3 text-lg my-3`}>

                {/* Title */}
                <label className="text-2xl" htmlFor="knowledgeDescribe">ชื่อเรื่อง: <span className="text-red-500">*</span></label>
                <textarea className="p-3 field-sizing-content rounded-xl input-focus-theme invalid:text-red-500" onChange={(e) => handleInput(e.target.value, "title")} name="title" id="knowledgeTitle" defaultValue={knowledge.title} placeholder="ชื่อเรื่องของเกร็ดความรู้" required />

                {/* Describe */}
                <label className="text-2xl" htmlFor="knowledgeDescribe">คำอธิบาย: <span className="text-red-500">*</span></label>
                <textarea className="p-3 field-sizing-content rounded-xl input-focus-theme invalid:text-red-500" onChange={(e) => handleInput(e.target.value, "describe")} name="describe" id="knowledgeDescribe" defaultValue={knowledge.describe} placeholder="คำอธิบายเกร็ดความรู้" required />

                {/* Content */}
                <p className="text-2xl">เนื้อหา: <span className="text-red-500">*</span></p>
                <input className="peer hidden" type="text" value={inputContentKnowledge} required />
                <div className="border peer-invalid:border-red-500 text-black p-0! min-h-[500px] xl:w-[1000px] break-words selection:bg-neutral-300! selection:text-inherit!">
                    <CustomEditor content={inputContentKnowledge} updateContent={setInputContentKnowledge} />
                </div>
            </div>

            <div>
                {preview && parse(inputContentKnowledge)}
            </div>

            <br />

            <div className="grid grid-cols-1 justify-end space-y-2 lg:text-xl md:text-lg text-base">
                <button onClick={() => inputForm.current?.requestSubmit()} className="cursor-pointer py-3 px-6 rounded-full button-theme-primary outline-offset-4" type="button">อัพเดท</button>
                <button className="cursor-pointer py-3 px-4 rounded-full outline-offset-4" onClick={() => resetForm()} type="reset">ยกเลิก</button>
            </div>


        </form>
    )
}