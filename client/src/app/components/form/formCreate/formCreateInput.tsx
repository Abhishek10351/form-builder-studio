"use client";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Trash } from "lucide-react";
import { TrashIcon } from "lucide-react";
const fields = [
    { label: "Text", value: "text" },
    { label: "Number", value: "number" },
    { label: "Email", value: "email" },
    { label: "Date", value: "date" },
];
export default function FormCreateInput() {
    return (
        <div className="mb-4 mx-auto p-4 h-48 overflow-y-auto">
            <Input
                placeholder="Question"
                className="border-0 border-b-2 border-gray-300 rounded-none p-2 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                
            />
            <div className="my-4 g-white rounded-lg">
                <Select defaultValue={fields[0].value}>
                    <SelectTrigger className="border-1 w-[8rem] border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
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

            <Separator className="my-4" />
            <div className="flex items-center justiy-between flex-row">
                <div className="">
                    <TrashIcon className="cursor-pointer" />
                </div>
                <div className="bg-red-200 w-0.5 h-full mx-4">

                </div>
                <Separator className="bg-red-200 w-2 h-full" orientation="vertical" decorative />
                <div className="gap-2 mb-4 flex items-center">
                    <Switch id="required-switch" />
                    <Label htmlFor="required-switch">Required</Label>
                </div>
            </div>
        </div>
    );
}
