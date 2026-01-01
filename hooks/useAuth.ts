"use client";

import { useState } from "react";
import { authApi } from "@/lib/api/auth";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: {
        name: string,
        email: string,
        password: string;
    }) => {
        try {
            setLoading(true);
            setError(null);

            const res = await authApi.register(data);
            return res;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: {
        email: string;
        password: string;
    }) => {
        try {
            setLoading(true);
            setError(null);

            const res = await authApi.login(data);
            return res;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
 
    const verifyOtp = async (data: { userId: string; otp: string }) => {
        setLoading(true);
        try {
            return await authApi.verifyOtp(data);
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        login,
        verifyOtp,
        loading,
        error,
    };
}
