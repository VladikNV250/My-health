import Image from "next/image";
import { Icon, IconType } from "@/icons";
import clsx from "clsx";
import { Exercise } from "@/data";

interface IconsMenuProps {
  opened: boolean,
  setOpened: Function,
  targetID: string,
  exercises: Exercise[],
  setExercises: Function,
}

export default function IconsMenu({opened, setOpened, targetID, exercises, setExercises}: IconsMenuProps) {
    function changeIcon(target: IconType) {
      const targetExercise = exercises.find(exercise => exercise.id == targetID);
      if (targetExercise) targetExercise.icon = Icon[target];
      setOpened(false);
      setExercises(exercises);
    }

    return (
        <div 
          className={clsx(
           "absolute top-0 left-0 z-30 w-screen h-full bg-neutral-800 bg-opacity-50 flex justify-center items-center", 
           !opened && 'hidden'
          )}
          onClick={() => setOpened(false)}
        >
            <div onClick={(event) => event.stopPropagation()} className="grid grid-cols-3 gap-x-5 gap-y-3 auto-rows-max w-max h-max max-w-96 bg-white rounded-[30px] py-4 px-5">
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.Dumb}
                  width={80}
                  height={80}
                  alt="Dumb"
                  onClick={() => changeIcon('Dumb')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.Ball}
                  width={80}
                  height={80}
                  alt="Ball"
                  onClick={() => changeIcon('Ball')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.Cycling}
                  width={80}
                  height={80}
                  alt="Cycle"
                  onClick={() => changeIcon('Cycling')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.Expander}
                  width={80}
                  height={80}
                  alt="Expander"
                  onClick={() => changeIcon('Expander')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.PullUp}
                  width={80}
                  height={80}
                  alt="Pull-up"
                  onClick={() => changeIcon('PullUp')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.PushUp}
                  width={80}
                  height={80}
                  alt="Push-ups"
                  onClick={() => changeIcon('PushUp')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.Run}
                  width={80}
                  height={80}
                  alt="Run"
                  onClick={() => changeIcon('Run')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.Swim}
                  width={80}
                  height={80}
                  alt="Swim"
                  onClick={() => changeIcon('Swim')}
                />
              </div>
              <div className="p-2 rounded-[15px] bg-neutral-200 w-fit h-fit">
                <Image
                  src={Icon.WarmUp}
                  width={80}
                  height={80}
                  alt="Warm-up"
                  onClick={() => changeIcon('WarmUp')}
                />
              </div>
            </div>
        </div>
    )
}