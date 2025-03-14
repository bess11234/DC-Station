import { JSX, ReactNode } from "react";

interface Props {
    title: JSX.Element;
    children: ReactNode
    OptionComponentOnTitle?: JSX.Element;
}

export function GuestComponent({ title, children, OptionComponentOnTitle }: Props) {
    return (
        <>
            {/* Title */}
            <div className="flex flex-col gap-3 w-full place-items-center sm:px-6 py-3">
                <p className="grid md:text-5xl sm:text-4xl xs:text-3xl text-2xl text-center my-3 md:space-y-3">{title}</p>
                {OptionComponentOnTitle ?? ""}
            </div>

            {/* Content */}
            {children}
        </>
    )
}