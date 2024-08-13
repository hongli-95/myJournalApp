"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";
import { Entry } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// zod image file validation
// optional; check if there is a file submitted, if so check if it's an image fil
const imageSchema = z
	.instanceof(File)
	.refine(
		(file) =>
			(file as File).size === 0 || (file as File).type.startsWith("image/"),
		{ message: "Please upload an image file." }
	);

const inputSchema = z.object({
	title: z.string().min(1),
	mood: z.string().min(1),
	body: z.string().min(1),
	image: imageSchema,
});

// create new entry
export async function createNewEntry(formData: FormData) {
	// redirect to signin page if not logged in
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();
	if (!isLoggedIn) {
		redirect("/api/auth/login");
	}
	const user = await getUser();

	// use zod to safe parse the data submitted from the form
	const zodData = inputSchema.safeParse(Object.fromEntries(formData.entries()));

	if (!zodData.success) {
		return zodData.error.formErrors.fieldErrors;
	}

	const formEntry = zodData.data;

	// create a directory for uploaded picture
	await fs.mkdir("/public/pictures", { recursive: true });

	// if an iamge is submitted through the form
	if (formEntry.image.name !== "undefined") {
		console.log(formEntry);
		// create a image path
		const imagePath = `/pictures/${crypto.randomUUID()}-${
			formEntry.image?.name
		}`;

		// write the file into the system
		await fs.writeFile(
			`public${imagePath}`,
			// unknown type?
			Buffer.from((await formEntry.image?.arrayBuffer()) as any)
		);

		try {
			await prisma.entry.create({
				data: {
					title: formEntry.title,
					mood: formEntry.mood,
					body: formEntry.body,
					KindeAuthId: user?.id as string,
					imagePath,
				},
			});
		} catch (error) {
			console.log(error);
		}
	} else {
		try {
			await prisma.entry.create({
				data: {
					title: formEntry.title,
					mood: formEntry.mood,
					body: formEntry.body,
					KindeAuthId: user?.id as string,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	redirect("/entries");
}

// populate the edit form with the entry
export async function fetchEditEntry(id: string) {
	try {
		const entry = await prisma.entry.findUnique({
			where: {
				id: id,
			},
		});

		return entry;
	} catch (error) {
		console.log(error);
	}
}

// update entry
export async function updateEntry(formData: FormData) {
	const zodData = inputSchema.safeParse(Object.fromEntries(formData.entries()));

	if (!zodData.success) {
		return zodData.error.formErrors.fieldErrors;
	}

	const formEntry = zodData.data;
	const currentEntry = await prisma.entry.findUnique({
		where: {
			id: formData.get("id") as string,
		},
	});

	// check if the entry has an image
	let imagePath = currentEntry?.imagePath;
	if (formEntry.image.name !== "undefined" && formEntry.image.size > 0) {
		if (imagePath !== null) {
			// unlink image from the current entry, delete from file system
			await fs.unlink(`public${currentEntry?.imagePath as string}`);

			// create a new image path
			imagePath = `/pictures/${crypto.randomUUID()}-${formEntry.image?.name}`;

			// write the file into the system
			await fs.writeFile(
				`public${imagePath}`,
				// unknown type?
				Buffer.from((await formEntry.image?.arrayBuffer()) as any)
			);

			// if the entry does NOT have an image path, and is being added one, create a new path
		} else {
			// create an image path
			imagePath = `/pictures/${crypto.randomUUID()}-${formEntry.image?.name}`;

			// write the file into the system
			await fs.writeFile(
				`public${imagePath}`,
				// unknown type?
				Buffer.from((await formEntry.image?.arrayBuffer()) as any)
			);
		}
	}

	// get the id from the formdata from a hidden input field
	try {
		await prisma.entry.update({
			where: {
				id: formData.get("id") as string,
			},
			data: {
				title: formEntry.title,
				mood: formEntry.mood,
				body: formEntry.body,
				// imagePath,
			},
		});
	} catch (error) {
		console.log(error);
	}

	redirect(`/entries/${formData.get("id")}`);
}

// delete entry
export async function deleteEntry(id: string) {
	const result = await prisma.entry.findUnique({
		where: {
			id,
		},
	});

	if (result?.imagePath) {
		await fs.unlink(`public${(result as Entry).imagePath}`);
	}

	try {
		await prisma.entry.delete({
			where: { id },
		});
	} catch (error) {}

	redirect("/entries");
}
