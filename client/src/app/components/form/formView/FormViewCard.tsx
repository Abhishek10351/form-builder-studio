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
    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this form?")) return;
        
        api.delete(`/forms/${formId}`)
            .then(() => window.location.reload())
            .catch((error) => {
                console.error("Failed to delete form:", error);
                alert("Failed to delete form. Please try again.");
            });
    };

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex justify-end">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <EllipsisVertical className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem asChild>
                                <Link href={`/form/${formId}`} target="_blank">Edit</Link>
                            </MenubarItem>
                            <MenubarItem onClick={handleDelete}>Delete</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}