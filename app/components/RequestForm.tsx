'use client'
import { useState } from 'react';
import { useActionState } from 'react';
import {createRequest, RequestState} from '@/app/lib/action';
import  SuccessModal from './SuccessModel';

export function RequestForm({animalId}: {animalId : string}) {
    const initialState: RequestState = {message: null, errors: {}};
    const [state, formAction] = useActionState(async (prevState: RequestState, formData: FormData) => {
        const response = await createRequest(prevState, formData);
        if (!response.errors) {
            setFormData({ // Reset form
                idCard: "",
                phone: "",
                fb: "",
                experience: "",
                reason: "",
                accept: false
        });
        setShowModal(true);
    }return response;}, initialState);

    const [formData, setFormData] = useState({
        idCard: "",
        phone: "",
        fb: "",
        experience: "",
        reason: "",
        accept: false
    });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
        {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
        <div className="w-full h-fit border-1 border-dashed p-10 rounded-2xl">
            <p className="mb-5 flex justify-center text-3xl font-bold">ฟอร์มการขอรับเลี้ยง</p>
            <form action={formAction}>
                <input type="hidden" name="animalId" value={animalId} />
                <div className="flex flex-col gap-5">
                   <div className="flex gap-4">
                        {/* รหัสบัตรประชาชน */}
                        <div className="flex flex-col w-1/2">
                            <label>รหัสบัตรประชาชน: <span className="text-red-600">*</span></label>
                            <input name="idCard" className="px-2 h-10 rounded-lg" type="text" maxLength={13} aria-describedby="idCard-error"
                            value={formData.idCard}
                            onChange={handleChange}
                            />
                            <div id="idCard-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.idCard &&
                                state.errors.idCard.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>

                        {/* หมายเลขโทรศัพท์ */}
                        <div className="flex flex-col w-1/2">
                            <label>หมายเลขโทรศัพท์: <span className="text-red-600">*</span></label>
                            <input name="phone"  className="px-2 h-10 rounded-lg" type="text" maxLength={10} aria-describedby="phone-error"
                            value={formData.phone}
                            onChange={handleChange}/>
                            <div id="phone-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.phone &&
                                state.errors.phone.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* facebook */}
                    <div className="flex flex-col">
                        <label>ชื่อ/ลิงค์ facebook: <span className="text-red-600">*</span></label>
                        <input name="fb"  className="px-2 h-10 rounded-lg" type="text" aria-describedby="fb-error"
                        value={formData.fb}
                        onChange={handleChange}/>
                        <div id="fb-error" aria-live='polite' aria-atomic="true">
                            {state.errors?.fb &&
                            state.errors.fb.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                            ))}

                        </div>
                    </div>
                    {/* ประสบการณ์ */}
                    <div className="flex flex-col">
                        <label>ประสบการณ์การเลี้ยงสัตว์:</label>
                        <textarea name="experience" className="px-2 pt-2 h-20 rounded-lg resize-none"
                        value={formData.experience}
                        onChange={handleChange}/>
                    </div>
                    {/* เหตุผล */}
                    <div className="flex flex-col">
                        <label>เหตุผลในการขอรับเลี้ยงน้อง: <span className="text-red-600">*</span></label>
                        <textarea name="reason"  className="px-2 pt-2 h-20 rounded-lg resize-none" aria-describedby="reason-error"
                        value={formData.reason}
                        onChange={handleChange}/>
                        <div id="reason-error" aria-live='polite' aria-atomic="true">
                            {state.errors?.reason &&
                            state.errors.reason.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <input name="accept" type="checkbox" aria-describedby="accept-error"/>
                    <label className="pl-2 pb-2">ท่านยินยอมให้ทางเราเก็บข้อมูลส่วนตัวเพื่อนำไปใช้เป็นข้อมูลในการคัดกรองการหาบ้านให้น้อง</label>
                    <div id="accept-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.accept &&
                        state.errors.accept.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="cursor-pointer mt-1 p-3 rounded-2xl bg-black text-white" type="submit">ยืนยันการรับเลี้ยง</button>
                </div> 
            </form>
        </div>
        </>
    )
}