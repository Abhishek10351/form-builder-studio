"use client";

import { Input } from "@/components/ui/input";
import { FieldType, FormViewInputProps } from "@/types";
import { SquareIcon, PencilIcon, CircleIcon } from "lucide-react";

const RenderOptions = ({
    names,
    showIcon,
}: {
    names: string[];
    showIcon?: boolean;
}) => (
    <ol
        className={`flex flex-col gap-2 ${showIcon ? "" : "list-decimal pl-5"}`}
    >
        {names.map((name, index) => (
            <li key={index} className="flex items-center gap-2">
                {showIcon && (
                    <CircleIcon className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                )}
                <span className="text-muted-foreground">{name}</span>
            </li>
        ))}
    </ol>
);

const renderFieldInput = (fieldType: FieldType, options?: string[]) => {
    switch (fieldType) {
        case "text":
            return (
                <Input
                    className="disabled:border"
                    disabled
                    placeholder="Answer"
                />
            );
        case "checkbox":
            return (
                <div className="flex items-center gap-2">
                    <SquareIcon className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                    <span className="text-muted-foreground">Option</span>
                </div>
            );
        case "radio":
            return <RenderOptions names={options || []} showIcon />;
        case "dropdown":
            return <RenderOptions names={options || []} />;
        case "date":
            return <Input type="date" className="disabled:border" disabled />;
        default:
            return null;
    }
};
export default function FormViewInput({
    field,
    onFieldChange,
}: FormViewInputProps) {
    return (
        <div className="border rounded-lg mb-4 mx-auto px-4 py-8 flex flex-col gap-4 relative bg-card">
            <button
                onClick={() =>
                    onFieldChange?.({ ...field, isEditing: !field.isEditing })
                }
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                title="Edit field"
            >
                <PencilIcon className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
            </div>
            {renderFieldInput(field.field_type, field.options)}
        </div>
    );
}
