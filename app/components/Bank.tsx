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
                    sizes="100vw"
                    width={60}
                    height={60}
                    alt={alt}
                    style={{ width: "60px", height: "60px"}}
                    className="rounded-full shadow-md" />
                <div className="flex flex-col text-sm">
                    <span>{title}</span>
                    <span>สาขาลาดกระบัง</span>
                    <span>เลขที่บัญชี: <span className="select-all border border-theme-300 text-theme-300 rounded-full px-2 text-xs">123-456-7891</span></span>
                </div>
            </div>
        </div>
    )
}