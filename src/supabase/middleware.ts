// import { createServerClient } from '@supabase/ssr';
// import { NextResponse, type NextRequest } from 'next/server';
// import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';


// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             request.cookies.set(name, value)
//           );
//           supabaseResponse = NextResponse.next({
//             request,
//           });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           );
//         },
//       },
//     }
//   );

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {  
//     const url = request.nextUrl.clone();  
//     url.pathname = '/admin'; // redirect to admin page  
//     return NextResponse.redirect(url);  
// }  

//   if (
//     !user &&
//     !request.nextUrl.pathname.startsWith('/login') &&
//     !request.nextUrl.pathname.startsWith('/auth') &&
//     request.nextUrl.pathname !== '/'
//   ) {
    
//     const url = request.nextUrl.clone();
//     url.pathname = '/auth';
//     return NextResponse.redirect(url);
//   }
//   return supabaseResponse;
// }

import { createServerClient } from '@supabase/ssr';  
import { NextResponse, type NextRequest } from 'next/server';  

export async function updateSession(request: NextRequest) {  
    const supabase = createServerClient(  
        process.env.NEXT_PUBLIC_SUPABASE_URL!,  
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,  
        {  
            cookies: {  
                getAll() {  
                    return request.cookies.getAll();  
                },  
                setAll(cookiesToSet) {  
                    cookiesToSet.forEach(({ name, value, options }) =>  
                        request.cookies.set(name, value) // Ensure options are applied  
                    );  
                },  
            },  
        }  
    );  

    const { data: { user } } = await supabase.auth.getUser();  

    console.log("Current Path:", request.nextUrl.pathname);  
    console.log("Authenticated User:", user);  

    // Skip middleware for static assets or APIs  
    if (  
        request.nextUrl.pathname.startsWith('/_next') ||  
        request.nextUrl.pathname.startsWith('/api') ||  
        /\.(.*)$/.test(request.nextUrl.pathname)  
    ) {  
        console.log("Skipping middleware for:", request.nextUrl.pathname);  
        return NextResponse.next();  
    }  

    // Allow access if user is authenticated and already on /admin  
    if (user && request.nextUrl.pathname === '/admin') {  
        console.log("Authenticated user on admin route. Allowing access.");  
        return NextResponse.next();  
    }  

    // Redirect authenticated users to /admin if not already there  
    if (user) {  
        const url = request.nextUrl.clone();  
        if (request.nextUrl.pathname !== '/admin') {  
            url.pathname = '/admin';  
            console.log("Redirecting authenticated user to /admin.");  
            return NextResponse.redirect(url);  
        }  
    }  

    // Redirect unauthenticated users to /auth  
    if (  
        !user &&  
        !request.nextUrl.pathname.startsWith('/login') &&  
        !request.nextUrl.pathname.startsWith('/auth') &&  
        request.nextUrl.pathname !== '/'  
    ) {  
        const url = request.nextUrl.clone();  
        url.pathname = '/auth';  
        console.log("Redirecting unauthenticated user to /auth.");  
        return NextResponse.redirect(url);  
    }  

    return NextResponse.next();  
}