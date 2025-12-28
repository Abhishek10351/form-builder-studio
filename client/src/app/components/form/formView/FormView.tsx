"use client";

import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/app/utils/api";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

interface FormSubmitterProps {
    formId: string;
    title: string;
    description?: string;
}

export function FormCard({ formId, title, description }: FormSubmitterProps) {
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this form?")) {
            try {
                await api.delete(`/forms/${formId}`);
                // Reload the page to refresh the form list
                window.location.reload();
            } catch (error) {
                console.error("Failed to delete form:", error);
                alert("Failed to delete form. Please try again.");
            }
        }
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>

            <div className="flex justify-end">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <EllipsisVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                <Link href={`/form/${formId}`} target="_blank">
                                    Edit
                                </Link>
                            </MenubarItem>
                            <MenubarItem onClick={handleDelete}>
                                Delete
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}

export default function FormView() {
    const [forms, setForms] = useState<FormSubmitterProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setIsLoading(true);
                const response = await api.get("/forms/");
                // Map the API response to match FormSubmitterProps interface
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
