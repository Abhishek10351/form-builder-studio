import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    MessageSquare,
    UserRoundPlus,
    ClipboardList,
    Mail,
    ShoppingCart,
    BriefcaseBusiness,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

const categories = [
    "Feedback",
    "Registration",
    "Survey",
    "Contact",
    "HR",
    "Orders",
] as const;

type Category = (typeof categories)[number];

interface GalleryCardProps {
    icon: LucideIcon;
    category: Category;
    title: string;
    description: string;
}

const galleryCards: GalleryCardProps[] = [
    {
        icon: MessageSquare,
        category: "Feedback",
        title: "Customer Feedback",
        description: "Collect feedback from your customers.",
    },
    {
        icon: UserRoundPlus,
        category: "Registration",
        title: "Event Registration",
        description: "Register people for your event.",
    },
    {
        icon: ClipboardList,
        category: "Survey",
        title: "Customer Survey",
        description: "Ask questions and collect responses.",
    },
    {
        icon: Mail,
        category: "Contact",
        title: "Contact Form",
        description: "Let visitors send you a message.",
    },
    {
        icon: BriefcaseBusiness,
        category: "HR",
        title: "Job Application",
        description: "Collect applications from candidates.",
    },
    {
        icon: ShoppingCart,
        category: "Orders",
        title: "Order Form",
        description: "Allow customers to place orders online.",
    },
];

const categoryStyle: Record<Category, string> = {
    Feedback: "bg-violet-100 text-violet-700 hover:bg-violet-200",
    Registration: "bg-sky-100 text-sky-700 hover:bg-sky-200",
    Survey: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    Contact: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    HR: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    Orders: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
};

function GalleryCard({
    icon: Icon,
    category,
    title,
    description,
}: GalleryCardProps) {
    const iconColor =
        categoryStyle[category].match(/text-\S+/)?.[0];

    return (
        <Card className="w-72 overflow-hidden bg-card shadow-lg border-0 pt-0">
            <div className="h-40 flex items-center justify-center bg-muted">
                <div className="flex h-full w-full items-center justify-center bg-background">
                    <Icon className={`${iconColor} h-10 w-10`} />
                </div>
            </div>

            <CardContent className="space-y-3 p-5">
                <Badge className={categoryStyle[category]}>{category}</Badge>

                <h3 className="text-xl font-semibold">{title}</h3>

                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>

            <CardFooter>
                <Button variant="outline" className="w-full cursor-pointer">
                    Use Template
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function GalleryPage() {
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
                    <GalleryCard key={card.title} {...card} />
                ))}
            </div>
        </main>
    );
}
