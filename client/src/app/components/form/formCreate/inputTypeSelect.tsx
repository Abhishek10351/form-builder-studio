import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";

import { FIELD_TYPE_OPTIONS } from "./constants";

interface InputTypeSelectProps {
    value: string;
    onChange: (value: string) => void;
}
export default function InputTypeSelect({
    value,
    onChange,
}: InputTypeSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-32 rounded-md p-4 h-auto">
                <SelectValue placeholder="Select field type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {FIELD_TYPE_OPTIONS.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                            {field.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}