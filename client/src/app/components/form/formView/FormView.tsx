"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import api from "@/app/utils/api";
import FormCard from "./FormViewCard";
import { FormViewProps } from "@/types";

const LoadingState = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
);

const ErrorState = ({ message }: { message: string }) => (
    <div className="text-center text-red-500 py-8">{message}</div>
);

const EmptyState = () => (
    <div className="text-center text-muted-foreground py-8">
        No forms found. Create your first form to get started!
    </div>
);

const CreateFormCard = () => (
    <Link href="/form/create" className="w-36 aspect-square block ml-4 mb-8">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 shadow hover:shadow-lg hover:border-primary transition-all aspect-square flex flex-col items-center justify-center cursor-pointer group">
            <PlusIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors mb-2" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                Create New Form
            </p>
        </div>
    </Link>
);

export default function FormView() {
    const [forms, setForms] = useState<FormViewProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        api.get("/forms/")
            .then((response) => {
                setForms(
                    response.data.map((form: any) => ({
                        formId: form._id || form.id,
                        title: form.title,
                        description: form.description,
                    }))
                );
                setError(null);
            })
            .catch((err) => {
                console.error("Failed to fetch forms:", err);
                setError("Failed to load forms. Please try again later.");
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="py-24">
            <CreateFormCard />
            <h1 className="text-3xl font-bold mb-6">Recent Forms</h1>

            {isLoading ? (
                <LoadingState />
            ) : error ? (
                <ErrorState message={error} />
            ) : forms.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {forms.map((form) => (
                        <FormCard key={form.formId} {...form} />
                    ))}
                </div>
            )}
        </div>
    );
}
