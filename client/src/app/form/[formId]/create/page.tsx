import { FormCreate } from "@/app/components/form";

interface GetFormPageProps {
    params: Promise<{ formId: string }>;
}

export default async function GetFormPage({ params }: GetFormPageProps) {
    const { formId } = await params;
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <FormCreate formId={formId} />
        </div>
    );
}
