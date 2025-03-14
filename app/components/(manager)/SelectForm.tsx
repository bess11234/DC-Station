import { ChangeEvent } from "react";

interface Option {
    label: string;
    value: string;
}

interface Props {
    id: string;
    name: string;
    label: string;
    required: boolean;
    options: Option[];
    defaultValue?: string;
    onChangeInput: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectForm({ id, name, label, required, defaultValue, options, onChangeInput }: Props) {
    return (
        <div className="grid">
            <label className="text-2xl py-3" htmlFor={id}>{label}: {required ? <span className="text-red-500">*</span> : ""}</label>
            <select className="*:bg-white *:dark:bg-black2 p-3 w-full rounded-xl input-focus-theme" onChange={onChangeInput} defaultValue={defaultValue} name={name} id={id} required={required}>
                {options.map((v, i) => (
                    <option key={id+i} value={v.value}>{v.label}</option>
                ))}
            </select>
        </div>
    )
}