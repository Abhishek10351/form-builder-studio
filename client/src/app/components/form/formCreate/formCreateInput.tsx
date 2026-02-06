"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TrashIcon, CopyIcon, XIcon, SquareIcon } from "lucide-react";
import TextareaAutoSize from "react-textarea-autosize";
import { Input } from "@/components/ui/input";
import { FieldType, FormCreateInputProps } from "@/types";
import InputTypeSelect from "./inputTypeSelect";

export const RenderOptionsInput = ({
    field,
    onOptionsUpdate,
}: FormCreateInputProps & {
    onOptionsUpdate?: (options: string[]) => void;
}) => {
    const [optionNames, setOptionNames] = useState<string[]>(
        field.options || []
    );

    const updateOptions = (updatedOptions: string[]) => {
        setOptionNames(updatedOptions);
        onOptionsUpdate?.(updatedOptions);
    };

    return (
        <ol className="list-decimal pl-5 flex flex-col gap-2">
            {optionNames.map((name, index) => (
                <li key={`option-${index}`}>
                    <div className="flex justify-between items-center gap-2">
                        <Input
                            className="border-0"
                            value={name}
                            onChange={(e) => {
                                const updated = [...optionNames];
                                updated[index] = e.target.value;
                                updateOptions(updated);
                            }}
                        />
                        <XIcon
                            className="w-4 h-4 cursor-pointer hover:text-red-500 basis-4"
                            onClick={() =>
                                updateOptions(
                                    optionNames.filter((_, i) => i !== index)
                                )
                            }
                        />
                    </div>
                </li>
            ))}
            <li className="mt-2">
                <button
                    className="text-primary underline cursor-pointer"
                    onClick={() =>
                        updateOptions([
                            ...optionNames,
                            `Option ${optionNames.length + 1}`,
                        ])
                    }
                >
                    Add Option
                </button>
            </li>
        </ol>
    );
};

export const RenderFieldInput = ({
    field,
    onOptionsUpdate,
}: Pick<FormCreateInputProps, "field"> & {
    onOptionsUpdate?: (options: string[]) => void;
}) => {
    const { field_type: fieldType } = field;

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
        case "radio":
        case "dropdown":
            return (
                <RenderOptionsInput
                    field={field}
                    onOptionsUpdate={onOptionsUpdate}
                />
            );
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
    const [options, setOptions] = useState<string[]>(field.options || []);

    const handleOptionsChange = (newOptions: string[]) => {
        setOptions(newOptions);
    };

    const handleSave = () => {
        onFieldChange?.({
            ...field,
            label,
            field_type: selectedField,
            required,
            options,
            isEditing: false,
        });
    };

    return (
        <div className="border rounded-lg mx-auto px-4 py-8 overflow-y-auto flex flex-col gap-4 bg-card w-full">
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
                field={{ ...field, field_type: selectedField, options }}
                onOptionsUpdate={handleOptionsChange}
            />
            <Separator />
            <div className="flex items-center flex-row">
                <div className="flex flex-row items-center grow gap-4">
                    <CopyIcon
                        className="cursor-pointer hover:text-blue-500 w-5 h-5"
                        onClick={() => onFieldDuplicate?.(field)}
                    />
                    <TrashIcon
                        className="cursor-pointer hover:text-red-500 w-5 h-5"
                        onClick={() => onFieldDelete?.(field.id)}
                    />
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
                    <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-sm"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
