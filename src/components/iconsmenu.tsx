import Image from "next/image";
import dumb from "./../../public/dumbbell.png";

export default function IconsMenu() {
    return (
        <div className="absolute top-0 left-0 z-30 w-screen h-lvh bg-neutral-800 bg-opacity-50 flex justify-center items-center">
            <div className="grid grid-cols-3 gap-x-5 gap-y-3 auto-rows-max w-max h-max max-w-96 bg-white rounded-[30px] py-4 px-5">
                <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                    <Image
                      src={dumb.src}
                      width={80}
                      height={80}
                      alt=""
                    />
                </div>
                <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                    <Image
                      src={dumb.src}
                      width={80}
                      height={80}
                      alt=""
                    />
                </div>
                <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                    <Image
                      src={dumb.src}
                      width={80}
                      height={80}
                      alt=""
                    />
                </div>
                <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                    <Image
                      src={dumb.src}
                      width={80}
                      height={80}
                      alt=""
                    />
                </div>
                <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                    <Image
                      src={dumb.src}
                      width={80}
                      height={80}
                      alt=""
                    />
                </div>
                <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                    <Image
                      src={dumb.src}
                      width={80}
                      height={80}
                      alt=""
                    />
                </div>
                <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                    <Image
                      src={dumb.src}
                      width={80}
                      height={80}
                      alt=""
                    />
                </div>
            </div>
        </div>
    )
}