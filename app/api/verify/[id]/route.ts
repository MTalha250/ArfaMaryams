import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  await dbConnect();
  try {
    const user = await User.findByIdAndUpdate(id, { isVerified: true });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
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
};
