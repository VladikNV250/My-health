import dumb from "./../public/dumbbell.png";
import cycling from "./../public/cycling.png";
import expander from "./../public/expander.png";
import pullUp from "./../public/pull-up.png";
import pushUps from "./../public/push-ups.png";
import running from "./../public/running.png";
import swimming from "./../public/swimming.png";
import volleyball from "./../public/volleyball.png";
import warmUp from "./../public/warm-up.png";

export type IconType = 'Dumb' | 'Cycling' | 'Expander' | 'PullUp' | 'PushUp' | 'Run' | 'Swim' | 'Ball' | 'WarmUp'
export const Icon = {
    'Dumb': dumb.src,
    'Cycling': cycling.src,
    'Expander': expander.src,
    'PullUp': pullUp.src,
    'PushUp': pushUps.src,
    'Run': running.src,
    'Swim': swimming.src,
    'Ball': volleyball.src,
    'WarmUp': warmUp.src,
}