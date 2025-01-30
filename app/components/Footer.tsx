import { HeartIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="p-3 row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <div className="font-medium">
                <span className="font-light">Created by <HeartIcon className="inline-block size-6 text-pink-300 dark:text-pink-200" /> </span>
                @
                <span className="github-user tooltip" data-tip="hello">
                    <div className="tooltip-content rounded-lg">
                        <div className="flex p-1 gap-3 items-center rounded-lg">
                            <Image
                                src="/github/bess11234.webp"
                                height={56}
                                width={56}
                                alt="Profile of bess11234."
                                className="rounded-full"
                            />
                            <p className="text-left">bess11234<br /><span className="text-sm opacity-70">kasomsri · Software E.</span></p>
                        </div>
                    </div>
                    bess11234
                </span>,
                @
                <span className="github-user tooltip" data-tip="hello">
                    <div className="tooltip-content rounded-lg">
                        <div className="flex p-1 gap-3 items-center rounded-lg">
                            <Image
                                src="/github/KKMAI.webp"
                                height={56}
                                width={56}
                                alt="Profile of KKMAI."
                                className="rounded-full"
                            />
                            <p className="text-left">Khotchakor K.<br /><span className="text-sm opacity-70">KKMAI · Software E.</span></p>
                        </div>
                    </div>
                    Khotchakorn Krutvecho
                </span>.
            </div>
        </footer>
    )
}