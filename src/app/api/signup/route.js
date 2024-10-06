import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabaseClient";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { address, country, dob, email, gender, name, password } =
      await request.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          password: hashedPassword,
          email,
          dob,
          country,
          address,
          gender,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { status: error, message: "Signup failed" },
        { status: 500 }
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
