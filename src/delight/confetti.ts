import confetti from 'canvas-confetti';
import { delightContainer } from './container';

export const getConfetti = (duration: number): void => {
	const end = Date.now() + 400;

	let confettiCanvas: HTMLCanvasElement | null = createEl('canvas', { cls: 'delightCanvas' });

	let container: HTMLDivElement | null = delightContainer({});
	container.append(confettiCanvas);
	document.body.prepend(container);

	const myConfetti = confetti.create(confettiCanvas, {
		resize: true,
		useWorker: false,
	});

	void myConfetti({
		origin: { x: 0.5, y: 0.6 },
		particleCount: 100,
		spread: 180,
		ticks: 90,
	});

	const randomInRange = (min: number, max: number) =>
		Math.random() * (max - min) + min;

	const randomConfetti = window.setInterval(() => {
		const timeLeft = end - Date.now();
		if (timeLeft <= 0) {
			window.clearInterval(randomConfetti);
			return;
		}
		void myConfetti({
			angle: 60,
			origin: { x: randomInRange(0.1, 0.9), y: Math.random() },
			particleCount: 80,
			spread: 55,
			ticks: 90,
		});
		void myConfetti({
			angle: 120,
			origin: { x: randomInRange(0.1, 0.9), y: Math.random() },
			particleCount: 80,
			spread: 55,
			ticks: 90,
		});
	}, 100);

	window.setTimeout(() => {
		void myConfetti({
			origin: { x: 0.5, y: 0.4 },
			particleCount: 400,
			spread: 400,
			ticks: 90,
		});
	}, 300);

	window.setTimeout(() => {
		myConfetti.reset();
		container?.remove();
		confettiCanvas = null;
		container = null;
	}, duration);
};