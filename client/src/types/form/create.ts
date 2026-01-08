export type FieldType = "text" | "checkbox" | "radio" | "dropdown" | "date";

export interface FormCreateField {
    id: string;
    label: string;
    field_type: FieldType;
    required: boolean;
    options?: string[];
    placeholder?: string;
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
    field?: FormCreateField;
    onFieldChange?: (field: FormCreateField) => void;
    onFieldDelete?: (fieldId: string) => void;
    onFieldDuplicate?: (field: FormCreateField) => void;
    onFieldUpdate?: (fieldId: string) => void;
}

export interface FormViewInputProps {
    field?: FormCreateField;
    onFieldUpdate?: (fieldId: string) => void;
}

export interface RenderOptionsProps {
    names: string[];
    onOptionChange?: (index: number, value: string) => void;
    onOptionDelete?: (index: number) => void;
    onOptionAdd?: () => void;
}

export interface FieldTypeOption {
    label: string;
    value: FieldType;
}
