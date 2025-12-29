"use client";

import { useEffect, useState } from "react";
import api from "@/app/utils/api";
import FormCard from "./FormViewCard";
import { FormViewProps } from "@/types";

export default function FormView() {
    const [forms, setForms] = useState<FormViewProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setIsLoading(true);
                const response = await api.get("/forms/");
                const formattedForms = response.data.map((form: any) => ({
                    formId: form._id || form.id,
                    title: form.title,
                    description: form.description,
                }));
                setForms(formattedForms);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch forms:", err);
                setError("Failed to load forms. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchForms();
    }, []);

    if (isLoading) {
        return (
            <div className="py-24">
                <h1 className="text-3xl font-bold mb-6">Recent Forms</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-24">
                <h1 className="text-3xl font-bold mb-6">Recent Forms</h1>
                <div className="text-center text-red-500 py-8">{error}</div>
            </div>
        );
    }

    if (forms.length === 0) {
        return (
            <div className="py-24">
                <h1 className="text-3xl font-bold mb-6">Recent Forms</h1>
                <div className="text-center text-gray-500 py-8">
                    No forms found. Create your first form to get started!
                </div>
            </div>
        );
    }

    return (
        <div className="py-24">
            <h1 className="text-3xl font-bold mb-6">Recent Forms</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {forms.map((form) => (
                    <FormCard key={form.formId} {...form} />
                ))}
            </div>
        </div>
    );
}
