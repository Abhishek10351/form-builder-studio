"use client";

import { Input } from "@/components/ui/input";
import { FieldType, FormViewInputProps } from "@/types";
import { SquareIcon, PencilIcon, CircleIcon } from "lucide-react";
export const RenderDropdownOptions = ({ names }: { names: string[] }) => {
    return (
        <ol className="flex flex-col gap-2 list-decimal pl-5">
            {names.map((name, index) => (
                <li key={index}>
                    <div className="flex items-center gap-2">
                        <div className="text-muted-foreground">{name}</div>
                    </div>
                </li>
            ))}
        </ol>
    );
};
export const RenderRadioOptions = ({ names }: { names: string[] }) => {
    return (
        <ol className="flex flex-col gap-2">
            {names.map((name, index) => (
                <li key={index}>
                    <div className="flex items-center gap-2">
                        <CircleIcon className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        <div className="text-muted-foreground">{name}</div>
                    </div>
                </li>
            ))}
        </ol>
    );
};

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
                <>
                    <div className="flex items-center gap-2">
                        <SquareIcon className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        <div className="text-muted-foreground">Option</div>
                    </div>
                </>
            );
        case "radio":
            return <RenderRadioOptions names={options || []} />;
        case "dropdown":
            return <RenderDropdownOptions names={options || []} />;
        case "date":
            return <Input type="date" className="disabled:border" disabled />;
        default:
            return null;
    }
};
export default function FormViewInput({
    field,
    onFieldUpdate,
}: FormViewInputProps) {
    if (!field) return null;

    return (
        <div className="border rounded-lg mb-4 mx-auto px-4 py-8 overflow-y-auto flex flex-col gap-4 relative">
            <button
                onClick={() => onFieldUpdate?.(field.id)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                title="Edit field"
            >
                <PencilIcon className="w-4 h-4" />
            </button>
            <div className="flex flex-row gap-4">
                <div className="flex gap-2">
                    {field.label}{" "}
                    {field.required && <div className="text-red-500">*</div>}
                </div>
            </div>

            {renderFieldInput(field.field_type, field?.options)}
        </div>
    );
}
