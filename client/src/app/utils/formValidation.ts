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
    },

    signUpPassword: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
        },
    },

    confirmPassword: (password: string) => ({
        required: "Please confirm your password",
        validate: (value: string) =>
            value === password || "Passwords do not match",
    }),
};
