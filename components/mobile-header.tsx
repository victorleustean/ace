import { MobileSidebar } from "./mobile-sidebar"




export const MobileHeader = ( ) => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center  border-b bg-[radial-gradient(ellipse_at_bottom_left,#183EC2,#EAEEFE_100%)] fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};