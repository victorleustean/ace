type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div>
      This is a marketing page!
      {children}
    </div>
  );
};

export default MarketingLayout;// This is wrong,this should be in layout and i wrote it in page.Needs fix!