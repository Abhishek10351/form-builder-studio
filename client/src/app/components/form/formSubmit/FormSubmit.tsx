"use client";
import FormField from "./InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/types";
import { useEffect, useState } from "react";
import { FormFieldProps, FormSubmitValue } from "@/types";
export default function FormSubmit({ title, description, fields }: Form) {
    const [formData, setFormData] = useState<FormFieldProps[]>(fields);
    useEffect(() => {
        const initialFormData = fields.map((field) => ({
            ...field,
            value: field.field_type === "checkbox" ? false : "",
        }));
        setFormData(initialFormData);
    }, [fields]);

    const updateFieldValue = (id: string, value: FormSubmitValue) => {
        const updatedFormData = [...formData];
        const fieldIndex = updatedFormData.findIndex(
            (field) => field.id === id
        );
        if (fieldIndex !== -1) {
            updatedFormData[fieldIndex].value = value;
        }
        setFormData(updatedFormData);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 min-h-screen mt-24 bg-background mb-12">
            <div className="mb-4 border-2 p-4 rounded-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-100">
                    {title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {description}
                </p>
            </div>
            <form className="space-y-4">
                {formData.map((field, index) => (
                    <FormField
                        key={index}
                        {...field}
                        onChange={(value: FormSubmitValue) =>
                            updateFieldValue(field.id!, value)
                        }
                    />
                ))}
                <div className="pt-6">
                    <Button type="submit" className="w-full cursor-pointer">
                        Submit Form
                    </Button>
                </div>
            </form>
        </div>
    );
}
