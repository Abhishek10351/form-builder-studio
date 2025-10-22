import FormField from "./InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/types";

export default function FormFieldRenderer({
    title,
    description,
    fields,
}: Form) {
    return (
        <div className="max-w-2xl mx-auto p-6 min-h-screen mt-24 bg-background mb-12">
            <div className="mb-4 border-2 p-4 rounded-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-100">
                    {title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {description}
                </p>
            </div>
            <form className="space-y-4">
                {fields.map((field, index) => (
                    <FormField key={index} {...field} />
                ))}
                <div className="pt-6">
                    <Button type="submit" className="w-full cursor-pointer">
                        Submit Form
                    </Button>
                </div>
            </form>
        </div>
    );
}
