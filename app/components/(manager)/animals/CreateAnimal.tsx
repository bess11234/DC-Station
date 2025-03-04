"use client"
import { ChangeEvent, useState, useRef, useActionState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"

import { useDebouncedCallback } from "use-debounce"

import type { Animal, Illness, Knowledge } from "@/app/lib/definition"
import { createAndUpdateAnimal, AnimalState } from "@/app/lib/actionClient"

import { XCircleIcon, XMarkIcon, ArrowTurnDownLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { DisplayDateCard } from "../../DisplayDateCard"

interface display {
    id: number
    visible: boolean;
    value: string;
}

interface displayIllness extends Illness {
    id: number;
    visible: boolean;
    value: string;
}

export function CreateAnimal({ animal, knowledges }: { animal: Animal, knowledges: Knowledge[] }) {
    // Form submit
    const initialState: AnimalState = {
        errors: {},
        message: null
    }

    const [mainImage, setMainImage] = useState<File | null>(null)
    const [extraImages, setExtraImages] = useState<File[]>([])

    // Input Animal
    const [inputAnimal, setInputAnimal] = useState<Animal>({ ...animal })
    const [displayPersonalities, setDisplayPersonalities] = useState<display[]>(inputAnimal.personalities.map((v, i) => {
        return {
            id: i,
            visible: true,
            value: v
        }
    }))

    const createAnimalWithImages = createAndUpdateAnimal.bind(null, mainImage, extraImages, inputAnimal)
    const [state, formAction] = useActionState(createAnimalWithImages, initialState)

    // Input Illness
    const [inputIllness, setInputIllness] = useState<displayIllness[]>(inputAnimal.healthHistories.illnesses != undefined && inputAnimal.healthHistories.illnesses.map((v, i) => {
        return {
            id: i,
            name: v.name,
            value: v.name,
            status: v.status,
            visible: true,
        }
    }) || [])

    // Input Personality | Illness
    const inputPersonality = useRef<HTMLInputElement>(null)
    const inputIllnessHTML = useRef<HTMLInputElement>(null)

    // Input Form
    const inputForm = useRef<HTMLFormElement>(null)

    const handleInput = useDebouncedCallback((value: string | string[] | undefined, key: string) => {
        if (value == undefined) value = ""
        setInputAnimal(prevState => ({ ...prevState, [key]: value }))
    }, 300)

    const handlehealthHistories = useDebouncedCallback((value: string | Illness[] | undefined, key: string) => {
        if (value == undefined) value = ""

        const healthTemp = { ...inputAnimal.healthHistories }
        if (key == "spayingStatus") {
            healthTemp.spayingStatus = value == "1"
        }

        if (key == "illnesses" && typeof value != "string") {
            healthTemp.illnesses = value
        }

        setInputAnimal(prevState => ({ ...prevState, ["healthHistories"]: healthTemp }))
    }, 300)

    const handleInputIllness = useDebouncedCallback((name: string | undefined, status: "Under treatment" | "Recovered" | "Chronic" | "Under surveillance", id: number = inputIllness.length) => {
        let temp: displayIllness[] = []

        if (name == undefined) name = ""
        name = name.trim()

        if (id < inputIllness.length) {
            temp = inputIllness.map((v) => {
                if (v.id == id) {
                    // ถ้ามีค่าส่งมาจะปรับ name
                    if (name) { v.value = name; v.name = name }
                    // ถ้าไม่มีค่าส่งมาปรับ Visible
                    else if ((name == "" || name == undefined)) v.visible = false

                    v.status = status
                }
                return v
            })
            setInputIllness(temp)
        } else if (name != "") {
            temp = [...inputIllness, { id: id, value: name, name: name, status: "Under treatment", visible: true }]
            setInputIllness(temp)
        }

        // อัพเดทข้อมูล Personalities จาก displayPersonalities
        if (temp) { handlehealthHistories(temp.filter(v => v.visible), "illnesses") }
        if (inputIllnessHTML.current && "value" in inputIllnessHTML.current) {
            inputIllnessHTML.current.value = ""
        }
    }, 300)

    const handlePersonalitiesInput = useDebouncedCallback((value: string | undefined, id: number = displayPersonalities.length) => {
        let temp: display[] = []

        if (value == undefined) value = ""
        value = value.trim()

        if (id < displayPersonalities.length) {
            temp = displayPersonalities.map((v) => {
                if (v.id == id) {
                    // ถ้ามีค่าส่งมาจะปรับ Value
                    if (value) v.value = value
                    // ถ้าไม่มีค่าส่งมาปรับ Visible
                    else if ((value == "" || value == undefined)) v.visible = false
                }
                return v
            })
            setDisplayPersonalities(temp)
        } else if (value != "") {
            temp = [...displayPersonalities, { id: id, value: value, visible: true }]
            setDisplayPersonalities(temp)
        }

        // อัพเดทข้อมูล Personalities จาก displayPersonalities
        if (temp) { setInputAnimal(prevState => ({ ...prevState, ["personalities"]: temp.filter(v => v.visible).map(v => v.value) })) }
        if (inputPersonality.current && "value" in inputPersonality.current) {
            inputPersonality.current.value = ""
        }
    }, 300)

    // Upload Animal's images and Preview
    const [uploadImages, setUploadImages] = useState<string[]>([])

    function handleUploadMainImage(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            setMainImage(file);
        }
    }

    function handleUploadExtraImages(e: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        setExtraImages(files);

        setUploadImages(files.map(v => URL.createObjectURL(v)))
    }

    function cancelImage(index: number) {
        setExtraImages(prevState => prevState.filter((_, i) => i != index))
        setUploadImages(prevState => prevState.filter((_, i) => i != index))
    }

    function deleteImage(src: string) {
        setInputAnimal(prevState => ({ ...prevState, ["images"]: prevState.images.filter((psrc) => psrc != src) }))
    }

    function validateIllness(status: string): "Under treatment" | "Recovered" | "Chronic" | "Under surveillance" {
        if (status == "Under treatment" || status == "Recovered" || status == "Chronic" || status == "Under surveillance") {
            return status
        }
        return "Under treatment"
    }

    // Input Knowledges
    const [inputKnowledges, setInputKnowledges] = useState<string[]>(inputAnimal.knowledges)

    const handleInputKnowledges = (knowledge: string) => {
        let temp = []
        if (inputKnowledges.includes(knowledge)) {
            temp = inputKnowledges.filter(v => v != knowledge)
        } else {
            temp = [...inputKnowledges, knowledge]
        }
        setInputKnowledges(temp)
        handleInput(temp, "knowledges")
    }

    // Reset Form
    function resetForm() {
        setMainImage(null)
        setExtraImages([])
        setUploadImages([])
        setInputAnimal({ ...animal })
        setDisplayPersonalities(animal.personalities.map((v, i) => {
            return {
                id: i,
                visible: true,
                value: v
            }
        }))
        setInputIllness(animal.healthHistories.illnesses != undefined && animal.healthHistories.illnesses.map((v, i) => {
            return {
                id: i,
                name: v.name,
                value: v.name,
                status: v.status,
                visible: true,
            }
        }) || [])
        setInputKnowledges(animal.knowledges)
    }

    return (
        <form ref={inputForm} action={formAction} >
            <div className="relative">
                <div className="absolute bottom-0 right-0 mr-2 mb-2" aria-label="Edit main image" role="button">
                    {/* Edit button */}
                    <label htmlFor="animalMainImage" title="Edit">
                        <input onChange={(e) => handleUploadMainImage(e)} accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff" type="file" name="animalMainImage" id="animalMainImage" hidden required />
                        <div className="button-theme bg-theme-200/90! dark:bg-black2/50! p-1.5 rounded-full cursor-pointer">
                            <PencilSquareIcon className={`transition-colors size-6`} />
                        </div>
                    </label>
                </div>

                {/* Main Image */}
                <Image
                    src={mainImage ? URL.createObjectURL(mainImage) : "/default_image.webp"}
                    alt={`Main picture of ${animal.name}`}
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL={"/default_image.webp"}
                    quality={80}
                    className={`w-full sm:h-[500px] h-[300px] rounded-xl grow shadow ${!mainImage && `border-2 border-red-500`}`}
                />
            </div>

            <div className="grid *:py-3 md:text-lg sm:text-base text-sm">
                <div className="grid md:grid-cols-3 xs:grid-cols-2 py-0! *:text-nowrap gap-x-3 items-center">
                    {/* ชื่อ */}
                    <div className="grid">
                        <label className="text-2xl py-3" htmlFor="animalName">ชื่อ: <span className="text-red-500">*</span></label>
                        <input className="p-3 w-full rounded-xl input-focus-theme invalid:text-red-500" onChange={(e) => handleInput(e.target.value, "name")} type="text" name="name" id="animalName" autoComplete="name" required placeholder="กรุณากรอกชื่อน้องสัตว์" />
                    </div>

                    {/* วันเกิด */}
                    <div className="grid">
                        <label className="text-2xl py-3" htmlFor="animalDob">วันเกิด: <span className="text-red-500">*</span></label>
                        <input className="p-3 w-full rounded-xl input-focus-theme invalid:text-red-500" onChange={(e) => handleInput(e.target.value, "dob")} type="date" name="dob" id="animalDob" max={new Date().toISOString().split("T")[0]} required />
                    </div>

                    {/* สายพันธุ์ */}
                    <div className="grid">
                        <label className="text-2xl py-3" htmlFor="animalDob">สายพันธุ์: <span className="text-red-500">*</span></label>
                        <select className="*:bg-white *:dark:bg-black2 p-3 w-full rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "specie")} name="specie" id="animalSpecie" required>
                            <option value="Dog">หมา 🐶</option>
                            <option value="Cat">แมว 🐱</option>
                        </select>
                    </div>
                </div>

                <div className="grid sm:grid-cols-4 grid-cols-1 py-0! *:text-nowrap sm:space-x-3 items-center">
                    {/* พันธุ์ */}
                    <div className="grid col-span-3">
                        <label className="text-2xl py-3" htmlFor="animalBreed">พันธุ์: <span className="text-red-500">*</span></label>
                        <input className="p-3 w-full rounded-xl input-focus-theme invalid:text-red-500" onChange={(e) => handleInput(e.target.value, "breed")} type="text" name="breed" id="animalBreed" required placeholder="กรุณากรอกชื่อสายพันธุ์" />
                    </div>

                    {/* เพศ */}
                    <div className="grid">
                        <label className="text-2xl py-3" htmlFor="animalGender">เพศ: <span className="text-red-500">*</span></label>
                        <select className="*:bg-white *:dark:bg-black2 p-3 w-full rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "gender")} name="gender" id="animalGender" required>
                            <option value="M">เพศผู้ ♂</option>
                            <option value="F">เพศเมีย ♀</option>
                        </select>
                    </div>
                </div>

                {/* ประวัติ */}
                <label className="text-2xl" htmlFor="animalHistory">ประวัติ:</label>
                <textarea className="p-3 field-sizing-content rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "history")} name="history" id="animalHistory" placeholder="ประวัติความเป็นมา" />

                {/* ประวัติสุขภาพ */}
                <AnimatePresence mode="popLayout">
                    <div className="outline outline-dashed p-6! mt-6 rounded-xl hover:outline-theme-400 focus-within:outline-theme-400">
                        <p className="text-2xl">ประวัติสุขภาพ</p>

                        {/* สถานะการทำหมั่น */}
                        <label htmlFor="animalSpayingStatus" className="text-lg p-0!">สถานะการทำหมั่น: <span className="text-red-500">*</span></label>
                        <select className="*:bg-white *:dark:bg-black2 py-1! px-3 mb-3 w-full rounded-xl input-focus-theme" onChange={(e) => handlehealthHistories(e.target.value, "spayingStatus")} name="spayingStatus" id="animalSpayingStatus" defaultValue={"0"} required>
                            <option value="0">ยังไม่ทำหมัน</option>
                            <option value="1">ทำหมั่นแล้ว</option>
                        </select>

                        {/* อาการเจ็บป่วย */}
                        <p className="text-lg p-0!">อาการเจ็บป่วย:</p>
                        {/* แสดงอาการเจ็บป่วย */}
                        {inputIllness.filter(v => v.visible).map((v) => (
                            (<motion.div layout initial={{ opacity: 0, y: -10, transition: { ease: "easeIn", delay: 2 } }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0, y: -30, transition: { ease: "easeOut", duration: 0.3, delay: 0 } }} className="flex flex-row space-x-2 items-center mb-3 p-0!" key={v.id} >
                                <XCircleIcon className="cursor-pointer size-8 hover:opacity-40 active:opacity-60 rounded-full" onClick={() => handleInputIllness("", "Under treatment", v.id)} />
                                <div className="grid sm:grid-cols-3 grid-cols-2 w-full">
                                    <input className="sm:col-span-2 py-1 px-3 w-full rounded-l-xl border-r-0 input-focus-theme" onChange={(e) => handleInputIllness(e.target.value, "Under treatment", v.id)} type="text" id={`illness_name${v.id}`} defaultValue={v.value} />
                                    <select className="*:bg-white *:dark:bg-black2 py-1 px-3 w-full rounded-r-xl input-focus-theme" onChange={(e) => handleInputIllness(v.name, validateIllness(e.target.value), v.id)} id={`illness_status${v.id}`} defaultValue={v.status}>
                                        <option value="Under treatment">กำลังรักษา</option>
                                        <option value="Recovered">รักษาหายแล้ว</option>
                                        <option value="Chronic">เรื้อรัง</option>
                                        <option value="Under surveillance">เฝ้าระวัง</option>
                                    </select>
                                </div>
                            </motion.div>
                            )
                        ))}

                        {/* ช่องกรอกอาการป่วยเพิ่มเติม */}
                        <motion.div layout className="p-0! flex mt-1" >
                            <input ref={inputIllnessHTML} className="p-3 w-full rounded-l-xl border-r-0 input-focus-theme" type="text" name="newIllness" id="newIllness" placeholder="เพิ่มข้อมูลอาการป่วย เช่น โรคพยาธิหนอนหัวใจ, โรคฉี่หนู" defaultValue="" onKeyDown={(e) => e.key == "Enter" && handleInputIllness(e.currentTarget.value, "Under treatment")} />
                            <button onClick={(e) => handleInputIllness(e.currentTarget.parentNode?.querySelectorAll("input")[0].value, "Under treatment")} className="border border-black2 dark:border-white text-theme-600 dark:text-theme-400 text-nowrap rounded-r-xl px-3 cursor-pointer font-semibold outline-offset-4" type="button">
                                <span className="flex gap-x-1">เพิ่มข้อมูล<ArrowTurnDownLeftIcon className="size-6" /></span>
                            </button>
                        </motion.div>
                    </div>
                </AnimatePresence>

                {/* อุปนิสัย */}
                <AnimatePresence mode="popLayout">
                    <div className="outline outline-dashed p-6! mt-6 rounded-xl hover:outline-theme-400 focus-within:outline-theme-400">
                        <p className="text-2xl">อุปนิสัย: <span className="text-red-500">*</span></p>
                        {/* ข้อมูลนิสัย */}
                        {displayPersonalities.filter(v => v.visible).map((v) => (
                            (
                                <motion.div layout initial={{ opacity: 0, y: -10, transition: { ease: "easeIn", delay: 2 } }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0, y: -30, transition: { ease: "easeOut", duration: 0.3, delay: 0 } }} className="flex flex-row space-x-2 items-center mb-3 p-0!" key={v.id} >
                                    <XCircleIcon className="cursor-pointer size-8 hover:opacity-40 active:opacity-60 rounded-full" onClick={() => handlePersonalitiesInput("", v.id)} />
                                    <input className="py-1 px-3 w-full rounded-xl input-focus-theme" onBlur={(e) => handlePersonalitiesInput(e.target.value, v.id)} type="text" id={`personality_${v.id}`} defaultValue={v.value} />
                                </motion.div>
                            )
                        ))}

                        {/* ช่องกรอกนิสัยเพิ่มเติม */}
                        <motion.div layout className="p-0! flex mt-1" >
                            <input ref={inputPersonality} className="p-3 w-full rounded-l-xl border-r-0 input-focus-theme peer invalid:text-red-500" type="text" name="newPersonality" id="newPersonality" placeholder="เพิ่มข้อมูลอุปนิสัย" defaultValue="" onKeyDown={(e) => e.key == "Enter" && handlePersonalitiesInput(e.currentTarget.value)} required={displayPersonalities.filter(v => v.visible).length ? false : true} />
                            <button onClick={(e) => handlePersonalitiesInput(e.currentTarget.parentNode?.querySelectorAll("input")[0].value)} className="peer-invalid:border-red-500 border border-black2 dark:border-white text-theme-600 dark:text-theme-400 text-nowrap rounded-r-xl px-3 cursor-pointer font-semibold outline-offset-4" type="button">
                                <span className="flex gap-x-1">เพิ่มข้อมูล<ArrowTurnDownLeftIcon className="size-6" /></span>
                            </button>
                        </motion.div>
                    </div>
                </AnimatePresence>

                {/* Other Images */}
                <p className="md:text-2xl sm:text-2xl text-lg text-center mt-3">รูปภาพเพิ่มเติม</p>

                {/* Upload Image */}
                <div className="mx-auto">
                    <label htmlFor="uploadImages" className="py-3 px-5 button-secondary rounded-full cursor-pointer">อัพโหลดรูปภาพ</label>
                    <input onChange={handleUploadExtraImages} tabIndex={-1} type="file" id="uploadImages" accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff" multiple hidden />
                </div>

                <div className={`columns-2 gap-4 sm:gap-8 space-y-6 ${(inputAnimal.images.length - 1) + (uploadImages.length) >= 5 && "sm:columns-3"}`}>

                    {/* Images of Animals (Origin) */}
                    {
                        inputAnimal.images.filter((_, i) => i != 0).map((src, i) => (
                            <div className="relative pt-2" key={i}>
                                <Image
                                    src={src}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    style={{ objectFit: "cover" }}
                                    alt={`Picture of ${inputAnimal.name} No.${i}`}
                                    className={`size-full rounded-xl shadow ${i % 3 == 0 ? "aspect-3/2" : "aspect-square"}`}
                                />
                                <XMarkIcon onClick={() => deleteImage(src)} className="absolute top-0 -right-2 size-6 p-1 dark:opacity-95 bg-theme-200 text-theme-800 hover:bg-theme-400 hover:text-white rounded-full cursor-pointer select-none" />
                            </div>
                        ))
                    }

                    {/* Preview Images from Upload */}
                    {
                        uploadImages.map((src, i) => (
                            <div className="relative pt-2" key={i}>
                                <Image
                                    src={src}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    style={{ objectFit: "cover" }}
                                    alt={`Picture of ${inputAnimal.name} No.${i + inputAnimal.images.length}`}
                                    className={`size-full rounded-xl shadow ${i % 3 == 0 ? "aspect-3/2" : "aspect-square"}`}
                                />
                                <XMarkIcon onClick={() => cancelImage(i)} className="absolute top-0 -right-2 size-6 p-1 dark:opacity-95 bg-sky-200 text-sky-800 hover:bg-sky-500 hover:text-white  rounded-full cursor-pointer select-none" />
                            </div>
                        ))
                    }
                </div>

                <hr className="p-0! my-6 border" />

                {/* Knowledges */}
                <p className="md:text-2xl sm:text-2xl text-lg text-center">เกร็ดความรู้เพิ่มเติม</p>
                {/* Add Knowledge */}
                <div className="mx-auto py-0!">
                    <button type="button" popoverTarget="my-knowledges" className="py-3 px-5 button-secondary rounded-full cursor-pointer">จัดการเกร็ดความรู้</button>
                </div>

                <div popover="auto" id="my-knowledges" className="p-0! bg-transparent w-screen h-screen opacity-0 transition-all duration-500 transition-discrete open:opacity-100 starting:open:opacity-0">
                    <div className="relative grid size-full justify-center items-center">
                        <div onClick={() => document.getElementById("my-knowledges")?.hidePopover()} className="absolute bg-black2/10 dark:bg-black2/50 w-screen h-screen"></div>
                        <div className="relative z-10 md:w-[80vw] w-screen h-[75vh] bg-white dark:bg-neutral-950 border border-white/10 rounded-xl">
                            <XMarkIcon onClick={() => document.getElementById("my-knowledges")?.hidePopover()} className="absolute -top-2 -right-2 size-6 p-1 dark:opacity-95 bg-theme-200 text-theme-800 hover:bg-theme-500 hover:text-white  rounded-full cursor-pointer select-none" />
                            <div className="h-full p-6 overflow-y-auto">
                                <h1>จัดการเกร็ดความรู้</h1>

                                {/* Display Knowledges */}
                                <div className="my-3 space-y-3">
                                    {knowledges.map((v, i) => (
                                        <div className="flex space-x-3 items-center" key={i}>
                                            <input id={`knowledges_${v._id}`} onChange={() => handleInputKnowledges(v._id)} className="peer checkbox" type="checkbox" defaultChecked={inputKnowledges.includes(v._id)} />
                                            <label htmlFor={`knowledges_${v._id}`} className="grid p-3 sm:rounded-3xl rounded-xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base bg-theme-100/80 peer-checked:bg-theme-200 dark:bg-white/5 dark:peer-checked:bg-theme-300/20 cursor-pointer w-full">
                                                <div className="flex items-center space-x-5">
                                                    <Image
                                                        src={v.image}
                                                        alt={`Picture of ${v.title}`}
                                                        width={50}
                                                        height={50}
                                                        className="size-12 object-cover rounded-full"
                                                    />
                                                    <div>
                                                        <p className="line-clamp-1">{v.title}</p>
                                                        <p className="opacity-50 text-sm line-clamp-1">{v.describe}</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display Knowledges */}
                <div className="grid grid-cols-2 gap-6 my-2">
                    {knowledges.filter(v => inputKnowledges.includes(v._id)).map((v, i) => (
                        <div key={i} className="select-none card bg-theme-100 dark:bg-theme-950/50 rounded-xl md:max-h-[400px] max-h-[350px] max-w-full hover:shadow-lg dark:shadow-white/15">
                            <figure className="rounded-t-xl">
                                <Image
                                    src={v.image}
                                    alt={`Picture of ${v.title}.`}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    style={{ objectFit: "cover" }}
                                    placeholder="blur"
                                    blurDataURL={v.image}
                                    quality={74}
                                    className="w-full h-[300px] transition-transform"
                                />
                            </figure>
                            <div className="relative card-body max-sm:p-6 pb-4 lg:px-8 md:px-4 sm:px-4 max-sm:mt-1">
                                {/* Date */}
                                {v.createdAt && <DisplayDateCard date={Date.parse(v.createdAt)} />}
                                {/* Title */}
                                <p className="card-title text-theme-950 dark:text-theme-50 lg:text-3xl text-xl text-nowrap truncate">{v.title.length <= 31 ? v.title : v.title.slice(0, 31).concat("...")}</p>
                                {/* Description */}
                                <p className="text-theme-800 dark:text-theme-100 text-xs truncate">{v.describe}</p>
                            </div>
                            <XMarkIcon onClick={() => handleInputKnowledges(v._id)} className="absolute -top-2 -right-2 size-6 p-1 dark:opacity-95 bg-theme-200 text-theme-800 hover:bg-theme-400 hover:text-white rounded-full cursor-pointer select-none" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 justify-end space-y-2">
                <button onClick={() => inputForm.current?.requestSubmit()} className="cursor-pointer py-3 px-6 rounded-full button-theme-primary outline-offset-4" type="button">เพิ่มข้อมูลสัตว์</button>
                <button className="cursor-pointer py-3 px-4 rounded-full outline-offset-4" onClick={() => resetForm()} type="reset">ยกเลิก</button>
            </div>

        </form >
    )
}