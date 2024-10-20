// src/app/api/getbookdetails/route.js

import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/lib/supabaseClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bookid = searchParams.get('bookid');

  if (!bookid) {
    return new Response(JSON.stringify({ error: 'Book ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabase
    .from('books_mastertable')
    .select('*')
    .eq('bookid', bookid)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
