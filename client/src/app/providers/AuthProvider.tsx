"use client";

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
    fetchUserData,
    type User,
    type AuthState,
} from "@/lib/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const dispatch: AppDispatch = useAppDispatch();
    const { isAuthenticated, user, token, isLoading }: AuthState =
        useAppSelector((state: RootState) => state.auth);
    const hasFetchedRef = useRef<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        console.log("AuthProvider state:", {
            isAuthenticated,
            token: !!token,
            user: !!user,
            isLoading,
            hasFetched: hasFetchedRef.current,
        });

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // If we have a token but no user data, haven't fetched yet, and not loading, fetch it
        if (
            isAuthenticated &&
            token &&
            !user &&
            !isLoading &&
            !hasFetchedRef.current
        ) {
            console.log("Scheduling fetchUserData");

            // Add a small delay to prevent rapid-fire requests
            timeoutRef.current = setTimeout((): void => {
                if (!hasFetchedRef.current) {
                    console.log("Triggering fetchUserData");
                    hasFetchedRef.current = true;
                    dispatch(fetchUserData()).finally((): void => {
                        // Reset the flag after a delay to allow retries if needed
                        setTimeout((): void => {
                            if (!user) {
                                hasFetchedRef.current = false;
                            }
                        }, 5000);
                    });
                }
            }, 100);
        }

        // Reset flag when user data is cleared (logout)
        if (!isAuthenticated || !token) {
            hasFetchedRef.current = false;
        }

        return (): void => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [dispatch, isAuthenticated, token, user, isLoading]);

    return <>{children}</>;
};