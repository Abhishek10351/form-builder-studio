export type FieldType = "text" | "checkbox" | "radio" | "dropdown" | "date";

export interface FormCreateField {
    id: string;
    label: string;
    field_type: FieldType;
    required: boolean;
    options?: string[];
    description?: string;
    isEditing?: boolean;
}

export interface FormCreateState {
    id?: string;
    title: string;
    description?: string;
    fields: FormCreateField[];
    owner_id?: string;
    created_at?: string;
}

export interface FormCreateInputProps {
    field: FormCreateField;
    onFieldChange?: (field: FormCreateField) => void;
    onFieldDelete?: (fieldId: string) => void;
    onFieldDuplicate?: (field: FormCreateField) => void;
}

export interface FormViewInputProps {
    field: FormCreateField;
    onFieldChange?: (field: FormCreateField) => void;
}

export interface FieldTypeOption {
    label: string;
    value: FieldType;
}
