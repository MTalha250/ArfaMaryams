import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  await dbConnect();
  try {
    const { category } = params;
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 400,
      }
    );
  }
}
