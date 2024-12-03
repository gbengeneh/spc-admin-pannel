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