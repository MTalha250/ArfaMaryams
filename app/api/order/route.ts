import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import nodemailer from "nodemailer";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const orders = await Order.find()
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: "Product",
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

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const {
      name,
      email,
      phone,
      orderItems,
      status,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      delivery,
      totalPrice,
    } = await request.json();
    const order = await Order.create({
      name,
      email,
      phone,
      orderItems,
      status,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      delivery,
      totalPrice,
    });
    const getOrder = await Order.findById(order._id).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
      },
    });

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
      subject: "Order Confirmation",
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f6f6f6;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px 0;
      }
      .header img {
        max-width: 150px;
        border-radius: 100%;
      }
      .order-details {
        margin: 20px 0;
      }
      .order-details table {
        width: 100%;
        border-collapse: collapse;
      }
      .order-details th,
      .order-details td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #dddddd;
        word-wrap: break-word;
      }
      .order-summary {
        text-align: right;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777777;
        padding: 10px 0;
      }
      .footer a {
        color: #777777;
        text-decoration: none;
      }
      @media only screen and (max-width: 600px) {
        .container {
          padding: 10px;
        }
        .header h1 {
          font-size: 24px;
        }
        .order-details th,
        .order-details td {
          font-size: 14px;
          padding: 5px;
        }
        .order-summary p {
          font-size: 16px;
        }
      }
      @media only screen and (max-width: 480px) {
        .container {
          padding: 5px;
        }
        .header h1 {
          font-size: 20px;
        }
        .order-details th,
        .order-details td {
          font-size: 12px;
          padding: 4px;
        }
        .order-summary p {
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://res.cloudinary.com/dewqsghdi/image/upload/v1720675151/logo_hanhib.webp" alt="Company Logo" />
        <h1>Order Confirmation</h1>
      </div>
      <p>Hi ${name},</p>
      <p>Thank you for your order! Here are the details:</p>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <div class="order-details">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Price (PKR)</th>
            </tr>
          </thead>
          <tbody>
            ${getOrder.orderItems
              .map(
                (item: any) => `
            <tr>
              <td>${item.product.name}</td>
              <td>${item.size.toUpperCase()}</td>
              <td>${item.color[0].toUpperCase() + item.color.slice(1)}</td>
              <td>${item.quantity}</td>
              <td>${
                item.product.price -
                ((item.product.price * item.product.discount) / 100) *
                  item.quantity
              }</td>
            </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="order-summary">
        <p><strong>Total: ${totalPrice.toLocaleString()} PKR</strong></p>
      </div>
      <p>
        If you have any questions, feel free to contact us at
        <a href="mailto:arfaandmaryams@gmail.com">arfaandmaryams@gmail.com</a>.
      </p>
      <p>Thank you for shopping with us!</p>
      <div class="footer">
        <p>&copy; 2024 Arfa & Maryam's. All rights reserved.</p>
        <p><a href="https://www.arfanmaryams.com">Visit our website</a></p>
      </div>
    </div>
  </body>
</html>
`,
    };
    await transporter.sendMail(mailOptions);

    const adminMailOptions = {
      from: {
        name: "Arfa & Maryam's",
        address: "arfaandmaryams@gmail.com",
      },
      to: "arfaandmaryams@gmail.com",
      subject: "New Order",
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Order</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f6f6f6;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px 0;
      }
      .header img {
        max-width: 150px;
        border-radius: 100%;
      }
      .order-details {
        margin: 20px 0;
      }
      .order-details table {
        width: 100%;
        border-collapse: collapse;
      }
      .order-details th,
      .order-details td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #dddddd;
        word-wrap: break-word;
      }
      .order-summary {
        text-align: right;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777777;
        padding: 10px 0;
      }
      .footer a {
        color: #777777;
        text-decoration: none;
      }
      @media only screen and (max-width: 600px) {
        .container {
          padding: 10px;
        }
        .header h1 {
          font-size: 24px;
        }
        .order-details th,
        .order-details td {
          font-size: 14px;
          padding: 5px;
        }
        .order-summary p {
          font-size: 16px;
        }
      }
      @media only screen and (max-width: 480px) {
        .container {
          padding: 5px;
        }
        .header h1 {
          font-size: 20px;
        }
        .order-details th,
        .order-details td {
          font-size: 12px;
          padding: 4px;
        }
        .order-summary p {
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://res.cloudinary.com/dewqsghdi/image/upload/v1720675151/logo_hanhib.webp" alt="Company Logo" />
        <h1>New Order</h1>
      </div>
      <p>Hi Arfa & Maryam's,</p>
      <p>A new order has been placed. Here are the details:</p>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <div class="order-details">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Price (PKR)</th>
            </tr>
          </thead>
          <tbody>
            ${getOrder.orderItems
              .map(
                (item: any) => `
            <tr>
              <td>${item.product.name}</td>
              <td>${item.size.toUpperCase()}</td>
              <td>${item.color[0].toUpperCase() + item.color.slice(1)}</td>
              <td>${item.quantity}</td>
              <td>${
                item.product.price -
                ((item.product.price * item.product.discount) / 100) *
                  item.quantity
              }</td>
            </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="order-summary">
        <p><strong>Total: ${totalPrice.toLocaleString()} PKR</strong></p>
      </div>
      <p>
        If you have any questions, feel free to contact the customer at
        <a href="mailto:${email}">${email}</a>.
      </p>
      <p>Thank you for shopping with us!</p>
      <div class="footer">
        <p>&copy; 2024 Arfa & Maryam's. All rights reserved.</p>
        <p><a href="https://www.arfanmaryams.com">Visit our website</a></p>
      </div>
    </div>
  </body>
</html>
`,
    };
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
      },
      {
        status: 201,
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
