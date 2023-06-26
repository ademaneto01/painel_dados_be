import { PageContentContainer } from "@/components/shared";
import { useGlobalContext } from "@/context/store";

const ResourceView = () => {
  const { lesson } = useGlobalContext();

  return (
    <PageContentContainer>
      <div dangerouslySetInnerHTML={{ __html: lesson }} />
    </PageContentContainer>
  );
};

export default ResourceView;
