import { Footer } from "@/components/footer";  
import { Header } from "@/components/header";  
import { RenderMounted } from "@/components/render-mounted";  
import { ADMIN } from "@/constants/constants";  
import { createClient } from "@/supabase/server";  
import { redirect } from "next/navigation";  
import { ReactNode } from "react";  
// import { revalidatePath } from "next/cache";

// export async function revalidate() {  
//     revalidatePath('/', 'layout');  
// }  

export default async function AdminLayout({  
    children,  
}: Readonly<{  
    children: ReactNode;  
}>) {  
    const supabase = await createClient();  
    const { data: authData } = await supabase.auth.getUser();  

    if (authData?.user) {  
        const { data, error } = await supabase  
            .from('users')  
            .select('*')  
            .eq('id', authData.user.id)  
            .single();  

        // Log error and user data for debugging  
        if (error || !data) {  
           
            return redirect('/auth'); // Consider redirecting to auth page on error  
        }  

       

        // Check user type and redirect accordingly  
        if (data.type === ADMIN) {  
             
            return redirect('/'); // Redirect admins to the homepage  
        }  
    } else {  
        
        return redirect('/auth');  
    }  

    return (  
        <RenderMounted>  
            <Header />  
            <main className="min-h-[calc(100svh-128px)] py-3">{children}</main>  
            <Footer />  
        </RenderMounted>  
    );  
}