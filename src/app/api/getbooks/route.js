import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Use the URL constructor to access the query parameters
    const url = new URL(request.url);
    const search = url.searchParams.get("search"); // Get the 'search' parameter

    if (search) {
      const words = search.trim().split(" ");
      let books = [];
      for (let word of words) {
        word = word.trim();
        // console.log(word);
        const { data, error } = await supabase
          .from("books_mastertable")
          .select("*")
          .ilike("title", `%${word}%`);

        // console.log(data);

        if (error) {
          console.log("Error fetching books:", error);
          return NextResponse.json(
            { message: "An error occurred", error: error },
            { status: 400 }
          );
        }

        books = books.concat(data);
      }
      return NextResponse.json({ books: books }, { status: 200 });
    } else {
      const { data, error } = await supabase
        .from("books_mastertable") // Your table name
        .select("*"); // Fetch all fields

      if (error) {
        console.log("Error fetching books:", error);
        return NextResponse.json(
          { message: "An error occurred", error: error },
          { status: 400 }
        );
      }

      return NextResponse.json({ books: data }, { status: 200 });
    }
  } catch (error) {
    console.log("Error fetching books:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
