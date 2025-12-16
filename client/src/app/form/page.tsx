"use client";
import { FormSubmit } from "../components/form";
import { Form } from "@/types/form";

const sampleForm: Form = {
    id: "sample-form-1",
    title: "Basic Test Form",
    description: "Please fill out the form below.",
    fields: [
        {
            id: "full-name",
            label: "Full Name",
            type: "text",
            placeholder: "Enter your full name",
            required: true,
        },
        {
            id: "dob",
            label: "Date of Birth",
            type: "date",
            required: false,
        },
        {
            id: "gender",
            label: "Gender",
            type: "radio",
            options: ["Male", "Female", "Other"],
            required: false,
        },
        {
            id: "domains",
            label: "Domains",
            type: "dropdown",
            placeholder: "Select your area of expertise",
            options: [
                "AI",
                "Web Development",
                "Data Science",
                "Cybersecurity",
                "Cloud Computing",
                "DevOps",
                "Mobile Development",
                "Game Development",
                "Other",
            ],
            required: true,
        },
        {
            id: "terms",
            label: "Terms and Conditions",
            type: "checkbox",
            placeholder: "I agree to the terms and conditions",
            required: true,
        },
    ],
};

export default function FormSubmitter() {
    return <FormSubmit {...sampleForm} />;
}
