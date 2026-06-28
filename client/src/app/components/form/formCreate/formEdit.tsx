"use client";
import { useState, useEffect } from "react";
import api from "@/app/utils/api";
import FormCreate from "./formCreate";


export default function FormEditPage({ formId }: { formId: string }) {
    const [isValidForm, setIsValidForm] = useState<boolean | null>(null);
    useEffect(() => { 
        api.get(`/forms/${formId}`)
            .then(() => setIsValidForm(true))
            .catch(() => setIsValidForm(false));

    }, [formId]);

    if (isValidForm === null) {
        return (
            <div className="flex h-full w-full items-center justify-center pt-24">
                <div className="flex w-full max-w-2xl animate-pulse flex-col items-center gap-4 rounded-lg border bg-card p-6 shadow">
                    <div className="h-6 w-1/2 rounded bg-muted"></div>
                    <div className="h-4 w-3/4 rounded bg-muted"></div>
                </div>
            </div>
        );
    }
    if (isValidForm === false) {
        return (
            <div className="flex h-full w-full items-center justify-center pt-24">
                <div className="flex w-full max-w-2xl flex-col items-center gap-4 rounded-lg border bg-card p-6 shadow">
                    <h2 className="text-2xl font-semibold">Form Not Found</h2>
                    <p className="text-muted-foreground text-center">
                        The form with ID "{formId}" does not exist or has been
                        removed.
                    </p>
                </div>
            </div>
        );
    }
    return <FormCreate formId={formId} />;
}