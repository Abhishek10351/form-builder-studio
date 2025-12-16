import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-background to-cyan-50/30 dark:from-indigo-950/20 dark:via-background dark:to-cyan-950/10">
            <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center min-h-screen text-center">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Build Forms,{" "}
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                                Collect Data,
                            </span>{" "}
                            Effortlessly.
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Create beautiful, interactive forms with ease. Build
                            custom forms, collect responses, and analyze data
                            all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg shadow-xl shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300 ease-out"
                                asChild
                            >
                                <a href="/form/create">Start Building</a>
                            </Button>
                            <Button
                                variant="outline"
                                className="px-8 py-3 text-lg border-2 border-indigo-200 dark:border-indigo-800 text-foreground hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
                                asChild
                            >
                                <a href="/form">My Forms</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
