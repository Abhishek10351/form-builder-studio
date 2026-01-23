"use client";

import { useEffect, useState, useRef } from "react";
import FormCreateInput from "./formCreateInput";
import FormViewInput from "./formViewInput";
import { FormCreateField } from "@/types";
import { SquarePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/app/utils";

export default function FormCreate({ formId }: { formId: string }) {
    const [fields, setFields] = useState<FormCreateField[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const descriptionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const websocket = new WebSocket(
            `ws://127.0.0.1:8000/forms/ws/${formId}`
        );

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.error) return;

            switch (data.action) {
                case "update_form":
                    if (data.data?.title !== undefined)
                        setTitle(data.data.title);
                    if (data.data?.description !== undefined)
                        setDescription(data.data.description);
                    break;
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
                if (data.title) setTitle(data.title);
                if (data.description) setDescription(data.description);
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

    const updateTitle = (value: string) => {
        setTitle(value);
        if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
        titleTimeoutRef.current = setTimeout(() => {
            ws?.send(
                JSON.stringify({
                    action: "update_form",
                    data: { title: value },
                })
            );
        }, 500);
    };

    const updateDescription = (value: string) => {
        setDescription(value);
        if (descriptionTimeoutRef.current)
            clearTimeout(descriptionTimeoutRef.current);
        descriptionTimeoutRef.current = setTimeout(() => {
            ws?.send(
                JSON.stringify({
                    action: "update_form",
                    data: { description: value },
                })
            );
        }, 500);
    };

    return (
        <div className="shadow-lg border rounded-md w-full max-w-2xl mx-auto my-10 p-6 flex gap-6 flex-col">
            <div className="mb-6 space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => updateTitle(e.target.value)}
                    placeholder="Form Title"
                    className="w-full text-2xl font-bold border-0 border-b-2 border-transparent hover:border-gray-300 focus:border-primary focus:outline-none px-2 py-1 transition-colors"
                />
                <textarea
                    value={description}
                    onChange={(e) => updateDescription(e.target.value)}
                    placeholder="Form Description"
                    className="w-full border-0 border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none px-2 py-1 resize-none transition-colors"
                    rows={2}
                />
            </div>
            <Separator />
            <div className="">
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
                    className="mt-4 cursor-pointer"
                    onClick={() =>
                        ws?.send(JSON.stringify({ action: "add_field" }))
                    }
                >
                    <SquarePlusIcon className="mr-2 h-4 w-4" />
                    Add Field
                </Button>
            </div>
        </div>
    );
}
