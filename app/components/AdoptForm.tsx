export function AdoptForm() {
    return (
        <>
        <div className="w-full h-fit border-1 border-dashed p-10 rounded-2xl">
            <p className="mb-5 flex justify-center text-3xl font-bold">ฟอร์มการขอรับเลี้ยง</p>
            <form action="">
                <div className="flex flex-col gap-5">
                   <div className="flex gap-4">
                        {/* รหัสบัตรประชาชน */}
                        <div className="flex flex-col w-1/2">
                            <label>รหัสบัตรประชาชน: <span className="text-red-600">*</span></label>
                            <input className="px-2 h-10 rounded-lg" type="text" maxLength={13} required/>
                        </div>

                        {/* หมายเลขโทรศัพท์ */}
                        <div className="flex flex-col w-1/2">
                            <label>หมายเลขโทรศัพท์: <span className="text-red-600">*</span></label>
                            <input className="px-2 h-10 rounded-lg" type="text" maxLength={10} required/>
                        </div>
                    </div>
                    {/* facebook */}
                    <div className="flex flex-col">
                            <label>ลิงค์ facebook: <span className="text-red-600">*</span></label>
                            <input className="px-2 h-10 rounded-lg" type="text" required/>
                        </div>
                    {/* ประสบการณ์ */}
                    <div className="flex flex-col">
                        <label>ประสบการณ์การเลี้ยงสัตว์:</label>
                        <textarea className="px-2 pt-2 h-20 rounded-lg resize-none"/>
                    </div>
                    {/* เหตุผล */}
                    <div className="flex flex-col">
                        <label>เหตุผลในการขอรับเลี้ยงน้อง: <span className="text-red-600">*</span></label>
                        <textarea className="px-2 pt-2 h-20 rounded-lg resize-none" required/>
                    </div>
                </div>
                <div className="mt-2">
                    <input className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-slate-800 checked:bg-slate-800 checked:before:bg-slate-400 hover:before:opacity-10" type="checkbox"/>
                    <label className="pl-2 pb-2">ท่านยินยอมให้ทางเราเก็บข้อมูลส่วนตัวเพื่อนำไปใช้เป็นข้อมูลในการคัดกรองการหาบ้านให้น้อง</label>
                </div>
                <div className="flex justify-end">
                    <button className="cursor-pointer mt-1 p-3 rounded-2xl bg-black text-white" type="submit">ยืนยันการรับเลี้ยง</button>
                </div> 
            </form>
        </div>
        
        </>
    )
}

// กดปุ๊บขึ้นข้อความในกรอบว่า "ขอบคุณที่รับเลี้ยงหนู หวังว่าเราจะได้เป็นครอบครัวเดียวกัน"


// type Requester = {
//     idCard: string;
//     phone: string;
//     fb: string;
//     experience: string;
//     reason: string;
// }

// export type Request = {
//     _id: string;
//     requester: Requester;
//     animals: string[];
// }