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
            <div>
                {requests.map((request, index) => 
                <div key={index}>
                    {/* <h1>{request.animal}</h1> */}
                    <Image 
                    alt={`Picture of ${animalrequest[index].name}`} 
                    src={animalrequest[index].images[0]}
                    width={100}
                    height={100}
                     />
                    <p>idCard: {request.requester.idCard}</p>
                    <div>
                        <p>Status : {request.status}</p>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}