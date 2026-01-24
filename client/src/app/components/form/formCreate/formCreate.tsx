"use client";

import { useEffect, useState, useRef } from "react";
import FormCreateInput from "./formCreateInput";
import FormViewInput from "./formViewInput";
import { FormCreateField } from "@/types";
import { SquarePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConfettiPublishButton } from "@/components/ui/confetti-publish-button";
import { api } from "@/app/utils";

export default function FormCreate({ formId }: { formId: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fields, setFields] = useState<FormCreateField[]>([]);
    const [published, setPublished] = useState(false);
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
                    if (data.data?.published !== undefined)
                        setPublished(data.data.published);
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
                case "publish_form":
                    setPublished(data.published);

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

    const handlePublish = () => {
        ws?.send(
            JSON.stringify({ action: "publish_form", published: !published })
        );
    };

    return (
        <div className="shadow-lg border rounded-lg w-full max-w-3xl mx-auto my-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 px-6 py-4 border-b flex items-center justify-between">
                <div className="flex-1">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}
                        placeholder="Untitled Form"
                        className="w-full text-2xl font-bold bg-transparent border-0 focus:outline-none placeholder:text-gray-400"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => updateDescription(e.target.value)}
                        placeholder="Add a description to your form"
                        className="w-full mt-2 text-sm bg-transparent border-0 focus:outline-none resize-none placeholder:text-gray-400"
                        rows={2}
                    />
                </div>
                <ConfettiPublishButton
                    published={published}
                    onClick={handlePublish}
                />
            </div>
            <div className="p-6">
                <Separator className="mb-6" />
            <div className="space-y-20">
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
                    variant="outline"
                    className="w-full mt-6 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() =>
                        ws?.send(JSON.stringify({ action: "add_field" }))
                    }
                >
                    <SquarePlusIcon className="mr-2 h-5 w-5" />
                    Add Field
                </Button>
            </div>
            </div>
        </div>
    );
}
