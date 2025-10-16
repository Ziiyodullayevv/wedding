import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		// Avval muted holatda autoplay qilishga harakat qilamiz
		audio.muted = true;
		audio.loop = true;
		audio.play().catch(() => {
			// Ba’zi brauzerlar bloklashi mumkin — keyin unmute qilamiz
		});

		// Foydalanuvchi sahifada harakat qilganda tovushni yoqish
		const enableSound = () => {
			if (audio) {
				audio.muted = false;
				audio
					.play()
					.then(() => {
						console.log("Music unmuted 🎵");
					})
					.catch(() => {
						console.log("Still blocked");
					});
			}

			// Listenerlarni olib tashlaymiz
			window.removeEventListener("scroll", enableSound);
			window.removeEventListener("touchstart", enableSound);
			window.removeEventListener("click", enableSound);
		};

		// Mobil va desktop harakatlari uchun
		window.addEventListener("scroll", enableSound);
		window.addEventListener("touchstart", enableSound);
		window.addEventListener("click", enableSound);

		return () => {
			window.removeEventListener("scroll", enableSound);
			window.removeEventListener("touchstart", enableSound);
			window.removeEventListener("click", enableSound);
		};
	}, []);

	return <audio ref={audioRef} src="/music.mp3" />;
};

export default BackgroundMusic;
