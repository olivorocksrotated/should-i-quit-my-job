import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function HomePage() {
    return (
        <>
            <h1 className="mb-6 text-xl">How quickly do you want to make a decision?</h1>

            <article className="mb-4">
                <h2 className="mb-1">Very quickly, without much thought</h2>
                <Link href="/random"><Button>Random choice</Button></Link>
            </article>

            <article className="mb-4">
                <h2 className="mb-1">Somehow slowly, with some reflection</h2>
                <Link href="/story"><Button>Story</Button></Link>
            </article>

            <article className="mb-4">
                <h2 className="mb-1">Slowly and safely</h2>
                <Link href="/journal"><Button>Journal</Button></Link>
            </article>
        </>
    );
}
