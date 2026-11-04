"use client";

import { api } from "@/app/utils";
import { FormDefinition, FormSubmission } from "@/types/form";
import { useEffect, useState } from "react";

import Grid from "./Grid";

export default function FormSubmissionViewPage({
    formId,
}: {
    formId?: string;
}) {
    const [form, setForm] = useState<FormDefinition | null>(null);
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

    useEffect(() => {
        if (!formId) return;

        api.get(`/forms/${formId}`)
            .then((res) => {
                setForm(res.data);
            })
            .catch((err) => {
                console.error("Error fetching form data:", err);
            });

        api.get(`/submit/${formId}/`)
            .then((res) => {
                setSubmissions(res.data.items);
            })
            .catch((err) => {
                console.error("Error fetching submissions:", err);
            });

    }, [formId]);

    return (
        <main className="space-y-6 px-4 pb-8 pt-28">
            {form && (
                <>
                    <header>
                        <h1 className="text-2xl font-bold">{form.title}</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {/* {submissions.length} submissions */}
                        </p>
                    </header>
                    <Grid form={form} submissions={submissions} />
                </>
            )}
        </main>
    );
}
