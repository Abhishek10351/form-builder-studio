"use client";

import FormField from "./InputField";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/types";
import { useEffect, useState } from "react";
import { FormSubmitFieldProps, FormSubmitValue } from "@/types";
import { api } from "@/app/utils";
import { useRouter } from "next/navigation";

export default function FormSubmitPage({
    formId,
    title,
    description,
    fields,
}: FormSubmit & { formId: string }) {
    const [formData, setFormData] = useState<FormSubmitFieldProps[]>(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // Validate required fields
        const missingFields = formData.filter(
            (field) => field.required && (!field.value || field.value === "")
        );

        if (missingFields.length > 0) {
            setError("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        try {
            const submissionData = {
                data: formData.map((field) => ({
                    field_id: field.id,
                    value: field.value,
                })),
            };

            await api.post(`/forms/${formId}/submit`, submissionData);
            
            // Show success message and redirect
            alert("Form submitted successfully!");
            router.push("/forms");
        } catch (err: any) {
            console.error("Submission error:", err);
            setError(
                err.response?.data?.message ||
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
                    <Button
                        type="submit"
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
