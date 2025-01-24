export function load({locals}) {
  console.log("+layout.server.ts")
  console.log(locals.user)
  return {
    user: locals.user
  }
}