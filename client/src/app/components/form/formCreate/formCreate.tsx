"use client";

import { useState } from "react";
import FormCreateInput from "./formCreateInput";
import FormViewInput from "./formViewInput";
import { FormCreateField } from "@/types";
import { nanoid } from "nanoid";
import { STATIC_FORM_FIELDS } from "./constants";
import { SquarePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
const generateId = () => nanoid(8);

export default function FormCreate({formId}: {formId: string}) {
    const ws = new WebSocket(`ws://127.0.0.1:8000/forms/ws/${formId}`);
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
    const addNewField = (field: FormCreateField) => {
        setFields((prev) => [...prev, field]);
    };
    ws.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);
        const data = JSON.parse(event.data);
        if (data.action === "add_field") {
            addNewField(data.field);
        }

    };

    return (
        <div className="shadow-lg w-full max-w-2xl mx-auto p-6 mt-20">
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
            <Button
                className="mt-4 cursor-pointer"
                onClick={() => {
                    const newField: FormCreateField = {
                        id: generateId(),
                        label: "New Field",
                        field_type: "text",
                        required: false,
                        isEditing: false,
                    };
                    // setFields((prev) => [...prev, newField]);
                    ws.send(JSON.stringify({ action: "add_field", field: newField }));
                }}
            >
                <SquarePlusIcon className="mr-2 h-4 w-4" />
                Add Field
            </Button>
        </div>
    );
}
