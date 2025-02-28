import { Request, Animal } from "@/app/lib/definition"
import { fetchRequest, fetchAnimalId } from "@/app/lib/data"
import { PageNavigation } from "@/app/components/(manager)/PageNavigation"
import { ShowAnimalRequests } from "@/app/components/(manager)/requests/ShowAnimalRequests"

import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export default async function Requests() {
    const requests : Request[] = await fetchRequest()

    // get animal data relate request
    const animalRequest : Animal[] = await Promise.all(requests.map((v)=> fetchAnimalId(v.animal)))
    
    // distint animal Id
    const distinctAnimal : Animal[] = []
    for (const animal of animalRequest) {
        if (!distinctAnimal.some(a => a._id === animal._id)) {
            distinctAnimal.push(animal);
        }
    }

    const countAnimalRequest: number = distinctAnimal.length
    const pageNumber = Math.ceil(countAnimalRequest / 6)
    const ListAnimalRequests = []
    for (let i = 0; i < pageNumber; i++) {
        ListAnimalRequests.push(Promise.resolve(distinctAnimal.slice(i * 6, (i+1)*6)))
    }
    const listAnimalRequests = Promise.all(ListAnimalRequests);

    //Count status for animal
    const pendingCounts = distinctAnimal.map(animal => 
        requests.filter(req => req.status === "Pending" && req.animal === animal._id).length
    );
    const rejectCounts = distinctAnimal.map(animal => 
        requests.filter(req => req.status === "Rejected" && distinctAnimal.some(animal => animal._id === req.animal)).length
    );

    return (
        <>
            <div className="flex flex-col w-full py-8">
                {/* Title */}
                <p className="md:text-5xl sm:text-4xl text-3xl font-semibold text-center my-3">คำร้องขอรับเลี้ยง</p>

                <div className="grid space-x-3 p-3">
                    {/* Request */}
                    <div className="bg-theme-100/50 dark:bg-white/5 rounded-3xl sm:p-5 p-3 overflow-x-auto">

                        {/* Create Knowledge */}
                        {/* <Link role="button" href={"/dashboard/knowledges/create"} className="button-secondary w-fit flex flex-row px-4 py-3 rounded-full mb-3 cursor-pointer space-x-1">
                            <PlusIcon className="size-6" /><span>เพิ่มเกร็ดความรู้</span>
                        </Link> */}

                        {/* Show Animal */}
                        <div className="grid lg:grid-cols-2 gap-6 max-sm:gap-y-8 w-full max-w-[1500px] mx-auto">
                            <ShowAnimalRequests animals={listAnimalRequests} pendingCounts={pendingCounts} rejectCounts={rejectCounts}/>
                        </div>

                        {/* Page Navigation */}
                        <PageNavigation totalPage={pageNumber} />
                    </div>
                </div>
            </div>
        </>
    )
}