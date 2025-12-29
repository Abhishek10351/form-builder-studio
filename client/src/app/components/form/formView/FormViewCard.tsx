"use client";

import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import api from "@/app/utils/api";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

import { FormViewProps } from "@/types";

export default function FormCard({ formId, title, description }: FormViewProps) {
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this form?")) {
            try {
                await api.delete(`/forms/${formId}`);
                // Reload the page to refresh the form list
                window.location.reload();
            } catch (error) {
                console.error("Failed to delete form:", error);
                alert("Failed to delete form. Please try again.");
            }
        }
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>

            <div className="flex justify-end">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <EllipsisVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                <Link href={`/form/${formId}`} target="_blank">
                                    Edit
                                </Link>
                            </MenubarItem>
                            <MenubarItem onClick={handleDelete}>
                                Delete
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}

