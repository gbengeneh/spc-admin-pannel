// src/components/auth-check.tsx  

import { createClient } from "@/supabase/server"; // Import your server client initializer  
import { redirect } from "next/navigation";   
import { ADMIN } from "@/constants/constants";  

export default async function AuthCheck({ children }: { children: React.ReactNode }) {  
    const supabase = await createClient();   
    const { data: authData, error: authError } = await supabase.auth.getUser();   

    if (authError || !authData?.user) {  
        // Redirect unauthenticated users to the auth page  
        redirect("/auth");   
    } else {  
        const { data: userData, error: userError } = await supabase  
            .from("users")  
            .select("*")  
            .eq("id", authData.user.id)  
            .single();   

        if (userError || !userData) {  
            console.error("Error fetching user data:", userError);  
        } else (userData.type === ADMIN) {  
            redirect("/admin") 
        }  
    }  

    // If user is authenticated, render children  
    return <>{children}</>;  
}