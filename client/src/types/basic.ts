import { ReactNode } from "react";

export interface FeatureProps {
    icon: ReactNode;
    title: string;
    description: string;
    color?: string;
}
