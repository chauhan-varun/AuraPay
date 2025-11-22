import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export const runtime = "nodejs";

const prisma = new PrismaClient();

// Helper to generate random card number
function generateCardNumber() {
  const prefix = "4576"; // Visa prefix
  const random = Math.floor(Math.random() * 1000000000000).toString().padStart(12, "0");
  return `${prefix}${random}`;
}

// Helper to generate expiry date (2 years from now)
function generateExpiryDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
}

// Helper to generate CVV
function generateCVV() {
  return Math.floor(Math.random() * 900 + 100).toString();
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Check if user has any cards
    let cards = await prisma.card.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    });

    // If no cards exist, create one automatically
    if (cards.length === 0) {
      // Generate unique card number
      let cardNumber = generateCardNumber();
      let isUnique = false;
      
      // Ensure uniqueness
      while (!isUnique) {
        const existing = await prisma.card.findUnique({
          where: { cardNumber },
        });
        if (!existing) {
          isUnique = true;
        } else {
          cardNumber = generateCardNumber();
        }
      }

      // Create the card
      const newCard = await prisma.card.create({
        data: {
          userId,
          cardNumber,
          expiryDate: generateExpiryDate(),
          cvv: generateCVV(),
          balance: 0.0,
          status: "ACTIVE",
          type: "PHYSICAL",
        },
      });
      
      cards = [newCard];
    }

    // Format card numbers for display
    const formattedCards = cards.map(card => ({
      ...card,
      cardNumber: card.cardNumber.match(/.{1,4}/g)?.join(" ") || card.cardNumber,
    }));

    return NextResponse.json({
      cards: formattedCards
    });
  } catch (error) {
    console.error("Error fetching/creating card:", error);
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Generate unique card number
    let cardNumber = generateCardNumber();
    let isUnique = false;
    
    // Ensure uniqueness
    while (!isUnique) {
      const existing = await prisma.card.findUnique({
        where: { cardNumber },
      });
      if (!existing) {
        isUnique = true;
      } else {
        cardNumber = generateCardNumber();
      }
    }

    // Create the card
    const card = await prisma.card.create({
      data: {
        userId,
        cardNumber,
        expiryDate: generateExpiryDate(),
        cvv: generateCVV(),
        balance: 0.0,
        status: "ACTIVE",
        type: "PHYSICAL",
      },
    });

    return NextResponse.json({
      success: true,
      card
    });
  } catch (error) {
    console.error("Error creating card:", error);
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await req.json();
    const { cardId, name, status } = body;

    if (!cardId) {
      return NextResponse.json(
        { error: "Card ID is required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const existingCard = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!existingCard || existingCard.userId !== userId) {
      return NextResponse.json(
        { error: "Card not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update fields
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (status !== undefined) updateData.status = status;

    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      card: updatedCard
    });
  } catch (error) {
    console.error("Error updating card:", error);
    return NextResponse.json(
      { error: "Failed to update card" },
      { status: 500 }
    );
  }
}
