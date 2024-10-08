type TPageHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: TPageHeaderProps) => {
  return (
    <h2 className={`text-2xl dark:text-white pt-3 pb-3 px-3 md:px-0`}>
      {title}
    </h2>
  );
};

export default PageHeader;
