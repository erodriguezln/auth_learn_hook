import { redirect } from "@sveltejs/kit";

export function load({locals}) {
  if (locals.user) {
    throw redirect(308, "/")
  }

  return {
    user: locals.user
  }
}