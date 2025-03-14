export function TableRow({ title, value }: { title: string; value: string|React.ReactNode }){
    return (
        <tr>
            <th className="line-clamp-1 align-top font-semibold text-base md:text-lg whitespace-nowrap w-auto ">{title}</th>
            <td className="align-top">:</td>
            <td className="line-clamp-1 opacity-80 sm:text-base text-sm break-all">{value}</td>
        </tr>
    )
}