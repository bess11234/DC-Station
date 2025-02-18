"use client"
import { ChangeEvent, useEffect, useState, useRef, useActionState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"

import { useDebouncedCallback } from "use-debounce"

import type { Animal, Illness } from "@/app/lib/definition"
import { updateAnimal, State } from "@/app/lib/action"
import { XCircleIcon, ArrowTurnDownLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

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

export function EditingData({ animal }: { animal: Animal }) {
    // Form submit
    const initialState: State = {
        message: "",
        errors: ""
    }

    const [mainImage, setMainImage] = useState<File | null>(null)
    const [extraImages, setExtraImages] = useState<File[]>([])
    const updateAnimalWithImages = updateAnimal.bind(null, mainImage, extraImages)

    const [state, formAction] = useActionState(updateAnimalWithImages, initialState)

    // Input Animal
    const [inputAnimal, setInputAnimal] = useState<Animal>({ ...animal })
    const [displayPersonalities, setDisplayPersonalities] = useState<display[]>(inputAnimal.personalities.map((v, i) => {
        return {
            id: i,
            visible: true,
            value: v
        }
    }))

    // Input Illness
    const [inputIllness, setInputIllness] = useState<displayIllness[]>(inputAnimal.healthHistories.illeness != undefined && inputAnimal.healthHistories.illeness.map((v, i) => {
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

    // Form Animal
    const inputForm = useRef<HTMLFormElement>(null)

    useEffect(() => {
        console.log(inputAnimal)
    }, [inputAnimal])

    const handleInput = useDebouncedCallback((value: string | undefined, key: string) => {
        if (value == undefined) value = ""
        setInputAnimal(prevState => ({ ...prevState, [key]: value }))
    }, 300)

    const handlehealthHistories = useDebouncedCallback((value: string | Illness[] | undefined, key: string) => {
        if (value == undefined) value = ""

        const healthTemp = {...inputAnimal.healthHistories}
        if (key == "spayingStatus") {
            healthTemp.spayingStatus = value == "1"
        }

        if (key == "illeness" && typeof value != "string") {
            healthTemp.illeness = value
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
        if (temp) { handlehealthHistories(temp.filter(v => v.visible), "illeness") }
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
        setInputIllness(animal.healthHistories.illeness != undefined && animal.healthHistories.illeness.map((v, i) => {
            return {
                id: i,
                name: v.name,
                value: v.name,
                status: v.status,
                visible: true,
            }
        }) || [])
    }

    function validateIllness(status: string): "Under treatment" | "Recovered" | "Chronic" | "Under surveillance" {
        if (status == "Under treatment" || status == "Recovered" || status == "Chronic" || status == "Under surveillance") {
            return status
        }
        return "Under treatment"
    }

    return (
        <form ref={inputForm} action={formAction} >

            <div className="relative">
                <div className="absolute bottom-0 right-0 mr-2 mb-2" aria-label="Edit main image" role="button">
                    {/* Edit button */}
                    <label htmlFor="animalMainImage" title="Edit">
                        <div className="button-theme p-1.5 rounded-full cursor-pointer">
                            <PencilSquareIcon className={`transition-colors size-6`} />
                        </div>
                    </label>
                    <input onChange={(e) => handleUploadMainImage(e)} accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff" type="file" name="animalMainImage" id="animalMainImage" hidden />
                </div>

                {/* Main Image */}
                <Image
                    src={mainImage ? URL.createObjectURL(mainImage) : animal.images[0]}
                    alt={`Picture of ${animal.name} No.0`}
                    sizes="100%"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL={animal.images[0]}
                    quality={74}
                    className="w-full sm:h-[500px] h-[300px] rounded-xl grow shadow"
                />
            </div>

            <div className="grid *:py-3 md:text-lg sm:text-base text-sm">
                <div className="grid sm:grid-cols-2 grid-cols-1 py-0! *:text-nowrap sm:space-x-3 items-center">
                    {/* ชื่อ */}
                    <div className="grid">
                        <label className="text-2xl py-3" htmlFor="animalName">ชื่อ</label>
                        <input className="p-3 w-full rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "name")} type="text" name="name" id="animalName" autoComplete="name" defaultValue={animal.name} required />
                    </div>

                    {/* วันเกิด */}
                    <div className="grid">
                        <label className="text-2xl py-3" htmlFor="animalDob">วันเกิด</label>
                        <input className="p-3 w-full rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "dob")} type="date" name="dob" id="animalDob" defaultValue={new Date(Date.parse(animal.dob)).toISOString().split("T")[0]} max={new Date().toISOString().split("T")[0]} required />
                    </div>
                </div>

                <div className="grid sm:grid-cols-4 grid-cols-1 py-0! *:text-nowrap sm:space-x-3 items-center">
                    {/* สายพันธ์ุ */}
                    <div className="grid col-span-3">
                        <label className="text-2xl py-3" htmlFor="animalBreed">สายพันธุ์</label>
                        <input className="p-3 w-full rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "breed")} type="text" name="breed" id="animalBreed" defaultValue={animal.breed} required />
                    </div>

                    {/* เพศ */}
                    <div className="grid">
                        <label className="text-2xl py-3" htmlFor="animalGender">เพศ</label>
                        <select className="*:bg-white *:dark:bg-black2 p-3 w-full rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "gender")} name="gender" id="animalGender" defaultValue={animal.gender} required>
                            <option value="M">เพศผู้ ♂</option>
                            <option value="F">เพศเมีย ♀</option>
                        </select>
                    </div>
                </div>

                {/* ประวัติ */}
                <label className="text-2xl" htmlFor="animalHistory">ประวัติ</label>
                <textarea className="p-3 field-sizing-content rounded-xl input-focus-theme" onChange={(e) => handleInput(e.target.value, "history")} name="history" id="animalHistory" defaultValue={animal.history} />

                {/* ประวัติสุขภาพ */}
                <div className="outline outline-dashed p-6! mt-6 rounded-xl hover:outline-theme-400 focus-within:outline-theme-400">
                    <p className="text-2xl">ประวัติสุขภาพ</p>

                    {/* สถานะการทำหมั่น */}
                    <label htmlFor="animalSpayingStatus" className="text-lg p-0!">สถานะการทำหมั่น</label>
                    <select className="*:bg-white *:dark:bg-black2 py-1! px-3 mb-3 w-full rounded-xl input-focus-theme" onChange={(e) => handlehealthHistories(e.target.value, "spayingStatus")} name="spayingStatus" id="animalSpayingStatus" defaultValue={animal.healthHistories.spayingStatus ? "1" : "0"} required>
                        <option value="0">ยังไม่ทำหมัน</option>
                        <option value="1">ทำหมั่นแล้ว</option>
                    </select>

                    {/* อาการเจ็บป่วย */}
                    <p className="text-lg p-0!">อาการเจ็บป่วย</p>
                    <AnimatePresence mode="popLayout">
                        {/* แสดงอาการเจ็บป่วย */}
                        {inputIllness.filter(v => v.visible).map((v) => (
                            (<motion.div layout initial={{ opacity: 0, y: -10, transition: { ease: "easeIn", delay: 2 } }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0, y: -30, transition: { ease: "easeOut", duration: 0.3, delay: 0 } }} className="flex flex-row space-x-3 items-center mb-3 p-0!" key={v.id} >
                                <XCircleIcon className="cursor-pointer size-6 hover:opacity-40 active:opacity-60 rounded-full" onClick={() => handleInputIllness("", "Under treatment", v.id)} />
                                <div className="grid grid-cols-3 w-full">
                                    <input className="col-span-2 py-1 px-3 w-full rounded-l-xl border-r-0 input-focus-theme" onChange={(e) => handleInputIllness(e.target.value, "Under treatment", v.id)} type="text" id={`illness_name${v.id}`} defaultValue={v.value} />
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
                    </AnimatePresence>
                </div>

                {/* อุปนิสัย */}
                <div className="outline outline-dashed p-6! mt-6 rounded-xl hover:outline-theme-400 focus-within:outline-theme-400">
                    <p className="text-2xl">อุปนิสัย</p>
                    <AnimatePresence mode="popLayout">
                        {/* ข้อมูลนิสัย */}
                        {displayPersonalities.filter(v => v.visible).map((v) => (
                            (<motion.div layout initial={{ opacity: 0, y: -10, transition: { ease: "easeIn", delay: 2 } }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0, y: -30, transition: { ease: "easeOut", duration: 0.3, delay: 0 } }} className="flex flex-row space-x-3 items-center mb-3 p-0!" key={v.id} >
                                <button><XCircleIcon className="cursor-pointer size-6 hover:opacity-40 active:opacity-60 rounded-full" onClick={() => handlePersonalitiesInput("", v.id)} /></button><input className="py-1 px-3 w-full rounded-xl input-focus-theme" onBlur={(e) => handlePersonalitiesInput(e.target.value, v.id)} type="text" id={`personality_${v.id}`} defaultValue={v.value} />
                            </motion.div>
                            )
                        ))}

                        {/* ช่องกรอกนิสัยเพิ่มเติม */}
                        <motion.div layout className="p-0! flex mt-1" >
                            <input ref={inputPersonality} className="p-3 w-full rounded-l-xl border-r-0 input-focus-theme" type="text" name="newPersonality" id="newPersonality" placeholder="เพิ่มข้อมูลอุปนิสัย" defaultValue="" onKeyDown={(e) => e.key == "Enter" && handlePersonalitiesInput(e.currentTarget.value)} />
                            <button onClick={(e) => handlePersonalitiesInput(e.currentTarget.parentNode?.querySelectorAll("input")[0].value)} className="border border-black2 dark:border-white text-theme-600 dark:text-theme-400 text-nowrap rounded-r-xl px-3 cursor-pointer font-semibold outline-offset-4" type="button">
                                <span className="flex gap-x-1">เพิ่มข้อมูล<ArrowTurnDownLeftIcon className="size-6" /></span>
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Other Images */}
                <>
                    <p className="md:text-2xl sm:text-2xl text-lg text-center mt-3">รูปภาพเพิ่มเติม</p>

                    {/* Upload Image */}
                    <div className="mx-auto">
                        <label htmlFor="uploadImages" className="py-3 px-5 button-theme rounded-full cursor-pointer">อัพโหลดรูปภาพ</label>
                        <input onChange={handleUploadExtraImages} tabIndex={-1} type="file" id="uploadImages" accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff" multiple hidden />
                    </div>

                    <div className={`columns-2 gap-4 sm:gap-8 space-y-6 ${(inputAnimal.images.length - 1) + (uploadImages.length) >= 5 && "sm:columns-3"}`}>

                        {/* Images of Animals (Origin) */}
                        {
                            inputAnimal.images.filter((_, i) => i != 0).map((src, i) => (
                                <div className="relative pt-2" key={i}>
                                    <Image
                                        src={src}
                                        height={100}
                                        width={100}
                                        sizes="100vw"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        alt={`Picture of ${inputAnimal.name} No.${i}`}
                                        className={`rounded-xl shadow ${i % 3 == 0 ? "aspect-3/2" : "aspect-square"}`}
                                    />
                                    <XCircleIcon onClick={() => deleteImage(src)} className="absolute top-0 -right-2 size-6 bg-theme-500 hover:bg-theme-600 active:bg-theme-700 rounded-full cursor-pointer select-none" />
                                </div>
                            ))
                        }

                        {/* Preview Images from Upload */}
                        {
                            uploadImages.map((src, i) => (
                                <div className="relative pt-2" key={i}>
                                    <Image
                                        src={src}
                                        height={100}
                                        width={100}
                                        sizes="100vw"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        alt={`Picture of ${inputAnimal.name} No.${i + inputAnimal.images.length}`}
                                        className={`rounded-xl shadow ${i % 3 == 0 ? "aspect-3/2" : "aspect-square"}`}
                                    />
                                    <XCircleIcon onClick={() => cancelImage(i)} className="absolute top-0 -right-2 size-6 animate-pulse bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-full cursor-pointer select-none" />
                                </div>
                            ))
                        }
                    </div>
                </>
            </div>

            <div className="flex justify-end">
                <button onClick={() => inputForm.current?.requestSubmit()} className="cursor-pointer py-3 px-6 rounded-full bg-black2 text-white dark:bg-white dark:text-black2 outline-offset-4" type="button">Save</button>
                <button className="cursor-pointer py-3 px-4 rounded-full outline-offset-4" onClick={() => resetForm()} type="reset">Cancel</button>
            </div>
        </form>
    )
}