import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get session from better-auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { isAdmin: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Check if user has admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        { isAdmin: false, error: "User not found" },
        { status: 404 }
      );
    }

    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      return NextResponse.json(
        { isAdmin: false, error: "Not an admin" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      isAdmin: true,
    });
  } catch (error) {
    console.error("Admin verify error:", error);
    return NextResponse.json(
      { isAdmin: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
