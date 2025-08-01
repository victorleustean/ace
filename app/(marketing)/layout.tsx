import { Header } from "./header"
import { Footer } from "./footer"

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" as="image" href="/hero-dollar.webp" />
      <link rel="preload" as="image" href="/logo.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MarketingLayout;