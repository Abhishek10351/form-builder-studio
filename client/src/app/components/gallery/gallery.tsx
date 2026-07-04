import GalleryCard from "@/app/components/gallery/galleryCard";
import {
    MessageSquare,
    UserRoundPlus,
    ClipboardList,
    Mail,
    ShoppingCart,
    BriefcaseBusiness,
} from "lucide-react";
import type { GalleryCardProps } from "@/types/gallery";

const galleryCards: GalleryCardProps[] = [
    {
        icon: MessageSquare,
        slug: "customer-feedback",
        category: "Feedback",
        title: "Customer Feedback",
        description: "Collect feedback from your customers.",
    },
    {
        icon: UserRoundPlus,
        slug: "event-registration",
        category: "Registration",
        title: "Event Registration",
        description: "Register people for your event.",
    },
    {
        icon: ClipboardList,
        slug: "customer-survey",
        category: "Survey",
        title: "Customer Survey",
        description: "Ask questions and collect responses.",
    },
    {
        icon: Mail,
        slug: "contact-form",
        category: "Contact",
        title: "Contact Form",
        description: "Let visitors send you a message.",
    },
    {
        icon: BriefcaseBusiness,
        slug: "job-application",
        category: "HR",
        title: "Job Application",
        description: "Collect applications from candidates.",
    },
    {
        icon: ShoppingCart,
        slug: "order-form",
        category: "Orders",
        title: "Order Form",
        description: "Allow customers to place orders online.",
    },
];

export default async function Gallery() {
    "use server";
    return (
        <main className="min-h-screen px-8 py-24">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold">Template Gallery</h1>

                <p className="mt-2 text-muted-foreground">
                    Start with a ready-made template and customize it to fit
                    your needs.
                </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {galleryCards.map((card) => (
                    <GalleryCard key={card.slug} {...card} />
                ))}
            </div>
        </main>
    );
}
