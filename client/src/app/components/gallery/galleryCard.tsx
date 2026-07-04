// "use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { GalleryCardProps } from "@/types/gallery";
import GalleryCardButton from "./galleryCardButton";
const categories = [
    "Feedback",
    "Registration",
    "Survey",
    "Contact",
    "HR",
    "Orders",
] as const;

type Category = (typeof categories)[number];

const categoryStyle: Record<Category, string> = {
    Feedback: "bg-violet-100 text-violet-700 hover:bg-violet-200",
    Registration: "bg-sky-100 text-sky-700 hover:bg-sky-200",
    Survey: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    Contact: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    HR: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    Orders: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
};

export default async function GalleryCard({
    icon: Icon,
    slug,
    category,
    title,
    description,
}: GalleryCardProps) {
    const iconColor = categoryStyle[category].match(/text-\S+/)?.[0];

    return (
        <Card className="w-72 overflow-hidden border-0 bg-card pt-0 shadow-lg">
            <div className="flex h-40 items-center justify-center bg-muted">
                <div className="flex h-full w-full items-center justify-center bg-border">
                    <Icon className={`${iconColor} h-10 w-10`} />
                </div>
            </div>

            <CardContent className="space-y-3 p-5">
                <Badge className={`${categoryStyle[category]} font-bold`}>
                    {category}
                    {<Icon className={`${iconColor} ml-2 h-4 w-4`} />}
                </Badge>

                <h3 className="text-xl font-semibold">{title}</h3>

                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>

            <CardFooter>
                {/* <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    // onClick={handleUseTemplate}
                >
                    Use Template
                </Button> */}
                <GalleryCardButton slug={slug} />
            </CardFooter>
        </Card>
    );
}
