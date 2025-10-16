import { motion } from "framer-motion";
import React, { useState } from "react";
import { fadeIn } from "../App";
import MyModal from "./Dialog";

const TelegramBot: React.FC = () => {
	const [message, setMessage] = useState<string>("");
	const [name, setName] = useState<string>("");

	const sendMessageToTelegram = async () => {
		if (!message.trim()) return;

		const botToken = "8295792294:AAHChMuZ3zHD0s5nVDXHrwpH6VzBnAq6Ls8";
		const chatId = "843041627";
		const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

		const formattedMessage =
			`💌 *Yangi tilak!*\n\n` +
			`👤 *Kim yubordi:* ${name || "Anonim"}\n` +
			`📝 *Tilak:* ${message}`;

		try {
			const response = await fetch(sendMessageUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					chat_id: chatId,
					text: formattedMessage,
					parse_mode: "Markdown",
				}),
			});

			if (response.ok) {
				console.log("Xabar muvaffaqiyatli yuborildi!");
			} else {
				console.log("Xatolik yuz berdi, qayta urinib koring.");
			}
		} catch (error) {
			console.error("Xato:", error);
		}

		setMessage("");
		setName("");
	};

	// Enter bosilganda yuborish
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault(); // yangi qatordan to‘xtatish
			sendMessageToTelegram();
		}
	};

	return (
		<motion.form
			className="w-full flex flex-col gap-4"
			variants={fadeIn("up", 0.5)}
			initial="hidden"
			whileInView="show"
			onSubmit={(e) => {
				e.preventDefault();
				sendMessageToTelegram();
			}}
		>
			<input
				type="text"
				className="bg-white/10 font-montserrat placeholder:text-yellow-100 text-yellow-100 focus:outline-solid focus:outline focus:outline-yellow-100 w-full rounded-lg p-4"
				placeholder="Ismingiz..."
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<textarea
				className="bg-white/10 font-montserrat placeholder:text-yellow-100 min-h-[200px] text-yellow-100 focus:outline-solid focus:outline focus:outline-yellow-100 w-full backdrop-blur-sm rounded-lg p-4"
				placeholder="Tilaklaringiz..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown} // Enterni ushlash
				required
			/>
			<MyModal />
		</motion.form>
	);
};

export default TelegramBot;
