"use client"

import { Suspense, use, useEffect, useState } from "react"
import { fetchAnimalRequest } from "@/app/lib/data" 
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import type {Request, Animal } from "@/app/lib/definition"

import { ModalAccepted } from "./ModalAccepted"
import { ModalRejected } from "./ModalRejected"
import { ModalDetail } from "./ModalDetail"

export function DetailRequests({ requests, status = [] }: { requests : Request[]; status : string[]}) {

    console.log("status", status, status.includes("Accepted"))

    const [showModalDetail, setShowModalDetail] = useState<Request | null>(null);
    const [showModalRejected, setShowModalRejected] = useState<Request | null>(null);
    const [showModalAccepted, setShowModalAccepted] = useState<Request | null>(null);

    return (
        <>
            {requests
            .filter(v=>(status.includes(v.status)))
            .map((v, i) => (
                <div key={i} className="relative grid rounded-3xl dark:shadow-theme-50/10 card-theme md:text-xl sm:text-lg text-base p-3 hover:shadow-md">
                    <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full mb-5">
                        <div className="relative flex flex-col pr-6 pt-2">
                            <div className="ml-2 mr-6">
                                {/* <p className="line-clamp-1 mb-1">{v.requester.name}</p> */}
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p><span className="font-semibold">ชื่อ-นามสกุล:</span> {v.requester.firstname} {v.requester.lastname}</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p><span className="font-semibold">อีเมล:</span> {v.requester.email}</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p><span className="font-semibold">ชื่อ/ลิงค์เฟซบุ๊ค:</span> {v.requester.fb}</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p><span className="font-semibold">เบอร์โทร:</span> {v.requester.phone}</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p><span className="font-semibold">ประสบการณ์:</span> {v.requester.experience}</p>
                                </div>
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p><span className="font-semibold">เหตุผล:</span> {v.requester.reason}</p>
                                </div>
                                {["Accepted", "Rejected"].includes(v.status)? 
                                <div className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">
                                    <p><span className="font-semibold">สถานะ:</span> {v.status}</p>
                                </div>: null}
                            </div>
                        </div>
                    </div>
                    {v.status == "Pending"? 
                    <div className="flex justify-end space-x-3">
                        <button type="button" className="bg-theme-300/70 rounded-xl py-1 md:px-6 sm:px-3 px-3 text-base cursor-pointer font-semibold hover:opacity-50 dark:hover:opacity-80"
                        onClick={() => setShowModalDetail(v)}>ดูรายละเอียด
                        </button>
                        <button type="button" className="bg-red-400 dark:bg-red-600 rounded-xl py-1 px-3 text-base cursor-pointer text-white font-semibold hover:opacity-60"
                        onClick={() => setShowModalRejected(v)}>ปฏิเสธ</button>
                        <button type="button" className="bg-green-500 dark:bg-green-600 rounded-xl text-base py-1 px-3 cursor-pointer text-white font-semibold hover:opacity-60"
                        onClick={() => setShowModalAccepted(v)}>ยืนยัน</button>
                    </div>: 
                    <div className="flex justify-end space-x-3">
                        <button type="button" className="bg-theme-300/70 rounded-xl py-1 md:px-6 sm:px-3 px-3 text-base cursor-pointer font-semibold hover:opacity-50 dark:hover:opacity-80"
                            onClick={() => setShowModalDetail(v)}>ดูรายละเอียด
                        </button>
                    </div>
                    }
                </div> 
            ))}

            {/* Modal */}
            {showModalDetail && (
                <ModalDetail 
                    onClose={() => setShowModalDetail(null)} 
                    request={showModalDetail} 
                />
            )}
            {showModalRejected && (
                <ModalRejected
                    onClose={() => setShowModalRejected(null)} 
                    request={showModalRejected} 
                />
            )}
            {showModalAccepted && (
                <ModalAccepted
                    onClose={() => setShowModalAccepted(null)} 
                    request={showModalAccepted} 
                />
            )}
        </>
    )
}