import React from "react";
import { FileText, Layout, PieChart } from "lucide-react";
import { FeatureProps } from "@/types";

const FeatureItem: React.FC<FeatureProps> = ({
    icon,
    title,
    description,
    color,
}) => (
    <div className="bg-gray-100 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${color} mb-4`}
        >
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
    </div>
);

const features: FeatureProps[] = [
    {
        icon: <FileText className="h-6 w-6" />,
        title: "Drag & Drop Builder",
        description:
            "Create forms with an intuitive, no-code drag and drop interface.",
        color: "bg-indigo-200 text-indigo-600",
    },
    {
        icon: <Layout className="h-6 w-6" />,
        title: "Responsive Templates",
        description:
            "Start with a professionally designed template that looks great on any device.",
        color: "bg-purple-200 text-purple-600",
    },
    {
        icon: <PieChart className="h-6 w-6" />,
        title: "Real-time Analytics",
        description:
            "Gain insights with visual reports on form submissions and user behavior.",
        color: "bg-pink-200 text-pink-600",
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Powerful Features at Your Fingertips
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
                        Form Builder Studio provides all the tools you need to
                        create, manage, and analyze your forms with ease.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
