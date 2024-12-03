// import { ADMIN } from "@/constants/constants";  
// import { createClient } from "@/supabase/server";  
// import { redirect } from "next/navigation";  
// import { ReactNode } from "react";  

// export default async function AuthLayout({ children }: { children: ReactNode }) {  
//     const supabase = await createClient();  
//     const { data: authData } = await supabase.auth.getUser();  

//     if (authData?.user) {  
//         const { data, error } = await supabase
//             .from('users')  
//             .select('type')  
//             .eq('id', authData.user.id)  
//             .single();  

//         if (error || !data) {  
//             console.error('Error fetching user data', error);  
//             return <>{children}</>;  
//         }  

//         // Redirect to admin if user type matches  
//         if (data.type === ADMIN) {  
//             redirect('/admin');  
//         }  
//     }  

//     return <>{children}</>;  
// }


import { ADMIN } from "@/constants/constants";
import { createClient } from "@/supabase/client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  
  // Fetch the current session to ensure the user is authenticated
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    // If no session, the user is not logged in, so return the children (the login page).
    return <>{children}</>;
  }

  // Fetch user data using the authenticated session
  const { data, error: userError } = await supabase
    .from('users')
    .select('type')
    .eq('id', session.user.id)
    .single();

  if (userError || !data) {
    console.error('Error fetching user data', userError);
    return <>{children}</>;
  }

  // Redirect to admin if user type matches
  if (data.type === ADMIN) {
    redirect('/admin');
  }

  return <>{children}</>;
}
