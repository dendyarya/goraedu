import { practiceRoute } from "@/components/osha/SetRoutes";

export const dynamicParams = false;

const route = practiceRoute("osha-crane");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
