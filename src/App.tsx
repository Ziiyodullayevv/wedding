import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./components/Timer";
import TelegramBot from "./components/Message";
import "./App.css";

// eslint-disable-next-line react-refresh/only-export-components
export const fadeIn = (direction: string, delay: number) => ({
	hidden: {
		y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
		opacity: 0,
		x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
	},
	show: {
		y: 0,
		x: 0,
		opacity: 1,
		transition: {
			type: "tween",
			delay,
			duration: 0.4,
			ease: "easeInOut",
		},
	},
});

function Image({
	id,
	title,
	subtitle,
	subtitle2,
	names,
	title2,
	time,
	date,
	manzil,
	map,
	message,
}: {
	id: number;
	title: string;
	subtitle: string;
	subtitle2: string;
	names: boolean;
	title2: string;
	time: boolean;
	date: string;
	manzil: string;
	map: boolean;
	message: boolean;
}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [, setIsInView] = useState(false);

	return (
		<>
			<section className="relative">
				<motion.div
					className="slide-container"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					onViewportEnter={() => setIsInView(true)}
				>
					{!isLoaded && (
						<div className="image-skeleton">
							<div className="skeleton-shimmer"></div>
						</div>
					)}
					<img
						src={`/${id}.jpg`}
						onLoad={() => setIsLoaded(true)}
						alt={`Image ${id}`}
						style={{ opacity: isLoaded ? 1 : 0 }}
						loading="eager"
					/>
					<div className="overlay"></div>
					<div className="text">
						<div className="flex flex-col items-center">
							<motion.h2
								variants={fadeIn("up", 0.2)}
								initial="hidden"
								whileInView="show"
								className="ar-gold text-[50px]"
							>
								{title}
							</motion.h2>

							<motion.h2
								variants={fadeIn("up", 0.3)}
								initial="hidden"
								whileInView="show"
								className="text-[45px] ar-gold -mt-6"
							>
								{subtitle}
							</motion.h2>

							{time && <CountdownTimer />}

							{subtitle2 && (
								<motion.p
									variants={fadeIn("up", 0.5)}
									initial="hidden"
									whileInView="show"
									className="text-xl font-montserrat text-yellow-100 mt-10"
								>
									{subtitle2}
								</motion.p>
							)}
						</div>

						{map && (
							<motion.a
								variants={fadeIn("up", 0.4)}
								initial="hidden"
								whileInView="show"
								href="https://maps.app.goo.gl/i4wpDh5twzYYtB66A"
							>
								<div className="request-loader">
									<span></span>
								</div>
							</motion.a>
						)}

						{message && <TelegramBot />}

						<div className="flex flex-col items-center">
							<motion.h5
								variants={fadeIn("up", 0.6)}
								initial="hidden"
								whileInView="show"
								className="flex items-center gap-2 text-sm font-montserrat uppercase text-yellow-100"
							>
								<span className="w-[30px] h-[.5px] inline-block bg-gray-200"></span>
								<span>{title2}</span>
								<span className="w-[30px] h-[.5px] inline-block bg-gray-200"></span>
							</motion.h5>

							{names && (
								<motion.h3
									variants={fadeIn("up", 0.7)}
									initial="hidden"
									whileInView="show"
									className="ar-gold text-[40px] mt-2"
								>
									Ismoiljon vs Ruxshona
								</motion.h3>
							)}

							{manzil && (
								<motion.h4
									variants={fadeIn("up", 0.6)}
									initial="hidden"
									whileInView="show"
									className="text-[20px] mt-10 font-montserrat text-yellow-100"
								>
									{manzil}
								</motion.h4>
							)}

							{date && (
								<>
									<span className="h-[0.3px] inline-block w-full bg-yellow-200 mt-6"></span>
									<motion.h5
										variants={fadeIn("up", 0.6)}
										initial="hidden"
										whileInView="show"
										className="text-sm font-montserrat uppercase mt-10 text-yellow-100"
									>
										{date}
									</motion.h5>
								</>
							)}
						</div>
					</div>
				</motion.div>
			</section>
		</>
	);
}

export default function App() {
	const [isMobile, setIsMobile] = useState(false);
	const [musicStarted, setMusicStarted] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const userAgent = navigator.userAgent;
		const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
		setIsMobile(mobile);

		// Preload images
		if (mobile) {
			[1, 2, 3].forEach((id) => {
				const img = document.createElement("img") as HTMLImageElement;
				img.src = `/${id}.jpg`;
			});
		}
	}, []);

	useEffect(() => {
		let lastScrollTime = 0;
		const scrollDelay = 600; // 1000 dan 600 ga kamaytirildi

		const handleWheel = (e: WheelEvent) => {
			const now = Date.now();
			if (now - lastScrollTime < scrollDelay) {
				e.preventDefault();
				return;
			}
			lastScrollTime = now;
		};

		const handleTouchStart = () => {
			setIsScrolling(false);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (isScrolling) {
				e.preventDefault();
			}
		};

		const handleScroll = () => {
			if (!isScrolling) {
				setIsScrolling(true);

				if (scrollTimeout.current) {
					clearTimeout(scrollTimeout.current);
				}

				scrollTimeout.current = setTimeout(() => {
					setIsScrolling(false);
				}, 600); // 1000 dan 600 ga kamaytirildi
			}
		};

		window.addEventListener("wheel", handleWheel, { passive: false });
		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchmove", handleTouchMove, { passive: false });
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("scroll", handleScroll);
			if (scrollTimeout.current) {
				clearTimeout(scrollTimeout.current);
			}
		};
	}, [isScrolling]);

	const startMusic = () => {
		if (audioRef.current) {
			audioRef.current.play().catch((err) => console.log("Play error:", err));
			setMusicStarted(true);
		}
	};

	return (
		<div>
			<audio ref={audioRef} src="/music.mp3" loop />

			{!musicStarted && (
				<div
					className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
					onClick={startMusic}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="text-white text-center"
					>
						<h2 className="text-2xl font-semibold mb-2">
							Musiqa bilan boshlash uchun bosing
						</h2>
						<p className="text-sm opacity-80">(Bir marta bosish kifoya)</p>
					</motion.div>
				</div>
			)}
			{isMobile ? (
				<>
					<Image
						id={1}
						title="Bizning baxtli"
						subtitle="kunimizga xush kelibsiz!"
						subtitle2="Eng yorqin yulduzlar ham bugun biz bilan birga porlayotgandek,
chunki bu kun — biz uchun eng muhim va eng esda qolarli kun,
bizning nikoh to'yimiz!"
						names={true}
						title2="Wedding of the"
						time={false}
						date="26 oktabr 2025 soat 16:00"
						manzil=""
						map={false}
						message={false}
					/>

					<Image
						id={2}
						title="Baxtli kunimizgacha"
						subtitle=" qolgan lahzalar"
						subtitle2=""
						names={false}
						title2="Manzil"
						time={true}
						date=""
						manzil="Buloqboshi tumani, Yong'oqzor to'yxonasi"
						map={true}
						message={false}
					/>

					<Image
						id={3}
						title="Baxtli kunimiz uchun"
						subtitle="tilaklaringiz!"
						subtitle2=""
						names={false}
						title2="Mezbon"
						time={false}
						date=""
						manzil="Yunusovlar oilasi"
						map={false}
						message={true}
					/>
				</>
			) : (
				<div className="flex justify-center items-center h-screen">
					<motion.h2
						variants={fadeIn("up", 3)}
						initial="hidden"
						whileInView="show"
						className="text-4xl text-yellow-200 text-center"
					>
						Saytni faqat telefon orqali ko'rish mumkin
					</motion.h2>
				</div>
			)}
		</div>
	);
}
