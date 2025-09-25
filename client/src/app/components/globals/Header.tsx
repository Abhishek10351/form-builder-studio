"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
    { title: "Features", href: "#" },
    { title: "Products", href: "#" },
    { title: "Resources", href: "#" },
    { title: "Contact", href: "#" },
];

const Header = () => {
    return (
        <header className="bg-white shadow-sm py-4">
            <nav className="container mx-auto px-6 flex justify-between items-center">
                <a href="" className="flex items-center gap-2">
                    {/* <img
                        src=""
                        className="max-h-8"
                        alt=".."
                    /> */}
                    <span className="text-lg font-semibold tracking-tighter">
                        Form Builder Studio
                    </span>
                </a>
                <NavigationMenu className="hidden lg:block">
                    <NavigationMenuList>
                        {navigationLinks.map((link) => (
                            <NavigationMenuItem key={link.title}>
                                <NavigationMenuLink
                                    href={link.href}
                                    className={navigationMenuTriggerStyle()}
                                >
                                    {link.title}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden items-center gap-4 lg:flex">
                    <Button
                        variant="outline"
                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
                    >
                        Sign in
                    </Button>
                    <Button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md cursor-pointer">
                        Start for free
                    </Button>
                </div>
                <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button variant="outline" size="icon">
                            <MenuIcon className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="top"
                        className="max-h-screen overflow-auto"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                <a href="" className="flex items-center gap-2">
                                    {/* <img
                                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                                        className="max-h-8"
                                        alt="Shadcn UI Navbar"
                                    /> */}
                                    <span className="text-lg font-semibold tracking-tighter">
                                        Form Builder Studio
                                    </span>
                                </a>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col p-4">
                            <div className="flex flex-col gap-6">
                                {navigationLinks.map((link) => (
                                    <a
                                        key={link.title}
                                        href={link.href}
                                        className="font-medium"
                                    >
                                        {link.title}
                                    </a>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-col gap-4">
                                <Button
                                    variant="outline"
                                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
                                >
                                    Sign in
                                </Button>
                                <Button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md cursor-pointer">
                                    Start for free
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
};

export default Header;
