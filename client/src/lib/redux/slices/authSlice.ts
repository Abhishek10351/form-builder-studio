import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/app/utils/api";
import Cookies from "js-cookie";

// Types
export interface User {
    email: string;
    name: string;
    is_active: boolean;
    is_superuser: boolean;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    email: string;
    name: string;
    password: string;
}

// Initial state
const initialState: AuthState = {
    user: null,
    token: Cookies.get("authToken") || null,
    isLoading: false,
    error: null,
    isAuthenticated: !!Cookies.get("authToken"),
};

// Async thunks
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post("/login", credentials);
            const { access, token_type } = response.data;

            // Store token in cookie
            Cookies.set("authToken", access, { expires: 10 });

            return { token: access, token_type };
        } catch (error: any) {
            // Try different error message paths
            const errorMessage =
                error.response?.data?.message || "Login failed";

            return rejectWithValue(errorMessage);
        }
    }
);

export const signUpUser = createAsyncThunk(
    "auth/signup",
    async (credentials: SignUpCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post("/users/create", credentials);
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Registration failed";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchUserData = createAsyncThunk(
    "auth/fetchUserData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/users/me");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user data"
            );
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            Cookies.remove("authToken");
        },
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            // Sign up cases
            .addCase(signUpUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch user data cases
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                // If fetching user data fails, user might not be authenticated
                const errorMessage = action.payload as string;
                if (
                    errorMessage?.includes("401") ||
                    errorMessage?.includes("Unauthorized")
                ) {
                    state.isAuthenticated = false;
                    state.token = null;
                    Cookies.remove("authToken");
                }
            });
    },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
