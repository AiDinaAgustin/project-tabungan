"use server";

import { db } from "@/lib/db";
import { targets, savings } from "@/lib/db/schema";
import { eq, sql, or, inArray } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";

export async function getTargets() {
    const user = await getCurrentUser();
    if (!user) return [];

    const userIds = [user.id];
    if (user.partnerId) {
        userIds.push(user.partnerId);
    }

    // Fetch targets with aggregated savings
    const results = await db
        .select({
            id: targets.id,
            title: targets.title,
            targetAmount: targets.targetAmount,
            icon: targets.icon,
            iconBg: targets.iconBg,
            iconColor: targets.iconColor,
            progressColor: targets.progressColor,
            collectedAmount: sql<number>`COALESCE(SUM(${savings.amount}), 0)`,
        })
        .from(targets)
        .leftJoin(savings, eq(targets.id, savings.targetId))
        .where(inArray(targets.userId, userIds))
        .groupBy(targets.id)
        .orderBy(targets.createdAt);

    return results;
}

export async function createTarget(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) return { error: "Silakan login terlebih dahulu" };

    const title = formData.get("title") as string;
    const targetAmount = formData.get("targetAmount") as string;
    const icon = formData.get("icon") as string;

    if (!title || !targetAmount) {
        return { error: "Judul dan nominal target harus diisi" };
    }

    // Predefined colors based on common icons (fallback logic)
    let iconBg = "bg-[#e0f2f1]";
    let iconColor = "text-[#7ca29d]";
    let progressColor = "text-[#7ca29d]";

    if (icon === "home_work") {
        iconBg = "bg-[#fef3c7]";
        iconColor = "text-amber-600";
        progressColor = "text-amber-400";
    } else if (icon === "medical_services") {
        iconBg = "bg-emerald-50";
        iconColor = "text-emerald-600";
        progressColor = "text-emerald-500";
    }

    try {
        await db.insert(targets).values({
            id: uuidv4(),
            userId: user.id,
            title,
            targetAmount: targetAmount,
            icon,
            iconBg,
            iconColor,
            progressColor,
        });

        revalidatePath("/target");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Create Target Error:", error);
        return { error: "Gagal membuat target baru" };
    }
}
