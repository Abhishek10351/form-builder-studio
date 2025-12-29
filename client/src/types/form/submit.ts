
export type FieldType = "text" | "checkbox" | "radio" | "dropdown" | "date";
export type FormSubmitValue = string | boolean | string[] | Date;

export interface FormSubmitField {
    id?: string;
    label: string;
    field_type: FieldType;
    required: boolean;
    options?: string[];
    multi_select?: boolean;
}

export interface FormSubmit {
    id?: string;
    title: string;
    description?: string;
    fields: FormSubmitField[];
    createdAt?: string;
    updatedAt?: string;
}

export interface FormSubmitFieldProps {
    id?: string;
    label: string;
    field_type?: FieldType;
    required?: boolean;
    options?: string[];
    value?: FormSubmitValue;
    onChange?: (value: FormSubmitValue) => void;
}

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
