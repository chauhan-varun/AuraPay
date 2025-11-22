import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// GET - Fetch user balance
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ balance: user.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Update user balance (add funds)
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { amount } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Update user balance
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        balance: {
          increment: amount,
        },
      },
      select: { balance: true },
    });

    return NextResponse.json({ 
      success: true, 
      balance: updatedUser.balance,
      message: `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} added successfully`
    });
  } catch (error) {
    console.error("Error updating balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
