"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder?: string;
    register: UseFormRegister<T>;
    rules?: RegisterOptions<T>;
    error?: string;
};

export default function FormPasswordInput<T extends FieldValues>({
    name,
    label,
    placeholder = "Password",
    register,
    rules,
    error,
}: Props<T>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex w-full flex-col gap-2">
            <Label htmlFor={name}>{label}</Label>

            <InputGroup className="bg-background border border-input rounded-md">
                <InputGroupInput
                    id={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="text-sm"
                    {...register(name, rules)}
                />

                <InputGroupAddon
                    align="inline-end"
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    ) : (
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    )}
                </InputGroupAddon>
            </InputGroup>

            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}
