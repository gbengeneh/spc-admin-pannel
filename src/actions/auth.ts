// src/actions/auth.ts  
import { createClient } from "@/supabase/client";  

export const authenticate = async (email: string, password: string) => {  
  const supabase = createClient();  

  const { data, error } = await supabase.auth.signInWithPassword({  
    email,  
    password,  
  });  

  if (error) {  
    throw new Error(error.message);  
  }  

  console.log('User Data:', data); // Log user data  

  // Retrieve session data  
  const { data: sessionData } = await supabase.auth.getSession();  
  console.log('Session Data:', sessionData); // Log session data  

  if (!sessionData.session) {  
    throw new Error("Session not found after login"); // Ensure a session was created  
  }  

  // Return user data and session  
  return { user: data.user, session: sessionData.session };  
};

export const getLatestUsers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw new Error(`Error fetching latest users: ${error.message}`);

  return data.map(
    (user: { id: string; email: string; created_at: string | null }) => ({
      id: user.id,
      email: user.email,
      date: user.created_at,
    })
  );
};