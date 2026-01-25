"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/utils";
import { FormSubmitPage } from "@/app/components/form";
import { FormSubmit } from "@/types";

export default function FormClient({ formId }: { formId: string }) {
    const [form, setForm] = useState<FormSubmit | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            const res = await api.get<FormSubmit>(`/forms/${formId}`);
            if (!cancelled) setForm(res.data);
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [formId]);

    if (!form)
        return (
            <div className="p-4 rounded min-h-screen text-gray-200 flex items-center justify-center">
                <div className="text-lg">Form {formId} not found</div>
            </div>
        );

    return <FormSubmitPage formId={formId} {...form} />;
}
