import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import Product from "@/models/product";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  await dbConnect();
  try {
    const orders = await Order.find({ email: email })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: Product,
        },
      })
      .sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        orders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
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