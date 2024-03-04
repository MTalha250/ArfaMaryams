import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await dbConnect();
  try {
    const order = await Order.find({ user: id })
      .populate("user", "name email phone")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: "Product",
        },
      });
    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        order,
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
