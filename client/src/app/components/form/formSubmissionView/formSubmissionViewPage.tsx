
import Grid from "./Grid";
import { fakeForm, fakeSubmissions } from "./data";

export default function FormSubmissionViewPage() {
    return (
        <main className="space-y-6 px-4 pb-8 pt-28">
            <header>
                <h1 className="text-2xl font-bold">{fakeForm.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {fakeSubmissions.length} submissions
                </p>
            </header>

            <Grid form={fakeForm} submissions={fakeSubmissions} />
        </main>
    );
}
