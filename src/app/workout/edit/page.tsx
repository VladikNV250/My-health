import Exercise from "@/components/exercise";
import IconsMenu from "@/components/iconsmenu";
import Navbar from "@/components/navbar";

export default function Page() {
    return (
        <main className="relative bg-gray-200 w-screen min-h-screen pl-96 pr-20 py-24">
            {/* <IconsMenu /> */}
            <Navbar />
            <h2 className="absolute left-1/2 top-8 font-bold text-3xl">Workout Editor</h2>
            <form className="ml-32 mt-24 pr-52 space-y-12">
                <div className="name space-y-4">
                    <h4 className="text-lg ml-3">Workout name</h4>
                    <input type="text" name="name" id="name" className="outline-remove w-full text-lg py-1 px-3 border-2 border-main-500" />
                </div>
                <div className="exercises space-y-4">
                    <h4 className="text-lg ml-3">Exercises</h4>
                    <Exercise icon="dumb" name="Exercise 1" time="00:30" id="ex-1" />
                    <Exercise icon="dumb" name="Exercise 2" time="00:30" id="ex-2" />
                    <Exercise icon="dumb" name="Exercise 3" time="00:30" id="ex-3" />
                    <Exercise icon="dumb" name="Exercise 4" time="00:30" id="ex-4" />
                    <Exercise icon="dumb" name="Exercise 5" time="00:30" id="ex-5" />
                    <button className="add-exercise flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-3 py-0.5" >
                        <p className="text-base">Add Exercise</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus text-main-500 mt-0.5" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </button>
                </div>
                <div className="break-interval flex justify-between items-center">
                    <h4 className="text-lg ml-3">Interval between exercises</h4>
                    <div className="settimer w-[85px] flex border-2 border-main-500">
                        <input
                            type="text"
                            name="break-interval"
                            id="break-interval"
                            value={'00:00'}
                            className="outline-remove w-[60px] text-end px-1"
                        />
                        <div className="w-[25px] flex flex-col justify-between items-center">
                            <button className="up w-full h-1/2 pt-0.5 flex items-start justify-center bg-neutral-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                </svg>
                            </button>
                            <div className="hr w-full h-0.5 bg-neutral-600" />
                            <button className="down w-full h-1/2 pb-0.5 flex items-end justify-center bg-neutral-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="duration flex justify-between items-center">
                    <h4 className="text-lg ml-3">Workout duration (Days)</h4>
                    <div className="w-[60px] flex border-2 border-main-500">
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            value={'00'}
                            className="outline-remove w-7/12 text-end px-1"
                        />
                        <div className="w-5/12 flex flex-col justify-between items-center">
                            <button className="up w-full h-1/2 pt-0.5 flex items-start justify-center bg-neutral-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                </svg>
                            </button>
                            <div className="hr w-full h-0.5 bg-neutral-600" />
                            <button className="down w-full h-1/2 pb-0.5 flex items-end justify-center bg-neutral-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <button type="submit" className="flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-4 py-2">
                    <p className="text-base">Create Workout Program</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg>
                </button>
            </form>
        </main>
    )
}