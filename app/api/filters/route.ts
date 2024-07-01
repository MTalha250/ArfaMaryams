import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const {
      formals,
      semiFormals,
      casuals,
      price: { min, max },
    } = await req.json();
    const products = <any>[];
    const allProducts = await Product.find({
      price: { $gte: min, $lte: max },
    });
    if (formals) {
      const formalProducts = await Product.find({
        category: "formals",
        price: { $gte: min, $lte: max },
      });
      products.push(...formalProducts);
    }
    if (semiFormals) {
      const semiFormalProducts = await Product.find({
        category: "semi-formals",
        price: { $gte: min, $lte: max },
      });
      products.push(...semiFormalProducts);
    }
    if (casuals) {
      const casualProducts = await Product.find({
        category: "casual",
        price: { $gte: min, $lte: max },
      });
      products.push(...casualProducts);
    }
    if (!formals && !semiFormals && !casuals) {
      products.push(...allProducts);
    }
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
        message: "Something went wrong",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
};
