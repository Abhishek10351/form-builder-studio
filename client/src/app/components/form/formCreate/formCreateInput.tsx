"use client";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    TrashIcon,
    EllipsisVerticalIcon,
    CopyIcon,
    XIcon,
    CircleIcon,
    SquareIcon,
} from "lucide-react";
import TextareaAutoSize from "react-textarea-autosize";
import { Input } from "@/components/ui/input";
import { FieldType, FormCreateInputProps, FormCreateField } from "@/types";
import InputTypeSelect from "./inputTypeSelect";

export const RenderOptionsInput = ({
    field,
    onFieldChange,
}: FormCreateInputProps) => {
    const [optionNames, setOptionNames] = useState<string[]>(
        field.options || []
    );

    const deleteOption = (index: number) => {
        const updatedOptions = optionNames.filter((_, i) => i !== index);
        setOptionNames(updatedOptions);
        onFieldChange &&
            onFieldChange({
                ...field!,
                options: updatedOptions,
            } as FormCreateField);
    };

    const updateOption = (index: number, value: string) => {
        const updatedOptions = [...optionNames];
        updatedOptions[index] = value;
        setOptionNames(updatedOptions);
        onFieldChange &&
            onFieldChange({
                ...field!,
                options: updatedOptions,
            } as FormCreateField);
    };

    const addOption = () => {
        const updatedOptions = [
            ...optionNames,
            `Option ${optionNames.length + 1}`,
        ];
        setOptionNames(updatedOptions);
        onFieldChange &&
            onFieldChange({
                ...field!,
                options: updatedOptions,
            } as FormCreateField);
    };

    return (
        <ol className="list-decimal pl-5 flex flex-col gap-2">
            {optionNames.map((name, index) => (
                <li key={`${field.id}-option-${index}-${name}`}>
                    <div className="flex justify-between items-center gap-2">
                        <Input
                            className="border-0"
                            value={name}
                            onChange={(e) =>
                                updateOption(index, e.target.value)
                            }
                        />
                        <XIcon
                            className="w-4 h-4 cursor-pointer hover:text-red-500 basis-4"
                            onClick={() => deleteOption(index)}
                        />
                    </div>
                </li>
            ))}
            <li className="mt-2 cursor-grab">
                <button
                    className="text-primary underline cursor-pointer"
                    onClick={addOption}
                >
                    Add Option
                </button>
            </li>
        </ol>
    );
};

export const RenderFieldInput = ({
    field,
    onFieldChange,
    onFieldDelete,
    onFieldDuplicate,
}: FormCreateInputProps) => {
    const { field_type: fieldType, options } = field;
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
        case "dropdown":
            return <RenderOptionsInput {...{ field, onFieldChange }} />;
        case "date":
            return <Input type="date" className="disabled:border" disabled />;
        default:
            return null;
    }
};

export default function FormCreateInput({
    field,
    onFieldChange,
    onFieldDelete,
    onFieldDuplicate,
}: FormCreateInputProps) {
    const [selectedField, setSelectedField] = useState<FieldType>(
        field.field_type
    );
    const [label, setLabel] = useState(field.label || "");
    const [required, setRequired] = useState(field.required || false);
    const options = field.options || [];

    useEffect(() => {
        if (onFieldChange && field) {
            onFieldChange({
                ...field,
                label,
                field_type: selectedField,
                required,
                options,
            });
        }
    }, [selectedField, label, required]);

    return (
        <div className="border rounded-lg mb-4 mx-auto px-4 py-8 overflow-y-auto flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <TextareaAutoSize
                    placeholder="Question"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="border resize-none rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <div>
                    <InputTypeSelect
                        value={selectedField}
                        onChange={(value) =>
                            setSelectedField(value as FieldType)
                        }
                    />
                </div>
            </div>

            <RenderFieldInput
                field={field}
                onFieldChange={onFieldChange}
                onFieldDelete={onFieldDelete}
            />
            <Separator />
            <div className="flex items-center flex-row">
                <div className="flex flex-row items-center grow gap-4">
                    <span title="Duplicate field">
                        <CopyIcon
                            className="cursor-pointer hover:text-blue-500 w-5 aspect-square"
                            onClick={() => onFieldDuplicate?.(field)}
                        />
                    </span>
                    <span title="Delete field">
                        <TrashIcon
                            className="cursor-pointer hover:text-red-500 w-5 aspect-square"
                            onClick={() => onFieldDelete?.(field.id)}
                        />
                    </span>
                </div>
                <div className="flex flex-row mx-4 basis-8 gap-4">
                    <Separator className="mx4" orientation="vertical" />
                    <div className="gap-2 flex items-center">
                        <Switch
                            id="required-switch"
                            checked={required}
                            onCheckedChange={setRequired}
                        />
                        <Label htmlFor="required-switch">Required</Label>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onFieldChange?.({ ...field, isEditing: !field.isEditing } )}
                            className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-sm"
                        >
                            Save
                        </button>
                        <EllipsisVerticalIcon className="cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
