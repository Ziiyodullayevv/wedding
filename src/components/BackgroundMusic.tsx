import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		// 1. Boshlang‘ich sozlamalar
		audio.loop = true;
		audio.volume = 0.5;
		audio.muted = true;

		// 2. Tovushsiz autoplay
		audio.play().catch(() => {
			console.log("Autoplay tovushsiz boshlandi yoki bloklandi...");
		});

		// 3. Foydalanuvchi harakati bo‘lsa tovushni yoqish
		const enableSound = () => {
			if (!audio) return;
			audio.muted = false;

			// sekin fade-in effekti
			let volume = 0;
			const fade = setInterval(() => {
				if (volume < 0.5) {
					volume += 0.05;
					audio.volume = volume;
				} else {
					clearInterval(fade);
				}
			}, 200);

			audio.play().then(() => console.log("🎵 Musiqa tovush bilan yoqildi!"));
			window.removeEventListener("click", enableSound);
			window.removeEventListener("touchstart", enableSound);
			window.removeEventListener("scroll", enableSound);
		};

		window.addEventListener("click", enableSound);
		window.addEventListener("touchstart", enableSound);
		window.addEventListener("scroll", enableSound);

		return () => {
			window.removeEventListener("click", enableSound);
			window.removeEventListener("touchstart", enableSound);
			window.removeEventListener("scroll", enableSound);
		};
	}, []);

	return (
		<audio
			ref={audioRef}
			src="/music.mp3" // ✅ local fayl `public/music.mp3`
			preload="auto"
		/>
	);
}
