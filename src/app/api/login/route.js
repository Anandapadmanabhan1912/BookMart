import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabaseClient";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    let { data, error } = await supabase
      .from("users")
      .select("id,email,password")
      .eq("email", email);

    if (error) {
      return NextResponse.json(
        { status: error, message: "Signup failed" },
        { status: 500 }
      );
    }

    if (!data.length) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, data[0].password); // compare the password
    if (!passwordMatch) {
      return NextResponse.json(
        { status: "error", message: "Invalid password" },
        { status: 401 }
      );
    }

    const userDetails = { user: { id: data[0].id } };

    const authToken = jwt.sign(userDetails, process.env.JWT_SECRET);

    return NextResponse.json({ authToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: error, message: "Signup failed" },
      { status: 500 }
    );
  }
}
