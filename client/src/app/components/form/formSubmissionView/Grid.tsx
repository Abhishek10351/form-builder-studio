"use client";

import { useMemo, useState } from "react";
import { Column, DataGrid, SortColumn } from "react-data-grid";
import "react-data-grid/lib/styles.css";

import { Input } from "@/components/ui/input";
import { FormSubmission, FormSubmit } from "@/types/form";
import styles from "./Grid.module.css";

interface GridProps {
    form: FormSubmit;
    submissions: FormSubmission[];
}

type SubmissionRow = Record<string, string>;

function formatCellValue(value: FormSubmission["data"][number]["value"]) {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return value.toLocaleDateString();
    return value ?? "";
}

function matchesSearch(row: SubmissionRow, search: string) {
    return Object.values(row).some((value) =>
        value.toLowerCase().includes(search.toLowerCase()),
    );
}

export default function Grid({ form, submissions }: GridProps) {
    const [search, setSearch] = useState("");
    const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

    const columns = useMemo<Column<SubmissionRow>[]>(
        () => [
            { key: "id", name: "Submission", sortable: true },
            ...form.fields.map((field) => ({
                key: field.id ?? field.label,
                name: field.label,
                sortable: true,
            })),
        ],
        [form.fields],
    );

    const rows = useMemo(
        () =>
            submissions
                .map((submission) => {
                    const row: SubmissionRow = {
                        id: submission.id ?? "",
                    };

                    submission.data.forEach((answer) => {
                        row[answer.fieldId] = formatCellValue(answer.value);
                    });

                    return row;
                })
                .filter((row) => matchesSearch(row, search)),
        [search, submissions],
    );

    return (
        <section className="space-y-3" aria-label="Form submissions">
            <Input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search submissions..."
                aria-label="Search submissions"
                className="max-w-sm"
            />

            <div className="overflow-x-auto">
                <DataGrid
                    className={styles.grid}
                    columns={columns}
                    rows={rows}
                    sortColumns={sortColumns}
                    onSortColumnsChange={setSortColumns}
                    defaultColumnOptions={{
                        resizable: true,
                        minWidth: 140,
                    }}
                    rowKeyGetter={(row) => row.id}
                    rowHeight={42}
                    headerRowHeight={44}
                />
            </div>
        </section>
    );
}
