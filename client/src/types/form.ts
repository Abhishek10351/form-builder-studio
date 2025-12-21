// Form Builder Types

export type FieldType = "text" | "checkbox" | "radio" | "dropdown" | "date";
export type FormSubmitValue = string | boolean | string[] | Date;

export interface FormField {
    id?: string;
    label: string;
    field_type: FieldType;
    required: boolean;
    options?: string[];
    multi_select?: boolean;
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
    id?: string;
    label: string;
    placeholder?: string;
    type?: FieldType;
    required?: boolean;
    options?: string[];
    value?: FormSubmitValue;
    onChange?: (value: FormSubmitValue) => void;
    description?: string;
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
