import type { LucideIcon } from "lucide-react";

const categories = [
    "Feedback",
    "Registration",
    "Survey",
    "Contact",
    "HR",
    "Orders",
] as const;

const templateSlugs = [
    "customer-feedback",
    "event-registration",
    "customer-survey",
    "contact-form",
    "job-application",
    "order-form",
] as const;

type Category = (typeof categories)[number];
type TemplateSlug = (typeof templateSlugs)[number];

export interface GalleryCardProps {
    icon: LucideIcon;
    slug: TemplateSlug;
    category: Category;
    title: string;
    description: string;
}
