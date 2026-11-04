export type SubmissionValue = string | boolean | string[] | Date | null;

export interface SubmissionAnswer {
    field_id: string;
    value: SubmissionValue;
}

export interface FormSubmission {
    id?: string;
    form_id: string;
    answers: SubmissionAnswer[];
    submitted_at?: string;
    submitted_by?: string;
}
