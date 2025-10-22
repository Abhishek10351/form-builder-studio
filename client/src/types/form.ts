// Form Builder Types

export type FieldType = "text" | "checkbox" | "radio" | "dropdown" | "date";

export interface FormField {
    id?: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required: boolean;
    options?: string[];
    description?: string;
}

export interface Form {
    id?: string;
    title: string;
    description?: string;
    fields: FormField[];
    createdAt?: string;
    updatedAt?: string;
}

export interface FormFieldProps {
    label: string;
    placeholder?: string;
    type?: FieldType;
    required?: boolean;
    options?: string[];
    value?: string | boolean | string[] | Date;
    onChange?: (value: string | boolean | string[] | Date) => void;
    description?: string;
}

export interface FormFieldRendererProps extends Form {
    onSubmit?: (data: Record<string, any>) => void;
}

// Utility types for better type safety
export type FormFieldValue = string | boolean | string[] | Date | null;

export interface SubmissionField {
    fieldId: string;
    value: FormFieldValue;
}
export interface FormSubmission {
    id?: string;
    form_id: string;
    data: SubmissionField[];
    submitted_at?: string;
    submitted_by?: string;
}
