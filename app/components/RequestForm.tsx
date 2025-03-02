'use client'
import { useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { createRequest, RequestState } from '@/app/lib/action';
import { SuccessModal } from '@/app/components/SuccessModel'

export function RequestForm({animalId, animalName, animalSpecie}: {animalId : string; animalName: string, animalSpecie: string}) {
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const initialState: RequestState = { message: null, errors: {} };
    const [isSuccess, setIsSuccess] = useState(false);

    const [state, formAction] = useActionState(async (prevState: RequestState, formData: FormData) => {
        const response = await createRequest(prevState, formData);
    
        if (!isMounted.current) return prevState;
    
        if (!response.errors) {
            setIsSuccess(true);
            setFormData({
                firstname: "",
                lastname: "",
                phone: "",
                email: "",
                fb: "",
                experience: "",
                reason: "",
                accept: false
                    });
        }
        return response;
    }, initialState);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        fb: "",
        experience: "",
        reason: "",
        accept: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
        {isSuccess && <SuccessModal onClose={() => setIsSuccess(false)} name={animalName}/>}
        <div className="w-full h-fit bg-theme-100 dark:bg-theme-950/50 p-10 rounded-2xl shadow-md hover:shadow-lg sm:mx-16 mx-8 dark:shadow-white/5">
            <p className="mb-5 flex justify-center text-3xl font-bold">ฟอร์มการขอรับเลี้ยงน้อง {`"${animalName}${animalSpecie}"`}</p>
            <form action={formAction}>
                <input type="hidden" name="animalId" value={animalId} />
                <div className="flex flex-col">
                <div className="md:flex gap-4">
                        {/* ชื่อจริง */}
                        <div className="flex flex-col md:w-1/2 mb-5">
                            <label>ชื่อจริง: <span className="text-red-600">*</span></label>
                            <input name="firstname" className="bg-theme-200 dark:bg-theme-900/50 shadow-inner px-2 h-10 rounded-lg border-0" type="text" aria-describedby="firstname-error"
                            value={formData.firstname}
                            onChange={handleChange}
                            />
                            <div id="firstName-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.firstname &&
                                state.errors.firstname.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>

                        {/* นามสกุล */}
                        <div className="flex flex-col md:w-1/2 mb-5">
                            <label>นามสกุล: <span className="text-red-600">*</span></label>
                            <input name="lastname" className="bg-theme-200 dark:bg-theme-900/50 shadow-inner px-2 h-10 rounded-lg border-0" type="text" aria-describedby="lastname-error"
                            value={formData.lastname}
                            onChange={handleChange}/>

                            <div id="lastname-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.lastname &&
                                state.errors.lastname.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        {/* หมายเลขโทรศัพท์ */}
                        <div className="flex flex-col md:w-1/2 mb-5">
                            <label>หมายเลขโทรศัพท์: <span className="text-red-600">*</span></label>
                            <input name="phone" className="bg-theme-200 dark:bg-theme-900/50 shadow-inner px-2 h-10 rounded-lg border-0" type="text" maxLength={10} aria-describedby="phone-error"
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

                    <div className="md:flex gap-4">
                        {/* Email */}
                        <div className="flex flex-col md:w-1/2 mb-5">
                            <label>อีเมล: <span className="text-red-600">*</span></label>
                            <input name="email" className="bg-theme-200 dark:bg-theme-900/50 shadow-inner px-2 h-10 rounded-lg border-0" type="text" aria-describedby="email-error"
                            value={formData.email}
                            onChange={handleChange}
                            />

                            <div id="email-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col md:w-1/2 mb-5">
                            {/* facebook */}
                            <label>ชื่อ/ลิงค์ facebook: <span className="text-red-600">*</span></label>
                            <input name="fb" className="bg-theme-200 dark:bg-theme-900/50 px-2 h-10 rounded-lg shadow-inner border-0" type="text" aria-describedby="fb-error"
                            value={formData.fb}
                            onChange={handleChange}/>

                            <div id="fb-error" aria-live='polite' aria-atomic="true">
                                {state.errors?.fb &&
                                state.errors.fb.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* ประสบการณ์ */}
                    <div className="flex flex-col mb-5">
                        <label>ประสบการณ์การเลี้ยงสัตว์:</label>
                        <textarea name="experience" className="bg-theme-200 dark:bg-theme-900/50 shadow-inner px-2 pt-2 h-20 rounded-lg resize-none border-0"
                        value={formData.experience}
                        onChange={handleChange}/>
                    </div>

                    {/* เหตุผล */}
                    <div className="flex flex-col mb-5">
                        <label>เหตุผลในการขอรับเลี้ยงน้อง: <span className="text-red-600">*</span></label>
                        <textarea name="reason"  className="bg-theme-200 dark:bg-theme-900/50 shadow-inner px-2 pt-2 h-20 rounded-lg resize-none border-0" aria-describedby="reason-error"
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
                    <input id="check" name="accept" type="checkbox" className="checkbox" aria-describedby="accept-error"/>
                    <label htmlFor="check" className="cursor-pointer pl-2 pb-2">ท่านยินยอมให้ทางเราเก็บข้อมูลส่วนตัวเพื่อนำไปใช้เป็นข้อมูลในการคัดกรองการหาบ้านให้น้อง<span className="text-red-600">*</span></label>
                    <div id="accept-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.accept &&
                        state.errors.accept.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="cursor-pointer mt-1 p-3 px-5 rounded-2xl button-theme-primary" type="submit">ยืนยันการรับเลี้ยง</button>
                </div> 
            </form>
        </div>
        </>
    )
}