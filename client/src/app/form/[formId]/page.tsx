import { FormSubmitClient } from "@/app/components/form";

interface GetFormPageProps {
    params: Promise<{ formId: string }>;
}

export default async function GetFormPage({ params }: GetFormPageProps) {
    const { formId } = await params;

    return <FormSubmitClient formId={formId} />;
}
