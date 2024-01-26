'use client';

import { Button, Slider } from '@nextui-org/react';
import { useState } from 'react';

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

export default function RandomChoicePage() {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [choice, setChoice] = useState(defaultChoice);

    const onFindOut = () => {
        setChoice(pickRandomChoice());
        setButtonClicked(true);
    };

    return (
        <main className="flex flex-col items-center gap-12 p-8">
            <h1 className="text-center text-5xl">Should you change your job?</h1>
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
