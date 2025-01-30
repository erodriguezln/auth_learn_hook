import { json, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/firebase-admin/firebase.admin";

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const token = form.get('token');
		// console.log("Server received token:", token);

		if (!token) {
			return json({ error: 'Token is required' }, { status: 400 });
		}

		if (!auth) {
			return json({ error: 'Firebase not initialized' }, { status: 500 })
		}

		const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

		try {
			const decodedToken = await auth.verifyIdToken(token.toString());
			const sessionCookie = await auth.createSessionCookie(token.toString(), { expiresIn: expiresIn })

			cookies.set('session', sessionCookie, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: expiresIn
			});

			throw redirect(303, '/');
		} catch (error) {

			if (error?.status === 303 && error?.location === '/') {
				// Re-throw the redirect to ensure SvelteKit handles it
				throw error;
			}

			console.error("Failed to create session cookie:", error);
			return json({ error: 'Failed to create session cookie' }, { status: 500 });
		}
	}
} satisfies Actions
