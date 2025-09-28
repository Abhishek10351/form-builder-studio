import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center min-h-screen text-center">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Build Forms,{" "}
                            <span className="gradient-text-hero">
                                Collect Data,
                            </span>{" "}
                            Effortlessly.
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Create beautiful, interactive forms with ease. Build
                            custom forms, collect responses, and analyze data
                            all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                className="gradient-button-hero text-white px-8 py-3 text-lg"
                                asChild
                            >
                                <a href="/forms/create">Start Building</a>
                            </Button>
                            <Button
                                variant="outline"
                                className="px-8 py-3 text-lg"
                                asChild
                            >
                                <a href="/dashboard">My Forms</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
