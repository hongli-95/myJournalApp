import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Journey Space",
	description: "An attempt to build a journal web app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="w-full h-full ">
			<body
				className={`${inter.className} h-svh flex flex-col bg-[url('../images/grass-field.jpg')] bg-cover bg-no-repeat bg-fixed antialiased`}
			>
				<TopBar />
				<div className="px-4">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
