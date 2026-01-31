"use client";

import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import api from "@/app/utils/api";
import { useState } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormViewProps } from "@/types";

export default function FormCard({ formId, title, description }: FormViewProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = () => {
        api.delete(`/forms/${formId}`)
            .then(() => window.location.reload())
            .catch((error) => {
                console.error("Failed to delete form:", error);
                alert("Failed to delete form. Please try again.");
            });
    };

    return (
        <>
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
                                    <Link
                                        href={`/form/${formId}/edit`}
                                        target="_blank"
                                    >
                                        Edit
                                    </Link>
                                </MenubarItem>
                                <MenubarItem 
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                    onClick={() => setShowDeleteDialog(true)}
                                >
                                    Delete
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Form?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{title}"? This action cannot be undone and will permanently remove the form and all its submissions.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 hover:bg-red-400 text-white"
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}