import { FieldTypeOption, FormCreateField } from "@/types";

export const FIELD_TYPE_OPTIONS: FieldTypeOption[] = [
    { label: "Text", value: "text" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Radio", value: "radio" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Date", value: "date" },
];

export const STATIC_FORM_FIELDS: FormCreateField[] = [
    {
        id: "field-1",
        label: "Full Name",
        field_type: "text",
        required: true,
        placeholder: "Enter your full name",
        isEditing: false,
    },

    {
        id: "field-4",
        label: "Preferred Contact Method",
        field_type: "dropdown",
        required: false,
        options: ["Email", "Phone", "SMS", "Mail"],
        isEditing: true,
    },
    {
        id: "field-3",
        label: "Gender",
        field_type: "radio",
        required: false,
        options: ["Male", "Female", "Other", "Prefer not to say"],
        isEditing: false,
    },
    {
        id: "field-5",
        label: "Subscribe to newsletter",
        field_type: "checkbox",
        required: false,
        isEditing: false,
    },
    {
        id: "field-6",
        label: "Date of Birth",
        field_type: "date",
        required: false,
        isEditing: false,
    },
];
