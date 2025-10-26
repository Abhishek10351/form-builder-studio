import React from "react";
import { FileText, Layout, PieChart } from "lucide-react";
import { FeatureProps } from "@/types";

const FeatureItem: React.FC<FeatureProps> = ({
    icon,
    title,
    description,
    color,
}) => (
    <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
        <div
            className={`flex items-center justify-center h-12 rounded-2xl ${color} mb-6 group-hover:scale-110 transition-transform duration-300 aspect-square`}
        >
            {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
);

const features: FeatureProps[] = [
    {
        icon: <FileText className="h-6 w-6" />,
        title: "Drag & Drop Builder",
        description:
            "Create forms with an intuitive, no-code drag and drop interface.",
        color: "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg shadow-blue-500/30",
    },
    {
        icon: <Layout className="h-6 w-6" />,
        title: "Responsive Templates",
        description:
            "Start with a professionally designed template that looks great on any device.",
        color: "bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg shadow-purple-500/30",
    },
    {
        icon: <PieChart className="h-6 w-6" />,
        title: "Real-time Analytics",
        description:
            "Gain insights with visual reports on form submissions and user behavior.",
        color: "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30",
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-50/40 via-background to-purple-50/40 dark:from-blue-950/10 dark:via-background dark:to-purple-950/10">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Powerful Features at Your Fingertips
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
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
