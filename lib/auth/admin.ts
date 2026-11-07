import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "dpanda_super_secret_jwt_key_min_32_bytes_long_12345"
);

const COOKIE_NAME = "dpanda_admin_session";

// Rate limiting map: IP -> attempts timestamp array
const loginAttempts = new Map<string, number[]>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const timestamps = (loginAttempts.get(ip) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  loginAttempts.set(ip, timestamps);
  return { allowed: true, remaining: maxAttempts - timestamps.length };
}

export async function createAdminSession(): Promise<string> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(JWT_SECRET);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 8 * 60 * 60, // 8 hours
  });

  return token;
}

export async function verifyAdminSession(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload.role === "admin";
  } catch {
    return false;
  }
}

export async function clearAdminSession(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    // Default development fallback password: 'dpanda-admin-2026'
    return password === "dpanda-admin-2026";
  }
  return bcrypt.compare(password, hash);
}
