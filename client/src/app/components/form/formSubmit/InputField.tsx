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
import { FormSubmitFieldProps } from "@/types";

export default function FormSubmitField({
    label,
    field_type = "text",
    required,
    options,
    value,
    onChange,
}: FormSubmitFieldProps) {
    const renderInput = () => {
        switch (field_type) {
            case "text":
            case "date":
                return (
                    <Input
                        type={field_type}
                        required={required}
                        value={value as string | ""}
                        onChange={(e) => onChange?.(e.target.value)}
                    />
                );

            case "checkbox":
                return (
                    <div className="flex items-center space-x-2">
                        {options?.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`checkbox-${label}-${index}`}
                                    checked={
                                        Array.isArray(value)
                                            ? (value as string[]).includes(
                                                  option
                                              )
                                            : false
                                    }
                                    onCheckedChange={(checked) =>
                                        onChange?.(
                                            checked
                                                ? Array.isArray(value)
                                                    ? [...value, option]
                                                    : [option]
                                                : Array.isArray(value)
                                                ? value.filter(
                                                      (v) => v !== option
                                                  )
                                                : []
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`checkbox-${label}-${index}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </div>
                );

            case "radio":
                return (
                    <RadioGroup
                        value={value as string | ""}
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
                        value={value as string | ""}
                        onValueChange={(value) => onChange?.(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={`Select an option`} />
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
        <div className="border p-4 py-6 rounded-md bg-card flex flex-col items-start gap-4 w-full">
            <Label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-0">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderInput()}
        </div>
    );
}
