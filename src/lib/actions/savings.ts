"use server";

import { db } from "@/lib/db";
import { savings, targets, users } from "@/lib/db/schema";
import { eq, desc, inArray, and, gte, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";

export async function addSavings(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) return { error: "Silakan login terlebih dahulu" };

    const targetId = formData.get("targetId") as string;
    const amount = formData.get("amount") as string;
    const source = formData.get("source") as string || "Setoran Manual";
    const saverId = (formData.get("userId") as string) || user.id;

    if (!targetId || !amount) {
        return { error: "Target dan nominal harus diisi" };
    }

    try {
        await db.insert(savings).values({
            id: uuidv4(),
            targetId,
            userId: saverId,
            amount: amount,
            source,
        });

        revalidatePath("/");
        revalidatePath("/target");
        revalidatePath("/laporan");
        return { success: true };
    } catch (error) {
        console.error("Add Savings Error:", error);
        return { error: "Gagal mencatat tabungan" };
    }
}

export async function getSavingsHistory(limit = 10) {
    const user = await getCurrentUser();
    if (!user) return [];

    const userIds = [user.id];
    if (user.partnerId) {
        userIds.push(user.partnerId);
    }

    try {
        const results = await db
            .select({
                id: savings.id,
                amount: savings.amount,
                source: savings.source,
                createdAt: savings.createdAt,
                targetTitle: targets.title,
                userName: users.name,
                userId: savings.userId,
            })
            .from(savings)
            .leftJoin(targets, eq(savings.targetId, targets.id))
            .leftJoin(users, eq(savings.userId, users.id))
            .where(inArray(savings.userId, userIds))
            .orderBy(desc(savings.createdAt))
            .limit(limit);

        return results;
    } catch (error) {
        console.error("Get Savings History Error:", error);
        return [];
    }
}

export async function getFinancialInsights() {
    const user = await getCurrentUser();
    if (!user) return [];

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const userIds = [user.id];
    if (user.partnerId) {
        userIds.push(user.partnerId);
    }

    try {
        const results = await db
            .select({
                userId: savings.userId,
                userName: users.name,
                totalAmount: sql<number>`COALESCE(SUM(${savings.amount}), 0)`,
            })
            .from(savings)
            .leftJoin(users, eq(savings.userId, users.id))
            .where(
                and(
                    inArray(savings.userId, userIds),
                    gte(savings.createdAt, firstDayOfMonth)
                )
            )
            .groupBy(savings.userId, users.name);

        return results;
    } catch (error) {
        console.error("Get Financial Insights Error:", error);
        return [];
    }
}

export async function getSavingsByTarget(targetId: string) {
    const user = await getCurrentUser();
    if (!user) return [];

    try {
        const results = await db
            .select({
                id: savings.id,
                amount: savings.amount,
                source: savings.source,
                createdAt: savings.createdAt,
                userName: users.name,
                userId: savings.userId,
            })
            .from(savings)
            .leftJoin(users, eq(savings.userId, users.id))
            .where(eq(savings.targetId, targetId))
            .orderBy(desc(savings.createdAt));

        return results;
    } catch (error) {
        console.error("Get Savings By Target Error:", error);
        return [];
    }
}
