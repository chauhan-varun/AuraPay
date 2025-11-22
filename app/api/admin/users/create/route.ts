import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export const runtime = "nodejs";

const prisma = new PrismaClient();

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

    // Verify admin role
    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, phone, address, initialCardNumber, kycDocument } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 }
      );
    }

    // 1. Create User via better-auth (or simulate it)
    // Since we can't easily use auth.api.signUpEmail here without a password, 
    // and we want to set a default password, we'll use a workaround.
    // We'll create the user directly in Prisma. 
    // NOTE: In a real app, we MUST hash the password. 
    // For this demo, we'll assume the 'password' field in Prisma is plain text or we use a placeholder hash.
    // Better-auth usually handles hashing. 
    // To be safe and functional with better-auth, we should use its API if possible.
    
    // Let's try to use auth.api.signUpEmail if available on server
    // If not, we'll fallback to Prisma create.
    
    let newUser;
    const defaultPassword = "Welcome123!";

    try {
        // We use the auth API to create the user properly with hashing.
        // IMPORTANT: We pass empty headers to simulate a fresh request, 
        // otherwise better-auth might detect the admin session and prevent signup 
        // or try to link accounts.
        const signUpResponse = await auth.api.signUpEmail({
            body: {
                email,
                password: defaultPassword,
                name,
            },
            headers: new Headers() // Empty headers to avoid sending admin session
        });
        
        if (!signUpResponse || !signUpResponse.user) {
             throw new Error("Failed to create user via auth");
        }
        
        newUser = signUpResponse.user;
        
    } catch (e) {
        console.error("Auth signup failed", e);
        return NextResponse.json({ error: "Failed to create user. Email might be in use." }, { status: 500 });
    }

    // 2. Update User with extended details (Phone, Address)
    await prisma.user.update({
        where: { id: newUser.id },
        data: {
            phone,
            address,
        }
    });

    // 3. Create Initial Card
    if (initialCardNumber) {
        await prisma.card.create({
            data: {
                userId: newUser.id,
                cardNumber: initialCardNumber,
                expiryDate: generateExpiryDate(),
                cvv: generateCVV(),
                balance: 0.0,
                status: "ACTIVE",
                type: "PHYSICAL",
            }
        });
    }

    return NextResponse.json({
      success: true,
      user: newUser,
      password: defaultPassword
    });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
