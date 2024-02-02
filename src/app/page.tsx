'use client';

import { Button, Slider } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

interface Choice {
    name: string;
    value: number;
}

const defaultChoice: Choice = {
    name: 'No way, Jose',
    value: 0
};

const choices: Choice[] = [
    defaultChoice,
    { name: 'Not convinced', value: 25 },
    { name: 'Perhaps', value: 50 },
    { name: 'Probably', value: 75 },
    { name: 'Hell yeah', value: 100 }
];

const pickRandomChoice = (): Choice => {
    const randomChoiceNumber = Math.floor(Math.random() * choices.length);

    return choices[randomChoiceNumber];
};

const title = 'Should you change your job?';

export default function RandomChoicePage() {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [choice, setChoice] = useState(defaultChoice);

    const [animatedTitle, setAnimatedTitle] = useState(title.split('').map((char) => ({
        char,
        isShowing: false
    })));

    const animationRoundsLimit = 3;
    const [animationRounds, setAnimationRounds] = useState(0);
    const [updateInterval, setUpdateInterval] = useState<number | null>(50);

    const onTick = () => {
        const isEveryCharFilled = animatedTitle.every(({ isShowing }) => isShowing);
        if (isEveryCharFilled) {
            setAnimationRounds((value) => value + 1);
        }
        if (animationRounds === animationRoundsLimit) {
            setUpdateInterval(() => null);
        }

        const updatedTitle = structuredClone(animatedTitle);

        const isFirstCharFilled = updatedTitle[0].isShowing;
        const isLastCharFilled = updatedTitle[updatedTitle.length - 1].isShowing;
        const fromStartToEnd =
            !isFirstCharFilled && !isLastCharFilled ? true :
            isFirstCharFilled && isLastCharFilled ? false :
            isFirstCharFilled && !isLastCharFilled ? true :
            !isFirstCharFilled && isLastCharFilled ? false : null;

        for (const entry of updatedTitle) {
            if (fromStartToEnd && !entry.isShowing) {
                entry.isShowing = true;
                break;
            }

            if (!fromStartToEnd && entry.isShowing) {
                entry.isShowing = false;
                break;
            }
        }

        setAnimatedTitle(() => updatedTitle);
    };

    useInterval(onTick, updateInterval);

    const onFindOut = () => {
        setChoice(pickRandomChoice());
        setButtonClicked(true);
    };

    return (
        <main className="flex flex-col items-center gap-12 p-8">
            <h1 className="text-center text-4xl">
                {animatedTitle.map(({ char, isShowing }, index) => (
                    <span
                        key={index}
                        className={clsx(
                            'font-light transition-[all] duration-500 ease-in',
                            { 'text-indigo-300': isShowing }
                        )}
                    >
                        {char}
                    </span>
                ))}
            </h1>
            <Button
                size="lg"
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={onFindOut}
            >
                Find out!
            </Button>
            {buttonClicked && choice ?
                <div className="flex w-full flex-col items-center gap-10">
                    <h2 className="text-2xl">{choice.name}</h2>
                    <Slider
                        aria-label="Result"
                        size="lg"
                        color="success"
                        startContent={<h3>Nope</h3>}
                        endContent={<h3>Yes</h3>}
                        className="max-w-md"
                        defaultValue={0}
                        value={choice.value}
                    />
                </div> : null}
        </main>
    );
}
