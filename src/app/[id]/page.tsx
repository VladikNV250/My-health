"use client"
import Display from "@/components/display";
import Navbar from "@/components/navbar";
import { Exercise, Workout } from "@/data";
import { Icon } from "@/icons";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page({ params }: { params: {id: string} }) {
    const router = useRouter();
    const [workList, setWorkList] = useState<({ name: string; icon: string; time: string; } | undefined)[]>([]);
    const [displayTime, setDisplayTime] = useState('00:00');
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [timeStatus, setTimeStatus] = useState<'work' | 'stopped'>('stopped');
    const intervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const space = /%20/g;
        const workoutName = params.id.replace(space, ' ');
        const workouts = JSON.parse(localStorage.getItem('workouts') as string)
        let workout: Workout | null = null;
        if (workouts) workout = workouts[workoutName];
        if (workout) {
            setWorkList(workout.exercises.map((exercise, index, exercises) => {
                if (index === exercises.length - 1) {
                    return {icon: exercise.icon, name: exercise.name, time: exercise.time};
                } else {
                    if (workout)
                      return [{icon: exercise.icon, name: exercise.name, time: exercise.time}, {icon: Icon.Break, name: 'Break', time: workout.breakInterval}]
                }
            }).flat())
            setDisplayTime(workout.exercises[0].time);
        }
    }, [])

    useEffect(() => {
        if (isCompleted === true) 
            finishWorkout();
    }, [isCompleted]);

    function nextExercise() {
        stopTime();
        setProgress(0);
        if (index < workList.length - 1) {
            setIndex(index + 1);
            setDisplayTime(workList[index + 1]!.time);
        }
    }

    function finishWorkout() {
        const space = /%20/g;
        const workoutName = params.id.replace(space, ' ');
        const workouts = JSON.parse(localStorage.getItem('workouts') as string)
        let workout: Workout | null = null;
        if (workouts) workout = workouts[workoutName];
        if (workout) {
            workout.log.push(new Date());
            workouts[workoutName] = workout;
            localStorage.setItem('workouts', JSON.stringify(workouts));
            router.push('/');
        }
    }

    function timeIntoProgress(timeLeft: string, initialTime: string): number {
        function turnIntoSecond(time: string): number {
            const [minutes, seconds] = time.split(':');
            return +minutes * 60 + +seconds
        }
        const timeLeftSec: number = turnIntoSecond(timeLeft);
        const initialTimeSec: number = turnIntoSecond(initialTime);

        return (100 - Math.round((timeLeftSec * 100) / initialTimeSec));
    }

    function startTime() {
        const timerID = setInterval(() => Time(), 50);
        intervalRef.current = timerID;
        setTimeStatus('work');
    }

    function stopTime() {
        if (index === workList.length - 1) setIsCompleted(true);
        const timerID = intervalRef.current
        clearInterval(timerID);
        setTimeStatus('stopped');
    }

    function Time() {
        function toCorrectForm(time: string, type: 'min' | 'sec'): string {
            if (time.length === 1) {
                return `0${time}`;
            }
            if (time.length > 2 && type === 'min') {
                return time;
            }
            if (time.length > 2 && type === 'sec') {
                return `${time[-2] + time[-1]}`;
            }
            return time;
        }
        const currentTime = workList[index]!.time;
        let [minutes, seconds] = currentTime.split(':');
        if (+seconds === 0 && +minutes === 0) {
            workList[index]!.time = `${minutes}:${seconds}`;
            setWorkList(workList);
            setDisplayTime(`${minutes}:${seconds}`);
            nextExercise();
            setProgress(0);
            return;
        }
        if (+seconds !== 0) {
            seconds = toCorrectForm(`${+seconds - 1}`, 'sec');
            workList[index]!.time = `${minutes}:${seconds}`;
            setWorkList(workList);
            setDisplayTime(`${minutes}:${seconds}`);
            setProgress(timeIntoProgress(`${minutes}:${seconds}`, displayTime))
            return;
        }
        if (+seconds === 0 && +minutes !== 0) {
            minutes = toCorrectForm(`${+minutes - 1}`, 'min');
            seconds = `59`;
            workList[index]!.time = `${minutes}:${seconds}`;
            setWorkList(workList);
            setDisplayTime(`${minutes}:${seconds}`);
            setProgress(timeIntoProgress(`${minutes}:${seconds}`, displayTime))            
            return;
        }
    }




    return (
        <main className="relative flex flex-col items-center bg-gray-200 w-screen min-h-screen pl-96 pr-20 py-24">
            <h1 className="text-3xl font-bold absolute top-8">Let's do it!</h1>
            <Navbar />
            <Display icon={workList[index]?.icon as string} progress={progress}/>
            <p className="text-4xl font-medium mt-10">{workList[index]?.name}</p>
            <p className="time text-4xl font-medium mt-16">{displayTime}</p>
            <div className="display_btn flex justify-between items-center mt-8">
                <button 
                  onClick={startTime} 
                  className={clsx(
                    "justify-between items-center space-x-3 border-2 border-main-500 rounded-l-full px-4 py-2",
                    timeStatus === 'stopped' && 'flex',
                    timeStatus === 'work' && 'hidden',
                    isCompleted && 'bg-neutral-300',
                    !isCompleted && 'bg-white',
                  )} 
                  disabled={isCompleted}
                >
                    <p>Start the exercise</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play-fill text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                    </svg>

                </button>
                <button
                    onClick={stopTime}
                    className={clsx(
                        "justify-between items-center space-x-3 border-2 border-main-500 rounded-l-full px-4 py-2",
                        timeStatus === 'work' && 'flex',
                        timeStatus === 'stopped' && 'hidden',
                        isCompleted && 'bg-neutral-300',
                        !isCompleted && 'bg-white',
                    )}
                    disabled={isCompleted}
                >
                    <p>Pause the exercise</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pause text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
                <button 
                  onClick={nextExercise} 
                  className={clsx(
                    "flex justify-between items-center space-x-3 border-y-2 border-main-500 px-4 py-2",
                    isCompleted && 'bg-neutral-300',
                    !isCompleted && 'bg-white',
                  )} 
                  disabled={isCompleted}
                >
                    <p>Skip the exercise</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-skip-end text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0zM5 4.633 10.804 8 5 11.367z"/>
                    </svg>
                </button>
                <button onClick={finishWorkout} className="flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-4 py-2">
                    <p>Finish Workout</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                </button>
            </div>
        </main>
    )
}