import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/components/IssueFormSkeleton";

const IssueForm = dynamic(
    () => import('@/app/components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton/>
    }
)

const NewIssuePage = () => {
    return <IssueForm/>;
};

export default NewIssuePage;