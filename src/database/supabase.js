import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(
  "https://wjbhcuqhycnoesmfsfmf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYmhjdXFoeWNub2VzbWZzZm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MzYyNDYsImV4cCI6MjAyMjIxMjI0Nn0.N8fhRXyeIs1njEu3rEG5hawXmkdgJRctQXfkFXtm6vs"
);
