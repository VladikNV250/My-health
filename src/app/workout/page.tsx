// [id]

import Display from "@/components/display";
import Navbar from "@/components/navbar";

export default function Page() {
    return (
        <main className="relative flex flex-col items-center bg-gray-200 w-screen min-h-screen pl-96 pr-20 py-24">
            <h1 className="text-3xl font-bold absolute top-8">Let's do it!</h1>
            <Navbar />
            <Display />
            <p className="time text-4xl font-medium mt-16">00:00</p>
            <div className="display_btn flex justify-between items-center mt-8">
                <button className="flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-l-full px-4 py-2">
                    <p>Start the exercise</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play-fill text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                    </svg>
                </button>
                <button className="flex justify-between items-center space-x-3 bg-white border-y-2 border-main-500 px-4 py-2">
                    <p>Pause the exercise</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pause text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
                <button className="flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-4 py-2">
                    <p>Finish Workout</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                </button>
            </div>
        </main>
    )
}