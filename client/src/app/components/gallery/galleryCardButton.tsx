"use client";

import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; 
interface GalleryCardButtonProps {
    slug: string;
}

export default function GalleryCardButton({ slug }: GalleryCardButtonProps) {
    const router = useRouter();

    const handleClick = async () => {
        try {
            const { data } = await api.post(`/forms/${slug}/use-template`);

            router.push(`/form/${data.id}/edit`);
            console.log("API response:", data);
        } catch (error) {
            toast.error("Failed to use template", {position: "top-center"});
            console.error("Error using template:", error);
        }
    };

    return (
        <Button
            className="w-full cursor-pointer"
            variant="secondary"
            onClick={handleClick}
        >
            Use Template
        </Button>
    );
}
