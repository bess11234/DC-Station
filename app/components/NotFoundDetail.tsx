import Link from "next/link";

import { FaceFrownIcon } from "@heroicons/react/24/outline";

export function NotFoundDetail({ title, backUrl }: { title: string, backUrl: string }) {
    return (
        <div className="flex m-auto flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>{title}</p>
            <Link
                href={backUrl}
                className="mt-4 rounded-md px-4 py-2 text-sm transition-colors button-theme"
            >
                ย้อนกลับ
            </Link>
        </div>
    )
}