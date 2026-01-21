"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "Semua field harus diisi" };
    }

    try {
        // Check if user exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (existingUser) {
            return { error: "Email sudah terdaftar" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        await db.insert(users).values({
            id: userId,
            name,
            email,
            password: hashedPassword,
        });

        // Set cookie (very simple implementation)
        const cookieStore = await cookies();
        cookieStore.set("user_id", userId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return { success: true };
    } catch (error) {
        console.error("Register Error:", error);
        return { error: "Gagal mendaftarkan akun" };
    }
}

export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email dan password harus diisi" };
    }

    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return { error: "Email atau password salah" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { error: "Email atau password salah" };
        }

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("user_id", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return { success: true };
    } catch (error) {
        console.error("Login Error:", error);
        return { error: "Gagal masuk" };
    }
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("user_id");
    return { success: true };
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) return null;

    try {
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId),
        });

        if (!user) return null;

        let partner = null;
        if (user.partnerId) {
            partner = await db.query.users.findFirst({
                where: eq(users.id, user.partnerId),
                columns: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            partnerId: user.partnerId,
            partner: partner,
        };
    } catch (error) {
        return null;
    }
}

export async function invitePartner(email: string) {
    const user = await getCurrentUser();
    if (!user) return { error: "Silakan login terlebih dahulu" };

    if (user.email === email) {
        return { error: "Anda tidak bisa mengundang diri sendiri" };
    }

    try {
        // Find target user
        const targetUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!targetUser) {
            return { error: "User dengan email tersebut tidak ditemukan" };
        }

        if (targetUser.partnerId) {
            return { error: "User tersebut sudah memiliki pasangan" };
        }

        // Link both users (Sequential updates as neon-http lacks transaction support in this mode)
        await db.update(users).set({ partnerId: targetUser.id }).where(eq(users.id, user.id));
        await db.update(users).set({ partnerId: user.id }).where(eq(users.id, targetUser.id));

        return { success: true };
    } catch (error: any) {
        console.error("Invite Partner Error:", error);
        return { error: `Gagal menghubungkan pasangan: ${error.message}` };
    }
}
