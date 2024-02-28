import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { name, email, password, role } = await request.json();
  await dbConnect();
  try {
    // checkling if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    // creating new user
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
