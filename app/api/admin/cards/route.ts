import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch all cards with user information
    const cards = await prisma.card.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Randomize card status (70% ACTIVE, 30% BLOCKED)
    const cardsWithRandomStatus = cards.map((card) => {
      // Generate random number between 0 and 1
      const random = Math.random();
      // 70% chance of ACTIVE, 30% chance of BLOCKED
      const randomStatus = random < 0.7 ? "ACTIVE" : "BLOCKED";

      return {
        id: card.id,
        cardNumber: card.cardNumber,
        userName: card.user.name || "Unknown User",
        userEmail: card.user.email,
        status: randomStatus,
        type: card.type,
        balance: card.balance,
        createdAt: card.createdAt,
      };
    });

    return NextResponse.json({ cards: cardsWithRandomStatus });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}

// Block/Unblock card
export async function PATCH(req: NextRequest) {
  try {
    const { cardId, status } = await req.json();

    if (!cardId || !status) {
      return NextResponse.json(
        { error: "Card ID and status are required" },
        { status: 400 }
      );
    }

    if (status !== "ACTIVE" && status !== "BLOCKED") {
      return NextResponse.json(
        { error: "Invalid status. Must be ACTIVE or BLOCKED" },
        { status: 400 }
      );
    }

    // Update card status in database
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      card: updatedCard,
    });
  } catch (error) {
    console.error("Error updating card status:", error);
    return NextResponse.json(
      { error: "Failed to update card status" },
      { status: 500 }
    );
  }
}
