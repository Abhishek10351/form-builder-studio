"use client";

import { useState } from "react";
import FormCreateInput from "./formCreateInput";
import FormViewInput from "./formViewInput";
import { FormCreateField } from "@/types";
import { nanoid } from "nanoid";
import { STATIC_FORM_FIELDS } from "./constants";

const generateId = () => nanoid(8);

export default function FormCreate() {
    const [fields, setFields] = useState<FormCreateField[]>(STATIC_FORM_FIELDS);

    const handleFieldChange = (field: FormCreateField) => {
        setFields((prev) => prev.map((f) => (f.id === field.id ? field : f)));
    };

    const handleFieldDelete = (fieldId: string) => {
        setFields((prev) => prev.filter((f) => f.id !== fieldId));
    };

    const handleFieldDuplicate = (field: FormCreateField) => {
        const newField = {
            ...field,
            id: generateId(),
        };
        setFields((prev) => {
            const index = prev.findIndex((f) => f.id === field.id);
            const newFields = [...prev];
            newFields.splice(index + 1, 0, newField);
            return newFields;
        });
    };

    return (
        <div className="shadow w-full max-w-2xl mx-auto p-6 py-20">
            {fields.map((field) => (
                <div key={field.id}>
                    {field.isEditing ? (
                        <FormCreateInput
                            field={field}
                            onFieldChange={handleFieldChange}
                            onFieldDelete={handleFieldDelete}
                            onFieldDuplicate={handleFieldDuplicate}
                        />
                    ) : (
                        <FormViewInput
                            field={field}
                            onFieldChange={handleFieldChange}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
