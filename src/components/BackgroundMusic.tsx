import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		// Muted holatda autoplay ishlaydi
		audio.muted = true;
		audio.play().catch(() => {
			// brauzer bloklasa, muammo yo‘q — keyin unmute qilamiz
		});

		// Foydalanuvchi biron harakat qilganda tovushni yoqish
		const enableSound = () => {
			audio.muted = false;
			audio.play();
			document.removeEventListener("mousemove", enableSound);
			document.removeEventListener("touchstart", enableSound);
			document.removeEventListener("scroll", enableSound);
		};

		document.addEventListener("mousemove", enableSound);
		document.addEventListener("touchstart", enableSound);
		document.addEventListener("scroll", enableSound);

		return () => {
			document.removeEventListener("mousemove", enableSound);
			document.removeEventListener("touchstart", enableSound);
			document.removeEventListener("scroll", enableSound);
		};
	}, []);

	return <audio ref={audioRef} src="/music.mp3" loop />;
};

export default BackgroundMusic;
