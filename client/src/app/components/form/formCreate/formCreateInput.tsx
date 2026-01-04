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
const fields = [
    // text, checkbox, radio, date, dropdown
    { label: "Text", value: "text" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Radio", value: "radio" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Date", value: "date" },
];
export const RenderDropdownOptions = ({ names }: { names: string[] }) => {
    return (
        <ol className="list-decimal pl-5 flex flex-col gap-2">
            {names.map((name, index) => (
                <li key={index}>
                    <div className="flex justify-between items-center gap-2">
                        <Input className="border-0" defaultValue={name} />
                        <XIcon className="w-4 h-4 cursor-pointer hover:text-red-500 basis-4" />
                    </div>
                </li>
            ))}
        </ol>
    );
};
export const RenderRadioOptions = ({ names }: { names: string[] }) => {
    return (
        <ol className="list-none flex flex-col gap-2">
            {names.map((name, index) => (
                <li
                    key={index}
                    className="flex flex-row justify-between items-center gap-2 "
                >
                    <div className="flex items-center basis-auto grow">
                        <CircleIcon className="w-4 h-4 mr-2 inline-block text-gray-300 dark:text-gray-600" />

                        <Input className="border-0" defaultValue={name} />
                    </div>
                    <XIcon className="w-4 h-4 cursor-pointer hover:text-red-500 basis-4 " />
                </li>
            ))}
        </ol>
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
            return (
                <Input
                    type="date"
                    className="disabled:border"
                    disabled
                />
            );
        default:
            return null;
    }
};
export default function FormCreateInput() {
    const [selectedField, setSelectedField] = useState(fields[0].value);

    useEffect(() => {}, [selectedField]);

    return (
        <div className="mb-4 mx-auto px-2 py-2 overflow-y-auto flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <TextareaAutoSize
                    placeholder="Question"
                    className="border resize-none rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
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
            <Separator />
            <div className="flex items-center flex-row">
                <div className="flex flex-row items-center grow gap-4">
                    <CopyIcon className="cursor-pointer hover:text-blue-500 w-5 aspect-square" />
                    <TrashIcon className="cursor-pointer hover:text-red-500 w-5 aspect-square" />
                </div>
                <div className="flex flex-row mx-4 basis-8 gap-4">
                    <Separator className="mx4" orientation="vertical" />
                    <div className="gap-2 flex items-center">
                        <Switch id="required-switch" />
                        <Label htmlFor="required-switch">Required</Label>
                    </div>
                    <div className="">
                        <EllipsisVerticalIcon className="cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
