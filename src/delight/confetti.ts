import confetti from 'canvas-confetti';
import { delightContainer } from './container';

export const getConfetti = (duration: number): void => {
	const end = Date.now() + 400;

	let confettiCanvas: HTMLCanvasElement | null = document.createElement('canvas');
	confettiCanvas.style.width = '100%';
	confettiCanvas.style.height = '100%';

	let container: HTMLDivElement | null = delightContainer({});
	container.append(confettiCanvas);
	document.body.prepend(container);

	const myConfetti = confetti.create(confettiCanvas, {
		resize: true,
		useWorker: false,
	});

	myConfetti({
		origin: { x: 0.5, y: 0.6 },
		particleCount: 100,
		spread: 180,
		ticks: 90,
	});

	const randomInRange = (min: number, max: number) =>
		Math.random() * (max - min) + min;

	const randomConfetti = setInterval(() => {
		const timeLeft = end - Date.now();
		if (timeLeft <= 0) {
			clearInterval(randomConfetti);
			return;
		}
		myConfetti({
			angle: 60,
			origin: { x: randomInRange(0.1, 0.9), y: Math.random() },
			particleCount: 80,
			spread: 55,
			ticks: 90,
		});
		myConfetti({
			angle: 120,
			origin: { x: randomInRange(0.1, 0.9), y: Math.random() },
			particleCount: 80,
			spread: 55,
			ticks: 90,
		});
	}, 100);

	setTimeout(() => {
		myConfetti({
			origin: { x: 0.5, y: 0.4 },
			particleCount: 400,
			spread: 400,
			ticks: 90,
		});
	}, 300);

	setTimeout(() => {
		myConfetti.reset();
		container?.remove();
		confettiCanvas = null;
		container = null;
	}, duration);
};