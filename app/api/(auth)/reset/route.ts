import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  try {
    const { email, code } = await request.json();
    await dbConnect();
    const user = await User.findOne({
      email,
    });
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "arfaandmaryams@gmail.com",
        pass: "hbyw dvpe svwl rwjt",
      },
    });
    const mailOptions = {
      from: {
        name: "Arfa & Maryam's",
        address: "arfaandmaryams@gmail.com",
      },
      to: email,
      subject: "Password Reset Code",
      html: `<h3>Your password reset code is: <span style="display:block; font-weight: bold; font-size: 30px;">${code}</span></h3>`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        success: true,
        message:
          "Code sent successfully. \nPlease check your email for the code",
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
      },
      {
        status: 400,
      }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    await dbConnect();
    const user = await User.findOne({
      email,
    });
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
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message:
          "Password reset successfully. \nPlease login with your new password",
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
      },
      {
        status: 400,
      }
    );
  }
};
