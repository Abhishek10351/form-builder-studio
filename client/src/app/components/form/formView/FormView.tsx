import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

interface FormSubmitterProps {
    formId: string;
    title: string;
    description?: string;
}

const basicForms: FormSubmitterProps[] = [
    {
        formId: "1",
        title: "Customer Feedback",
        description: "Gather feedback from customers about their experience.",
    },
    {
        formId: "2",
        title: "Event Registration",
        description: "Register participants for upcoming events.",
    },
    {
        formId: "3",
        title: "Job Application",
        description: "Collect applications for job openings.",
    },
];

export function FormCard({ formId, title, description }: FormSubmitterProps) {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow aspect-square flex flex-col justify-between">
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
                            <MenubarItem>Delete</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}

export default function FormView() {
    return (
        <div className="py-24">
            <h1 className="text-3xl font-bold mb-6">Recent Forms</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {basicForms.map((form) => (
                    <FormCard key={form.formId} {...form} />
                ))}
            </div>
        </div>
    );
}
