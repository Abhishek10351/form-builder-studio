"use client";

import { useEffect, useState } from "react";
import FormCreateInput from "./formCreateInput";
import FormViewInput from "./formViewInput";
import { FormCreateField } from "@/types";
import { nanoid } from "nanoid";
import { SquarePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/app/utils";
const generateId = () => nanoid(8);

export default function FormCreate({ formId }: { formId: string }) {
    const [fields, setFields] = useState<FormCreateField[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const websocket = new WebSocket(
            `ws://127.0.0.1:8000/forms/ws/${formId}`
        );

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (!data.error) {
                switch (data.action) {
                    case "add_field":
                        setFields((prev) => [...prev, data.field]);
                        break;
                    case "remove_field":
                        setFields((prev) =>
                            prev.filter((f) => f.id !== data.field_id)
                        );
                        break;
                }
            } else {
                console.error("WebSocket error:", data.message);
            }
        };

        setWs(websocket);

        const fetchFormData = async () => {
            try {
                const response = await api.get(`/forms/${formId}`);
                if (response.data.fields) {
                    setFields(response.data.fields);
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        };

        fetchFormData();

        return () => {
            websocket.close();
        };
    }, [formId]);

    const handleFieldChange = (field: FormCreateField) => {
        setFields((prev) => prev.map((f) => (f.id === field.id ? field : f)));
    };

    const handleFieldDelete = (fieldId: string) => {
        ws?.send(JSON.stringify({ action: "remove_field", field_id: fieldId }));
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

    const addNewField = () => {
        ws?.send(JSON.stringify({ action: "add_field" }));
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
            <Button className="mt-4 cursor-pointer" onClick={addNewField}>
                <SquarePlusIcon className="mr-2 h-4 w-4" />
                Add Field
            </Button>
        </div>
    );
}
