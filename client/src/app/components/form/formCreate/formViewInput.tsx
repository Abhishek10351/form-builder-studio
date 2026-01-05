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
const fields = [
    { label: "Text", value: "text" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Radio", value: "radio" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Date", value: "date" },
];
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const optionsNames = ["Option 1", "Option 2", "Option 3"];
const renderFieldInput = (fieldType: string) => {
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
            return <RenderRadioOptions names={optionsNames} />;
        case "dropdown":
            return <RenderDropdownOptions names={optionsNames} />;
        case "date":
            return <Input type="date" className="disabled:border" disabled />;
        default:
            return null;
    }
};
export default function FormViewInput() {
    const [selectedField, setSelectedField] = useState(fields[0].value);

    useEffect(() => {}, [selectedField]);

    return (
        <div className="border rounded-lg mb-4 mx-auto px-4 py-8 overflow-y-auto flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <div className="flex gap-2">
                    Question <div className="text-red-500">*</div>
                </div>
                <div>
                    <Select
                        value={selectedField}
                        onValueChange={setSelectedField}
                    >
                        <SelectTrigger className="w-[8rem] rounded-md p-2">
                            <SelectValue placeholder="Select field type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {fields.map((field) => (
                                    <SelectItem
                                        key={field.value}
                                        value={field.value}
                                    >
                                        {field.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {renderFieldInput(selectedField)}
        </div>
    );
}
