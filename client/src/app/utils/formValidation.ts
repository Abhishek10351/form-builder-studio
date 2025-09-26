// Form data types
export type LoginFormData = {
    email: string;
    password: string;
};

export type SignUpFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// Common validation patterns
export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const STRONG_PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

// Validation rules for form fields
export const validationRules = {
    name: {
        required: "Name is required",
        minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
        },
    },

    email: {
        required: "Email is required",
        pattern: {
            value: EMAIL_PATTERN,
            message: "Invalid email address",
        },
    },

    loginPassword: {
        required: "Password is required",
        // minLength: {
        //     value: 6,
        //     message: "Password must be at least 6 characters",
        // },
    },

    signUpPassword: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
        },
        // pattern: {
        //     value: STRONG_PASSWORD_PATTERN,
        //     message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        // }
    },

    confirmPassword: (password: string) => ({
        required: "Please confirm your password",
        validate: (value: string) =>
            value === password || "Passwords do not match",
    }),
};

// Form submission handlers
export const handleFormError = (error: unknown, context: string) => {
    console.error(`${context} error:`, error);

    // You can extend this to handle different types of errors
    if (error instanceof Error) {
        // Handle specific error types
        return error.message;
    }

    return `An error occurred during ${context.toLowerCase()}`;
};

// Form submission result type
export type SubmitResult<T = any> = {
    success: boolean;
    data: T | null;
    error: string | null;
};

// Generic form submission wrapper
export const submitForm = async <T>(
    data: T,
    apiCall: (data: T) => Promise<any>,
    context: string
): Promise<SubmitResult> => {
    try {
        console.log(`${context} data:`, data);
        const response = await apiCall(data);
        console.log(`${context} response:`, response);
        return { success: true, data: response.data, error: null };
    } catch (error: any) {
        // console.error(`${context} error:`, error);
        let data: any;
        if (error.response?.data) {
            data = error.response.data;
        }

        let errorMessage: string;
        if (typeof data === "string") {
            errorMessage = data;
        } else if (data?.message) {
            errorMessage = data.message;
        } else {
            errorMessage = `An error occurred during ${context.toLowerCase()}`;
        }

        return { success: false, data: null, error: errorMessage };
    }
};

// Redirect utility function
export const redirectAfterDelay = (
    router: any,
    path: string,
    delay: number = 1500
) => {
    setTimeout(() => {
        router.push(path);
    }, delay);
};
