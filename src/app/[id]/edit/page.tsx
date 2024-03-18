"use client"
import IconsMenu from "@/components/iconsmenu";
import Navbar from "@/components/navbar";
import Exercise from "@/components/exercise";
import { Exercise as ExerciseType, Workout } from "@/data";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Icon } from "@/icons";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [editWorkout, setEditWorkout] = useState<Workout | null>(null);
    const [exercises, setExercises] = useState<ExerciseType[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [targetID, setTargetID] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const space = /%20/g;
        const workoutName = params.id.replace(space, ' ');
        const workouts = JSON.parse(localStorage.getItem('workouts') as string)
        let workout: Workout | null = null;
        if (workouts) workout = workouts[workoutName];
        if (workout) {
            setEditWorkout({
                name: workout.name,
                breakInterval: workout.breakInterval,
                duration: workout.duration,
                exercises: workout.exercises,
                log: workout.log,
                creationDate: workout.creationDate,
            })
            setExercises(workout.exercises);
        }
    }, [])

    function handleSubmit(e: any) {
        // Prevent the browser from reloading the page
        e.preventDefault();


        function isValidTime(time: string): boolean {
            const regEx = /^([0-9][0-9]:[0-9][0-9])/i;
            if (!regEx.test(time))
                return false;
            if (time === '')
                return false;
            const [minutes, seconds] = time.split(':');
            if (+minutes === 0 && +seconds === 0)
                return false;
            return true;
        }

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        try {
            if (formJson.name === '')
                throw new Error('workout name is empty');
        } catch (error) {
            console.log(error);
            setError('workout-name');
            return;
        }
        try {
            if (formJson.duration === '' || +formJson.duration === 0)
                throw new Error('wrong duration');
        } catch (error) {
            console.log(error);
            setError('duration');
            return;
        }
        try {
            if (!isValidTime(formJson.breakInterval as string))
                throw new Error('not valid break interval');
        } catch (error) {
            console.log(error);
            setError('breakInterval');
            return;
        }
        try {
            exercises.forEach(exercise => {
                if (exercise.name === '')
                    throw new Error(`${exercise.id} - name is empty`);
                if (!isValidTime(exercise.time))
                    throw new Error(`${exercise.id} - wrong time`);
            })
        } catch (error) {
            console.log(error);
            setError('exercises');
            return;
        }

        const workouts = JSON.parse(localStorage.getItem('workouts') as string);
        try {
            if (formJson.name !== editWorkout?.name) {
                const oldWorkout = workouts[formJson.name as string]
                if (oldWorkout) throw new Error('That workout has already existed')
            }
        } catch (error) {
            console.log(error);
            setError('workout-name-exist');
            return;
        }
        const workout = {
            name: formJson.name,
            breakInterval: formJson.breakInterval,
            duration: formJson.duration,
            exercises: exercises,
            log: editWorkout?.log,
            creationDate: editWorkout?.creationDate,
        }
        delete workouts[editWorkout?.name as string];
        workouts[formJson.name as string] = workout;
        localStorage.setItem('workouts', JSON.stringify(workouts))
        setError('');
        router.push('/');
    }

    function addExercise() {
        const lastExerciseID = exercises[exercises.length - 1].id;
        const newExercise = { icon: Icon.Ball, name: 'Exercise 1', time: '00:30', id: `ex-${+lastExerciseID.split('-')[1] + 1}` }
        setExercises([...exercises, newExercise]);
    }

    function changeBreakTime(target: HTMLInputElement, value: string) {
        const regEx = /[A-Za-z]+/i
        if (regEx.test(value)) {
            target.value = '00:00';
            return;
        }
        if (!value.includes(':')) {
            target.value = '00:00';
            return;
        }

        const [minutes, seconds] = value.split(':');
        if (seconds.length > 2 || +seconds >= 60)
            target.value = `${minutes}:00`;
        if (minutes === '')
            target.value = `00:${seconds}`;
        if (seconds === '')
            target.value = `${minutes}:00`;
    }

    function changeDuration(target: HTMLInputElement, value: string) {
        const regEx = /[A-Za-z]+/i
        if (regEx.test(value)) {
            target.value = '00';
            return;
        }
    }

    return (
        <main className="relative bg-gray-200 w-screen min-h-screen pl-96 pr-20 py-24">
            <IconsMenu
                opened={isOpen}
                setOpened={setIsOpen}
                targetID={targetID}
                exercises={exercises}
                setExercises={setExercises}
            />
            <Navbar />
            <h2 className="absolute left-1/2 top-8 font-bold text-3xl">Workout Editor</h2>
            <form onSubmit={handleSubmit} className="ml-32 mt-24 pr-52 space-y-12">
                <div className="name space-y-4">
                    <h4 className="text-lg ml-3">Workout name</h4>
                    <input defaultValue={editWorkout?.name} type="text" name="name" id="name" className="outline-remove w-full text-lg py-1 px-3 border-2 border-main-500" />
                    <div
                        className={clsx(
                            "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
                            error !== 'workout-name' && 'hidden',
                        )}
                    >
                        Empty input
                    </div>
                    <div
                        className={clsx(
                            "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
                            error !== 'workout-name-exist' && 'hidden',
                        )}
                    >
                        This workout name has been already taken
                    </div>
                </div>
                <div className="exercises space-y-4">
                    <h4 className="text-lg ml-3">Exercises</h4>
                    <div
                        className={clsx(
                            "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
                            error !== 'exercises' && 'hidden'
                        )}
                    >
                        Some errors in exercises input
                    </div>
                    {exercises.map((exercise, index) => (
                        <Exercise
                            icon={exercise.icon}
                            name={exercise.name}
                            time={exercise.time}
                            id={exercise.id}
                            exercises={exercises}
                            setExercises={setExercises}
                            setIsOpen={setIsOpen}
                            setTargetID={setTargetID}
                            key={index}
                        />
                    ))}
                    <button type="button" onClick={addExercise} className="add-exercise flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-3 py-0.5" >
                        <p className="text-base">Add Exercise</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus text-main-500 mt-0.5" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3">
                    <div className="break-interval flex justify-between items-center">
                        <h4 className="text-lg ml-3">Interval between exercises</h4>
                        <div className="settimer w-[65px] flex border-2 border-main-500">
                            <input
                                onChange={event => changeBreakTime(event.target, event.target.value)}
                                type="text"
                                name="breakInterval"
                                id="breakInterval"
                                defaultValue={editWorkout?.breakInterval}
                                className="outline-remove w-full text-end px-1"
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
                            error !== 'breakInterval' && 'hidden'
                        )}
                    >
                        Wrong time input
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="duration flex justify-between items-center">
                        <h4 className="text-lg ml-3">Workout duration (Days)</h4>
                        <div className="w-[60px] flex border-2 border-main-500">
                            <input
                                onChange={event => changeDuration(event.target, event.target.value)}
                                type="text"
                                name="duration"
                                id="duration"
                                defaultValue={editWorkout?.duration}
                                className="outline-remove w-full text-end px-1"
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
                            error !== 'duration' && 'hidden'
                        )}>
                        Wrong day input
                    </div>
                </div>
                <button type="submit" className="flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-4 py-2">
                    <p className="text-base">Finish Editing Workout Program</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check text-main-500 mt-0.5" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg>
                </button>
            </form>
        </main>
    )
}