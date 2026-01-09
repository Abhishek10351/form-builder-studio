"use client";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { SquareIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldType, FormCreateField, FormViewInputProps } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FIELD_TYPE_OPTIONS } from "./constants";
import { PencilIcon } from "lucide-react";
export const RenderDropdownOptions = ({ names }: { names: string[] }) => {
    return (
        <Select>
            <SelectTrigger className="w-full rounded-md p-2">
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                {names.map((name, index) => (
                    <SelectItem key={index} value={name}>
                        {name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
export const RenderRadioOptions = ({ names }: { names: string[] }) => {
    return (
        <RadioGroup className="flex flex-col gap-2">
            {names.map((name, index) => (
                <div
                    key={index}
                    className="flex flex-row justify-between items-center gap-2 "
                >
                    <div className="flex items-center basis-auto grow">
                        <RadioGroupItem value={name} className="mr-2" />
                        <Label>{name}</Label>
                    </div>
                </div>
            ))}
        </RadioGroup>
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
