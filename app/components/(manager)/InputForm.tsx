import { ChangeEvent } from "react";

interface Props {
    id: string;
    name: string;
    label: string;
    required: boolean;
    type: string;
    autoComplete?: string;
    defaultValue?: string;
    placeholder?: string;
    max?: string;
    addtionalClass?: string;
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputForm({ id, name, label, required, type, autoComplete, defaultValue, placeholder, max, addtionalClass, onChangeInput }: Props) {
    return (
        <div className={`grid ${addtionalClass ?? ""}`}>
            <label className="text-2xl py-3" htmlFor={id}>{label}: {required ? <span className="text-red-500">*</span> : ""}</label>
            <input className="p-3 w-full rounded-xl input-focus-theme invalid:text-red-500" onChange={onChangeInput} type={type} name={name} id={id} autoComplete={autoComplete} defaultValue={defaultValue} required={required} placeholder={placeholder} max={max ?? ""} />
        </div>
    )
}