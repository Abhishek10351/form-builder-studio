"use client";

import { Button } from "@/components/ui/button";
import canvasConfetti from 'canvas-confetti';

interface ConfettiPublishButtonProps {
    published: boolean;
    onClick: () => void;
}

export function ConfettiPublishButton({ published, onClick }: ConfettiPublishButtonProps) {
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!published) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            canvasConfetti({
                particleCount: 120,
                spread: 100,
                scalar: 0.8,
                origin: {
                    x: x / window.innerWidth,
                    y: y / window.innerHeight,
                },
            });
        }
        
        onClick();
    };

    return (
        <Button
            onClick={handleClick}
            size="lg"
            className={`ml-4 font-semibold transition-all cursor-pointer duration-200 ${
                !published
                    ? "bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {published ? "Unpublish" : "Publish Form"}
        </Button>
    );
}
