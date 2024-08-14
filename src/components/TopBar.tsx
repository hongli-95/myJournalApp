import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function TopBar() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();
	const user = await getUser();

	return (
		<div className="flex flex-row flex-wrap gap-4 justify-end mx-3 z-50 relative">
			{isLoggedIn ? (
				<Link
					href="/entries"
					className="flex justify-center items-center bg-transparent border-2 border-transparent p-1 my-1 rounded-lg md:flex-none text-white 
			hover:border-white hover:scale-105 hover:shadow-md  
			focus-visible:border-white focus-visible:shadow-md 
			active:scale-95 transition-all"
				>
					<p className="">{user?.email}</p>
				</Link>
			) : (
				<LoginLink
					className="bg-transparent border-2 border-transparent p-2 rounded-lg text-white 
			hover:border-white hover:scale-105 hover:shadow-md transition-all 
			focus-visible:border-white focus-visible:shadow-md 
			active:scale-95"
				>
					Log In
				</LoginLink>
			)}

			{isLoggedIn ? (
				<LogoutLink
					target="_blank"
					className="flex justify-center items-center bg-transparent border-2 border-transparent p-1 rounded-lg  text-white 
			hover:border-white hover:scale-105 hover:shadow-md transition-all 
			focus-visible:border-white focus-visible:shadow-md 
			active:scale-95"
				>
					Log Out
				</LogoutLink>
			) : (
				<RegisterLink
					className="bg-transparent border-2 border-transparent p-2 rounded-lg text-white 
			hover:border-white hover:scale-105 hover:shadow-md transition-all 
			focus-visible:border-white focus-visible:shadow-md 
			active:scale-95"
				>
					Sign Up
				</RegisterLink>
			)}
		</div>
	);
}
