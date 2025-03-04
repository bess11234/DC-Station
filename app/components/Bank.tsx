import Image from "next/image"

export interface BankType {
    title: string;
    src: string;
    alt: string;
}

export function Bank({ title, src, alt }: BankType) {
    return (
        <div className="flex flex-col gap-4 select-none">
            <div className="flex items-center gap-4">
                <Image
                    src={src}
                    width={0}
                    height={0}
                    sizes="100%"
                    alt={alt}
                    className="rounded-full shadow-md sm:size-[60px] size-[50px]" />
                <div className="flex flex-col text-sm">
                    <span>{title}</span>
                    <span>สาขาลาดกระบัง</span>
                    <span>เลขที่บัญชี: <span className="select-all border text-theme-500 rounded-full px-2 text-xs">123-456-7891</span></span>
                </div>
            </div>
        </div>
    )
}