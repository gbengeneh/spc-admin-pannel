// // src/app/auth/page.tsx  

// 'use client';  

// import { authenticate } from '@/actions/auth';  
// import { Button } from '@/components/ui/button';  
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';  
// import { Input } from '@/components/ui/input';  
// import { zodResolver } from '@hookform/resolvers/zod';  
// import { useRouter } from 'next/navigation';  // Correct use of `useRouter`  
// import { useState } from 'react';  
// import { useForm } from 'react-hook-form';  
// import { z } from 'zod';  

// // Zod schema for form validation  
// const loginSchema = z.object({  
//   email: z.string().email({ message: 'Invalid email address' }),  
//   password: z.string().min(6, { message: 'Password must be at least 6 characters' }),  
// });  

// export default function AuthPage() {  
//   const form = useForm<z.infer<typeof loginSchema>>({  
//     resolver: zodResolver(loginSchema),  
//     defaultValues: {  
//       email: '',  
//       password: '',  
//     },  
//   });  

//   const [isAuthenticating, setIsAuthenticating] = useState(false);  
//   const [authError, setAuthError] = useState<string | null>(null);  
//   const router = useRouter();  // Correctly use `useRouter`  

//   const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {  
//     setIsAuthenticating(true);  
//     setAuthError(null);  
  
//     try {  
//       const { user, session } = await authenticate(email, password); // Updated to get user and session  
  
//       if (session) {  
//         // If the session is established, redirect  
//         router.push('/admin');  
//       } else {  
//         setAuthError('Authentication failed, no session.');  
//       }  
//     } catch (error) {  
//       setAuthError(`Invalid credentials: ${error instanceof Error ? error.message : 'unknown error.'}`);  
//     } finally {  
//       setIsAuthenticating(false);  
//     }  
//   };

//   return (  
//     <div className='flex h-screen items-center justify-center'>  
//       <div className='mx-auto grid w-[350px] gap-6'>  
//         <Form {...form}>  
//           <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>  
//             <FormField  
//               control={form.control}  
//               name='email'  
//               render={({ field }) => (  
//                 <FormItem className='grid gap-2'>  
//                   <FormLabel htmlFor='email'>Email</FormLabel>  
//                   <FormControl>  
//                     <Input  
//                       id='email'  
//                       type='email'  
//                       placeholder='m@example.com'  
//                       {...field}  
//                       disabled={isAuthenticating}  
//                     />  
//                   </FormControl>  
//                   <FormMessage />  
//                 </FormItem>  
//               )}  
//             />  

//             <FormField  
//               control={form.control}  
//               name='password'  
//               render={({ field }) => (  
//                 <FormItem className='grid gap-2'>  
//                   <div className='flex items-center'>  
//                     <FormLabel htmlFor='password'>Password</FormLabel>  
//                   </div>  
//                   <FormControl>  
//                     <Input  
//                       disabled={isAuthenticating}  
//                       id='password'  
//                       type='password'  
//                       autoComplete="current-password"  
//                       {...field}  
//                     />  
//                   </FormControl>  
//                   <FormMessage />  
//                 </FormItem>  
//               )}  
//             />  

//             <Button disabled={isAuthenticating} type='submit' className='w-full'>  
//               Login  
//             </Button>  

//             {authError && <p className="text-red-500">{authError}</p>} {/* Display error messages */}  
//           </form>  
//         </Form>  
//       </div>  
//     </div>  
//   );  
// }

// src/app/auth/page.tsx  
'use client';  

import { authenticate } from '@/actions/auth';  
import { Button } from '@/components/ui/button';  
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';  
import { Input } from '@/components/ui/input';  
import { zodResolver } from '@hookform/resolvers/zod';  
import { useRouter } from 'next/navigation';  
import { useState } from 'react';  
import { useForm } from 'react-hook-form';  
import { z } from 'zod';  

// Zod schema for form validation  
const loginSchema = z.object({  
  email: z.string().email({ message: 'Invalid email address' }),  
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),  
});  

export default function AuthPage() {  
  const form = useForm<z.infer<typeof loginSchema>>({  
    resolver: zodResolver(loginSchema),  
    defaultValues: {  
      email: '',  
      password: '',  
    },  
  });  

  const [isAuthenticating, setIsAuthenticating] = useState(false);  
  const [authError, setAuthError] = useState<string | null>(null);  
  const router = useRouter();  

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {  
    setIsAuthenticating(true);  
    setAuthError(null); // Reset error state  
  
    try {  
      const { user, session } = await authenticate(email, password); // Call the authenticate function  
      console.log("Authenticated User:", user);  
      console.log("Session:", session);  
  
      // Check if session is present to ensure authentication succeeded  
      if (session) {  
        console.log("Redirecting to /admin");  
        router.push('/admin'); // Redirect to the admin page  
      } else {  
        setAuthError('Authentication failed, no session was established.');  
      }  
    } catch (error) {  
      console.error("Authentication error:", error);  
      setAuthError(`Invalid credentials: ${error instanceof Error ? error.message : 'unknown error.'}`);  
    } finally {  
      setIsAuthenticating(false); // Reset authenticating state  
    }  
  }; 

  return (  
    <div className='flex h-screen items-center justify-center'>  
      <div className='mx-auto grid w-[350px] gap-6'>  
        <Form {...form}>  
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>  
            <FormField  
              control={form.control}  
              name='email'  
              render={({ field }) => (  
                <FormItem className='grid gap-2'>  
                  <FormLabel htmlFor='email'>Email</FormLabel>  
                  <FormControl>  
                    <Input  
                      id='email'  
                      type='email'  
                      placeholder='m@example.com'  
                      {...field}  
                      disabled={isAuthenticating}  
                    />  
                  </FormControl>  
                  <FormMessage />  
                </FormItem>  
              )}  
            />  

            <FormField  
              control={form.control}  
              name='password'  
              render={({ field }) => (  
                <FormItem className='grid gap-2'>  
                  <div className='flex items-center'>  
                    <FormLabel htmlFor='password'>Password</FormLabel>  
                  </div>  
                  <FormControl>  
                    <Input  
                      disabled={isAuthenticating}  
                      id='password'  
                      type='password'  
                      autoComplete="current-password"  
                      {...field}  
                    />  
                  </FormControl>  
                  <FormMessage />  
                </FormItem>  
              )}  
            />  

            <Button disabled={isAuthenticating} type='submit' className='w-full'>  
              Login  
            </Button>  

            {authError && <p className="text-red-500">{authError}</p>}  
          </form>  
        </Form>  
      </div>  
    </div>  
  );  
}