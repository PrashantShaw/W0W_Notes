import { handlers } from "@/auth/auth.config" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
export const runtime = "edge" // optionalhttp://localhost:3000/