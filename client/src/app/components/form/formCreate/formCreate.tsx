"use client";

import { useEffect, useState } from "react";
import FormCreateInput from "./formCreateInput";
import FormViewInput from "./formViewInput";
import { FormCreateField } from "@/types";
import { SquarePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/app/utils";

export default function FormCreate({ formId }: { formId: string }) {
    const [fields, setFields] = useState<FormCreateField[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const websocket = new WebSocket(
            `ws://127.0.0.1:8000/forms/ws/${formId}`
        );

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.error) return;

            switch (data.action) {
                case "add_field":
                    setFields((prev) => [
                        ...prev,
                        { ...data.field, isEditing: false },
                    ]);
                    break;
                case "update_field":
                    setFields((prev) =>
                        prev.map((f) =>
                            f.id === data.field.id
                                ? { ...data.field, isEditing: false }
                                : f
                        )
                    );
                    break;
                case "duplicate_field":
                    setFields((prev) => {
                        const newFields = [...prev];
                        newFields.splice(data.index, 0, {
                            ...data.field,
                            isEditing: false,
                        });
                        return newFields;
                    });
                    break;
                case "remove_field":
                    setFields((prev) =>
                        prev.filter((f) => f.id !== data.field_id)
                    );
                    break;
            }
        };

        setWs(websocket);

        api.get(`/forms/${formId}`)
            .then(({ data }) => {
                if (data.fields) {
                    setFields(
                        data.fields.map((field: FormCreateField) => ({
                            ...field,
                            isEditing: false,
                        }))
                    );
                }
            })
            .catch((error) =>
                console.error("Error fetching form data:", error)
            );

        return () => {
            websocket.close();
        };
    }, [formId]);

    const handleFieldChange = (field: FormCreateField) => {
        setFields((prev) => prev.map((f) => (f.id === field.id ? field : f)));

        if (!field.isEditing) {
            const { isEditing, ...updatedField } = field;
            ws?.send(
                JSON.stringify({ action: "update_field", field: updatedField })
            );
        }
    };

    return (
        <div className="shadow-lg w-full max-w-2xl mx-auto p-6 mt-20">
            {fields.map((field) =>
                field.isEditing ? (
                    <FormCreateInput
                        key={field.id}
                        field={field}
                        onFieldChange={handleFieldChange}
                        onFieldDelete={(fieldId) =>
                            ws?.send(
                                JSON.stringify({
                                    action: "remove_field",
                                    field_id: fieldId,
                                })
                            )
                        }
                        onFieldDuplicate={(field) =>
                            ws?.send(
                                JSON.stringify({
                                    action: "duplicate_field",
                                    field_id: field.id,
                                })
                            )
                        }
                    />
                ) : (
                    <FormViewInput
                        key={field.id}
                        field={field}
                        onFieldChange={handleFieldChange}
                    />
                )
            )}
            <Button
                className="mt-4"
                onClick={() =>
                    ws?.send(JSON.stringify({ action: "add_field" }))
                }
            >
                <SquarePlusIcon className="mr-2 h-4 w-4" />
                Add Field
            </Button>
        </div>
    );
}
