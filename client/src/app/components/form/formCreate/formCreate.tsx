import FormCreateInput from "./formCreateInput";
import FormViewInput from "./formViewInput";
export default function FormCreate() {

    return (
        <div className="shadow w-full max-w-2xl mx-auto p-6">
            <FormCreateInput />
            <FormViewInput />
        </div>
    );
}
