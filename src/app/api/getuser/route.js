import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // Assuming you are using Supabase or adjust accordingly.

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is missing or invalid" },
        { status: 401 }
      );
    }

    // Extract the token from the 'Bearer <token>' format
    const token = authHeader.split(" ")[1];

    // Verify and decode the JWT token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the decoded token
    const userId = decoded.user.id;

    // Fetch user details from the database using the userId

    let { data, error } = await supabase
      .from("users")
      .select("id,name,email,dob,country,gender,address")
      .eq("id", userId);

    if (error || !data.length) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = data[0];

    // Return the user information in the response
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    // Handle errors (e.g., invalid token or database error)
    console.log("Error fetching user:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
