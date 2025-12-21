import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormFieldProps } from "@/types";

export default function FormSubmitField({
    label,
    placeholder,
    field_type = "text",
    required,
    options,
    value,
    onChange,
}: FormFieldProps) {
    const renderInput = () => {
        switch (field_type) {
            case "text":
            case "date":
                return (
                    <Input
                        type={field_type}
                        placeholder={placeholder}
                        required={required}
                        value={value as string}
                        onChange={(e) => onChange?.(e.target.value)}
                        className="border-0 border-b-2 border-gray-300 rounded-none p-2 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    />
                );

            case "checkbox":
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`checkbox-${label}`}
                            checked={value as boolean}
                            onCheckedChange={(checked) =>
                                onChange?.(checked as boolean)
                            }
                        />
                        <Label
                            htmlFor={`checkbox-${label}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {placeholder || "Check this box"}
                        </Label>
                    </div>
                );

            case "radio":
                return (
                    <RadioGroup
                        value={value as string}
                        onValueChange={(value) => onChange?.(value)}
                    >
                        {options?.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={option}
                                    id={`radio-${label}-${index}`}
                                />
                                <Label
                                    htmlFor={`radio-${label}-${index}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            case "dropdown":
                return (
                    <Select
                        value={value as string}
                        onValueChange={(value) => onChange?.(value)}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={placeholder || "Select an option"}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {options?.map((option, index) => (
                                <SelectItem key={index} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
        }
    };

    return (
        <div className="space-y-2 border p-4 rounded-md ">
            <Label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderInput()}
        </div>
    );
}
