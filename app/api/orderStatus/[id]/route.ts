import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await dbConnect();
  const { status, paymentStatus } = await request.json();
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        status,
        paymentStatus,
      },
      {
        new: true,
      }
    );
    return NextResponse.json(
      {
        success: true,
        order,
        message: "Order status updated successfully",
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
