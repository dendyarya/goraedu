import { practiceRoute } from "@/components/osha/SetRoutes";

export const dynamicParams = false;

const route = practiceRoute("faa-107");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
