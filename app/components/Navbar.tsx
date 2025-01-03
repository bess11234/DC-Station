import Link from "next/link";
import Image from "next/image";

function Navbar() {
    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur-sm">
            <div className="max-w-8xl mx-auto">
                <div className="py-4 lg:px-8 lg:mx-0 mx-4 border-b">
                    <div className="relative grid grid-cols-3 place-items-center">
                        {/* Left side */}
                        <Link
                            className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
                            href="/"
                        >
                            <div className="relative flex items-center space-x-2">
                                <Image src="/favicon.ico" width={40} height={40} alt="Logo of Dogs and Cats" />
                                <h3 className="">Project House for Dogs and Cats</h3>
                            </div>
                        </Link>

                        {/* Center side */}
                        <div className="flex space-x-3">
                            <Link href="#" className="link-color">
                                <span>Animals</span>
                            </Link>
                            <Link href="#" className="link-color">
                                <span>Forms</span>
                            </Link>
                            <Link href="#" className="link-color">
                                <span>Contacts</span>
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="flex space-x-3">
                            {/* <Link href="#">
                                <span>1</span>
                            </Link>
                            <Link href="#">
                                <span>2</span>
                            </Link>
                            <Link href="#">
                                <span>3</span>
                            </Link> */}
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Navbar;
