"use client"

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../REDUX/Hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;
    const pathname = usePathname();
    const match = pathname?.match(/\/[a-z]+\/(.+)/);

    useEffect(() => {
        if (match?.includes('main')  || match?.includes('profile') || match?.includes('sign-in') || match?.includes('signup') || match?.includes('profile-edit') || match?.includes('notification') || match?.includes('rate'))  {
            if (shouldRedirect) {
                console.log("GoodBye");
                router.push('/sign-in');
            } else {
                console.log("Hello Friend");
                if(match?.includes('sign-in') || match?.includes('signup')) 
                    {
                        router.push('/main');
                    }
            }
        }
    }, [shouldRedirect, match, router]);

    

    return children;
};