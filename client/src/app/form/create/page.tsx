"use client";

import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function CreateFormPage() {
    const router = useRouter();

    const createForm = async () => {
        try {
            const response = await api.post("/forms/", {});
            const {data} = response;
            const newFormId = data.id;
            console.log("Form created with ID:", newFormId);
            router.push(`/form/${newFormId}/create`);
        } catch (error) {
            console.error("Failed to create form:", error);
            alert("Failed to create form. Please try again.");
        }
    };

    useEffect(() => {
        createForm();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Creating Form...</h1>
                <p className="text-gray-600">Please wait while we create your form.</p>
            </div>
        </div>
    );
}
