import type { FieldType, FormInputValue } from "./field";

export interface FormFieldDefinition {
    id: string;
    label: string;
    field_type: FieldType;
    required: boolean;
    options?: string[];
    multi_select?: boolean;
}

export interface FormDefinition {
    id: string;
    title: string;
    description?: string;
    fields: FormFieldDefinition[];
    createdAt?: string;
    updatedAt?: string;
}

export interface FormFieldProps {
    id: string;
    label: string;
    field_type?: FieldType;
    required?: boolean;
    options?: string[];
    value?: FormInputValue;
    onChange?: (value: FormInputValue) => void;
}
