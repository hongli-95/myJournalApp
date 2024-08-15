import Link from "next/link";
import Image from "next/image";
import image1 from "../images/1.png";
import image2 from "../images/2.png";
import image3 from "../images/3.png";
import image4 from "../images/4.png";
import image5 from "../images/5.png";
import {
	getKindeServerSession,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { MotionDiv } from "@/components/MotionDiv";

export default async function Home() {
	const { isAuthenticated } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	return (
		<main className="flex flex-col justify-center items-center w-full lg:flex-row mt-20 md:mt-12">
			<MotionDiv
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col gap-4 justify-center items-center my-4 flex-1 z-10 relative lg:translate-y-12"
			>
				<h1 className="text-2xl text-slate-800 drop-shadow-md">
					Welcome to Journey Space
				</h1>
				<h2 className="text-slate-800">Write down your mind.</h2>
				{isLoggedIn ? (
					<Link
						href="/entries"
						className="w-full lg:w-1/2 text-center border-2 border-white text-xl bg-transparent p-3 rounded-md text-white 
						hover:shadow-md hover:scale-105 hover:text-xl hover:bg-white hover:text-black
         				focus-visible:bg-white focus-visible:text-black focus-visible:shadow-md focus-visible:scale-105 
						active:scale-95 transition-all"
					>
						Go to your Journal
					</Link>
				) : (
					<RegisterLink
						className="w-full lg:w-1/2 text-center border-2 border-white text-xl bg-transparent p-3 rounded-md text-white 
						hover:shadow-md hover:scale-105 hover:text-xl hover:bg-white hover:text-black
         				focus-visible:bg-white focus-visible:text-black focus-visible:shadow-md focus-visible:scale-105 
						active:scale-95 transition-all"
					>
						Join Today
					</RegisterLink>
				)}
			</MotionDiv>

			<MotionDiv
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="flex flex-row gap-3 justify-center w-full translate-y-10
				md:w-5/6 
				lg:w-1/2 lg:-translate-x-20 lg:translate-y-36"
			>
				<Image
					src={image1}
					alt="homepage-iamge1"
					className="w-1/6 rounded-md shadow-lg -translate-y-2"
				></Image>
				<Image
					src={image2}
					alt="homepage-iamge2"
					className="w-1/6 rounded-md shadow-lg translate-y-4"
				></Image>
				<Image
					src={image3}
					alt="homepage-iamge3"
					className="w-1/6 rounded-md shadow-lg -translate-y-6"
				></Image>
				<Image
					src={image4}
					alt="homepage-iamge4"
					className="w-1/6 rounded-md shadow-lg translate-y-8"
				></Image>
				<Image
					src={image5}
					alt="homepage-iamge5"
					className="w-1/6 rounded-md shadow-lg -translate-y-10"
				></Image>
			</MotionDiv>
		</main>
	);
}
