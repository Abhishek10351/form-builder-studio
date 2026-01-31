"use client";

import FormField from "./InputField";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/types";
import { useEffect, useState } from "react";
import { FormSubmitFieldProps, FormSubmitValue } from "@/types";
import { api } from "@/app/utils";

export default function FormSubmitPage({
    formId,
    title,
    description,
    fields,
}: FormSubmit & { formId: string }) {
    const [formData, setFormData] = useState<FormSubmitFieldProps[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!fields || fields.length === 0) return;

        const initialFormData = fields.map((field) => ({
            ...field,
            value:
                field.field_type === "checkbox"
                    ? false
                    : field.field_type === "radio" ||
                      field.field_type === "dropdown"
                    ? ""
                    : "",
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!formData || formData.length === 0) {
            setError("No form data to submit");
            return;
        }

        // Validate and format data
        const validationErrors: string[] = [];
        const formattedData = formData
            .map((field) => {
                // Skip validation for non-required fields with empty values
                if (!field.required && (!field.value || field.value === "")) {
                    return null;
                }

                // Validate required fields
                if (field.required) {
                    const value = field.value;
                    let isEmpty = false;

                    if (value === null || value === undefined) {
                        isEmpty = true;
                    } else if (typeof value === "boolean") {
                        isEmpty = false; // checkbox always has a value
                    } else if (typeof value === "string") {
                        isEmpty = value.trim() === "";
                    } else if (Array.isArray(value)) {
                        isEmpty = value.length === 0;
                    }

                    if (isEmpty) {
                        validationErrors.push(
                            field.label || `Field ${field.id}`
                        );
                        return null;
                    }
                }

                // Format the value based on field type
                let formattedValue = field.value;

                if (
                    field.field_type === "text" ||
                    field.field_type === "dropdown"
                ) {
                    // Trim whitespace from text fields
                    formattedValue =
                        typeof field.value === "string"
                            ? field.value.trim()
                            : field.value;
                } else if (field.field_type === "date") {
                    // Ensure date is in proper format
                    formattedValue = field.value;
                } else if (field.field_type === "checkbox") {
                    // Ensure boolean value
                    formattedValue = Boolean(field.value);
                } else if (field.field_type === "radio") {
                    // Ensure string value
                    formattedValue = String(field.value || "");
                }

                return {
                    field_id: field.id,
                    value: formattedValue,
                };
            })
            .filter((item) => item !== null);

        if (validationErrors.length > 0) {
            setError(
                `Please fill in all required fields: ${validationErrors.join(
                    ", "
                )}`
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const submissionData = {
                data: formattedData,
            };

            await api.post(`/forms/${formId}/submit`, submissionData);

            // Show success message and redirect
            alert("Form submitted successfully!");
        } catch (err: unknown) {
            console.error("Submission error:", err);
            const error = err as { response?: { data?: { message?: string } } };
            setError(
                error.response?.data?.message ||
                    "Failed to submit form. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
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
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                    {error}
                </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
                {formData.map((field) => (
                    <FormField
                        key={field.id}
                        {...field}
                        onChange={(value: FormSubmitValue) =>
                            updateFieldValue(field.id!, value)
                        }
                    />
                ))}
                <div className="pt-6">
                    <Button
                        type="button"
                        className="w-full cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Form"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
