import { FormSubmission, FormSubmit } from "@/types/form";

export const fakeForm: FormSubmit = {
    id: "form-001",
    title: "Ultimate Superhero & Cartoon Quiz",
    description:
        "Let's see what kind of chaotic fictional character you really are!",
    fields: [
        {
            id: "field-name",
            label: "What's your name?",
            field_type: "text",
            required: true,
        },
        {
            id: "field-hero",
            label: "Who's your favorite superhero?",
            field_type: "dropdown",
            required: true,
            options: [
                "Spider-Man",
                "Superman",
                "Iron Man",
                "Deadpool",
                "Wonder Woman",
                "Ben 10",
            ],
        },
        {
            id: "field-sidekick",
            label: "Pick your dream sidekick",
            field_type: "radio",
            required: true,
            options: ["Doraemon", "SpongeBob", "Tom", "Jerry", "Scooby-Doo"],
        },
        {
            id: "field-powers",
            label: "Which powers would you want?",
            field_type: "checkboxes",
            required: false,
            options: [
                "Super Strength",
                "Flight",
                "Invisibility",
                "Time Travel",
                "Teleportation",
            ],
            multi_select: true,
        },
        {
            id: "field-chaos",
            label: "Would you survive one day in Gotham?",
            field_type: "radio",
            required: true,
            options: ["Absolutely", "No chance"],
        },
        {
            id: "field-birthday",
            label: "When should your superhero origin story begin?",
            field_type: "date",
            required: true,
        },
    ],
};

export const fakeSubmissions: FormSubmission[] = [
    {
        id: "submission-001",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Spider-Man" },
            { fieldId: "field-hero", value: "Spider-Man" },
            { fieldId: "field-sidekick", value: "Doraemon" },
            {
                fieldId: "field-powers",
                value: ["Teleportation", "Invisibility"],
            },
            { fieldId: "field-chaos", value: "Absolutely" },
            { fieldId: "field-birthday", value: new Date("2026-10-01") },
        ],
        submitted_at: "2026-09-10T10:24:00Z",
    },
    {
        id: "submission-002",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Ben 10" },
            { fieldId: "field-hero", value: "Ben 10" },
            { fieldId: "field-sidekick", value: "Scooby-Doo" },
            { fieldId: "field-powers", value: ["Super Strength", "Flight"] },
            { fieldId: "field-chaos", value: "Absolutely" },
            { fieldId: "field-birthday", value: new Date("2026-10-03") },
        ],
        submitted_at: "2026-09-10T11:42:00Z",
    },
    {
        id: "submission-003",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "SpongeBob SquarePants" },
            { fieldId: "field-hero", value: "Superman" },
            { fieldId: "field-sidekick", value: "Jerry" },
            {
                fieldId: "field-powers",
                value: ["Flight", "Super Strength", "Teleportation"],
            },
            { fieldId: "field-chaos", value: "No chance" },
            { fieldId: "field-birthday", value: new Date("2026-10-05") },
        ],
        submitted_at: "2026-09-10T13:15:00Z",
    },
    {
        id: "submission-004",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Tom Cat" },
            { fieldId: "field-hero", value: "Iron Man" },
            { fieldId: "field-sidekick", value: "SpongeBob" },
            { fieldId: "field-powers", value: ["Flight", "Invisibility"] },
            { fieldId: "field-chaos", value: "No chance" },
            { fieldId: "field-birthday", value: new Date("2026-10-07") },
        ],
        submitted_at: "2026-09-11T09:08:00Z",
    },
    {
        id: "submission-005",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Jerry Mouse" },
            { fieldId: "field-hero", value: "Deadpool" },
            { fieldId: "field-sidekick", value: "Tom" },
            { fieldId: "field-powers", value: ["Invisibility", "Time Travel"] },
            { fieldId: "field-chaos", value: "Absolutely" },
            { fieldId: "field-birthday", value: new Date("2026-10-09") },
        ],
        submitted_at: "2026-09-11T12:36:00Z",
    },
    {
        id: "submission-006",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Doraemon" },
            { fieldId: "field-hero", value: "Ben 10" },
            { fieldId: "field-sidekick", value: "Jerry" },
            {
                fieldId: "field-powers",
                value: ["Time Travel", "Teleportation"],
            },
            { fieldId: "field-chaos", value: "Absolutely" },
            { fieldId: "field-birthday", value: new Date("2026-10-11") },
        ],
        submitted_at: "2026-09-11T15:21:00Z",
    },
    {
        id: "submission-007",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Deadpool" },
            { fieldId: "field-hero", value: "Deadpool" },
            { fieldId: "field-sidekick", value: "Scooby-Doo" },
            {
                fieldId: "field-powers",
                value: ["Super Strength", "Invisibility", "Time Travel"],
            },
            { fieldId: "field-chaos", value: "No chance" },
            { fieldId: "field-birthday", value: new Date("2026-10-12") },
        ],
        submitted_at: "2026-09-12T08:54:00Z",
    },
    {
        id: "submission-008",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Shrek" },
            { fieldId: "field-hero", value: "Wonder Woman" },
            { fieldId: "field-sidekick", value: "SpongeBob" },
            { fieldId: "field-powers", value: ["Super Strength", "Flight"] },
            { fieldId: "field-chaos", value: "Absolutely" },
            { fieldId: "field-birthday", value: new Date("2026-10-14") },
        ],
        submitted_at: "2026-09-12T10:17:00Z",
    },
    {
        id: "submission-009",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Scooby-Doo" },
            { fieldId: "field-hero", value: "Spider-Man" },
            { fieldId: "field-sidekick", value: "Doraemon" },
            {
                fieldId: "field-powers",
                value: ["Flight", "Teleportation", "Invisibility"],
            },
            { fieldId: "field-chaos", value: "No chance" },
            { fieldId: "field-birthday", value: new Date("2026-10-16") },
        ],
        submitted_at: "2026-09-12T14:03:00Z",
    },
    {
        id: "submission-010",
        form_id: "form-001",
        data: [
            { fieldId: "field-name", value: "Iron Man" },
            { fieldId: "field-hero", value: "Iron Man" },
            { fieldId: "field-sidekick", value: "Tom" },
            {
                fieldId: "field-powers",
                value: [
                    "Super Strength",
                    "Flight",
                    "Time Travel",
                    "Teleportation",
                ],
            },
            { fieldId: "field-chaos", value: "Absolutely" },
            { fieldId: "field-birthday", value: new Date("2026-10-20") },
        ],
        submitted_at: "2026-09-13T09:31:00Z",
    },
];
