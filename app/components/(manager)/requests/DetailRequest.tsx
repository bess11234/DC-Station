"use client"

import { use, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import type { Request } from "@/app/lib/definition"
import { ModalDetail } from "./ModalDetail"
import { ModalStatusChange } from "./ModalStatusChange"

export function DetailRequests({ requests }: { requests: Promise<Request[][]> }) {

    const searchParams = useSearchParams()

    const [indexRequest, setIndexRequest] = useState<number>(0)
    const showRequest = use(requests) // Solved Promise

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (params.get("pages")) {
            const pages = Number(params.get("pages")) - 1
            if (pages < showRequest.length && pages >= 0) {
                setIndexRequest(pages)
            }
        }
    }, [searchParams, setIndexRequest, showRequest])

    const [showModalDetail, setShowModalDetail] = useState<Request | null>(null);
    const [modalStatusChange, setModalStatusChange] = useState<{ request: Request; newStatus: string } | null>(null);


    return (
        <>
            {showRequest[indexRequest]
                .map((v, i) => (
                    <div key={i} className="relative rounded-3xl dark:shadow-theme-50/10 card-theme md:text-xl sm:text-lg text-base p-3 hover:shadow-md">
                        <div className="flex flex-row sm:gap-x-3 gap-x-3 w-full mb-5">
                            <div className="relative flex flex-col pr-6 pt-2">
                                <div className="ml-2 mr-6">
                                    <table className="text-left space-x-1 border-separate border-spacing-2">
                                        <tbody>
                                            <tr>
                                                <th className="align-top font-semibold text-lg">ชื่อ-นามสกุล</th>
                                                <td className="align-top">:</td>
                                                <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{v.requester.firstname} {v.requester.lastname}</td>
                                            </tr>
                                            <tr>
                                                <th className="align-top font-semibold text-lg ">อีเมล</th>
                                                <td className="align-top">:</td>
                                                <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{v.requester.email}</td>
                                            </tr>
                                            <tr>
                                                <th className="align-top font-semibold text-lg  whitespace-nowrap w-auto">ชื่อ/ลิงค์เฟซบุ๊ค</th>
                                                <td className="align-top">:</td>
                                                <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{v.requester.fb}</td>
                                            </tr>
                                            <tr>
                                                <th className="align-top font-semibold text-lg ">เบอร์โทร</th>
                                                <td className="align-top">:</td>
                                                <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{v.requester.phone}</td>
                                            </tr>
                                            <tr>
                                                <th className="align-top font-semibold text-lg ">ประสบการณ์</th>
                                                <td className="align-top">:</td>
                                                <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{v.requester.experience}</td>
                                            </tr>
                                            <tr>
                                                <th className="align-top font-semibold text-lg ">เหตุผล</th>
                                                <td className="align-top">:</td>
                                                <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{v.requester.reason}</td>
                                            </tr>
                                            {["Accepted", "Rejected"].includes(v.status) ?
                                                <tr>
                                                    <th className="align-top font-semibold">สถานะ</th>
                                                    <td className="align-top">:</td>
                                                    <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{v.status}</td>
                                                </tr>: null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {v.status == "Pending" ?
                            <div className="flex justify-end space-x-3">
                                <button type="button" className="bg-theme-400/90 rounded-xl py-1 md:px-6 sm:px-3 px-3 text-base cursor-pointer font-semibold hover:opacity-50 dark:hover:opacity-80"
                                    onClick={() => setShowModalDetail(v)}>ดูรายละเอียด
                                </button>
                                <button type="button" className="bg-red-400 dark:bg-red-600 rounded-xl py-1 px-3 text-base cursor-pointer text-white font-semibold hover:opacity-60"
                                    onClick={() => setModalStatusChange({ request: v, newStatus: "Rejected" })}>ปฏิเสธ</button>
                                <button type="button" className="bg-green-500 dark:bg-green-600 rounded-xl text-base py-1 px-3 cursor-pointer text-white font-semibold hover:opacity-60"
                                    onClick={() => setModalStatusChange({ request: v, newStatus: "Accepted" })}>ยืนยัน</button>
                            </div> :
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

            {modalStatusChange && (
                <ModalStatusChange
                    onClose={() => setModalStatusChange(null)}
                    request={modalStatusChange.request}
                    newStatus={modalStatusChange.newStatus}
                />
            )}

        </>
    )
}