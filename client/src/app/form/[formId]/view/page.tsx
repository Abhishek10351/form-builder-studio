import { FormSubmissionViewPage } from "@/app/components/form/formSubmissionView";

interface GetFormPageProps {
    params: Promise<{ formId: string }>;
}

export default async function ViewformData({ params }: GetFormPageProps) {
    const { formId } = await params;

    return <FormSubmissionViewPage formId={formId} />;
}
