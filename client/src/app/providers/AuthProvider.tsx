"use client";

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchUserData } from "@/lib/redux/slices/authSlice";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, user, token, isLoading } = useAppSelector(
        (state) => state.auth
    );
    const hasFetchedRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (
            isAuthenticated &&
            token &&
            !user &&
            !isLoading &&
            !hasFetchedRef.current
        ) {
            timeoutRef.current = setTimeout(() => {
                if (!hasFetchedRef.current) {
                    hasFetchedRef.current = true;
                    dispatch(fetchUserData()).finally(() => {
                        setTimeout(() => {
                            if (!user) hasFetchedRef.current = false;
                        }, 5000);
                    });
                }
            }, 100);
        }

        if (!isAuthenticated || !token) {
            hasFetchedRef.current = false;
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [dispatch, isAuthenticated, token, user, isLoading]);

    return <>{children}</>;
};