import { ReactNode } from "react";

export function TableRow({ title, value }: { title: string; value: string|ReactNode }){
    return (
        <tr>
            <th className="align-top font-semibold text-lg whitespace-nowrap w-auto">{title}</th>
            <td className="align-top">:</td>
            <td className="sm:line-clamp-1 line-clamp-3 opacity-80 sm:text-base text-sm">{value}</td>
        </tr>
    )
}