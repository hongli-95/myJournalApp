import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Journaly",
	description: "An attempt to build a journal web app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className="bg-gradient-to-br from-emerald-100 to-amber-600 h-svh"
		>
			<body className={`${inter.className} m-4`}>
				<div>
					<TopBar />
				</div>
				<div>{children}</div>
			</body>
		</html>
	);
}
