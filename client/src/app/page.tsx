import { HeroSection, FeaturesSection } from "@/app/components/home";
// Simulate server-side data fetching to trigger loading.tsx
async function getPageData() {
    // This delay will trigger the loading.tsx page
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Simulate fetching some data
    return {
        title: "Form Builder Studio",
        lastUpdated: new Date().toISOString(),
    };
}

const HomePage = async () => {
    // This data fetching will show loading.tsx while waiting
    const pageData = await getPageData();

    return (
        <div className="bg-gray-50 text-gray-800">
            <HeroSection />
            <FeaturesSection />

            {/* Hidden data for demonstration */}
            <div className="hidden">
                <span>Page loaded at: {pageData.lastUpdated}</span>
            </div>
        </div>
    );
};

export default HomePage;
