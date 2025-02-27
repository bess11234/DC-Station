import { Request, Animal } from "@/app/lib/definition"
import { fetchRequest, fetchAnimalId } from "@/app/lib/data"
import Image from "next/image"

export default async function Requests() {
    const requests : Request[] = await fetchRequest()
    const animalrequest : Animal[] = await Promise.all(requests.map((v)=> fetchAnimalId(v.animal)))
    console.log(animalrequest)

    return (
        <div className="flex flex-col py-8 w-full">
            <div className="flex justify-center">
                <h1 className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">คำร้องขอ</h1>        
            </div>
            <div className="grid space-x-3 p-3">
                <div className="bg-theme-100/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 overflow-x-auto">
                <h1>Pending</h1>
                    {requests.map((request, index) => 
                    <div key={index} className="relative grid rounded-3xl dark:shadow-theme-50/10 md:text-xl sm:text-lg text-base bg-theme-200/15 dark:bg-white/5 p-3 hover:shadow-md">
                        {/* Show Knowledge */}
                            <div className="bg-theme-100 flex flex-row sm:gap-x-3 gap-x-3 w-full">
                                <div className="grid space-y-1 flex-none">
                                    <Image 
                                        alt={`Picture of ${animalrequest[index].name}`} 
                                        src={animalrequest[index].images[0]}
                                        width={100}
                                        height={100}
                                        className="rounded-3xl w-[100px] h-[100px] flex-none"
                                        />
                                </div>

                                <div className="relative flex flex-col pr-6 pt-2">
                                    <div className="ml-2 mr-6">
                                        <p className="line-clamp-1 mb-1">เลขบัตรประชาชน: {request.requester.idCard}</p>
                                        <div className="opacity-50 sm:text-base text-sm">
                                            
                                            <p>เบอร์โทร: {request.requester.phone}</p>
                                            <p>เฟซบุ๊ค: {request.requester.fb} </p>
                                            <p>ประสบการณ์: {request.requester.experience}</p>
                                            <p>เหตุผลในการขอรับเลี้ยง: {request.requester.reason}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="cursor-pointer rounded-lg border-1 border-theme-400 text-theme-600 text-2xl shadow-md px-3 w-fit">
                                        <button className="cursor-pointer">Reject</button> 
                                    </div>
                                    <div className="cursor-pointer rounded-lg button-theme-primary text-2xl shadow-md text-white px-3 w-fit">
                                        <button className="cursor-pointer">Accept</button>
                                    </div>
                                </div>
                                
                            </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}