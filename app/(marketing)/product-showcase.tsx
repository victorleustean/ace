import productImage from "@/public/product-image.png"
import Image from "next/image"
import pyramidImage from "@/public/pyramid.png"
import tubeImage from "@/public/tube.png"

export const ProductShowcase = () => {
    return(
       <section className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip" >
        <div className="container">
        <div className="max-w-[540px] xl:max-w-[640px] mx-auto">
         <div className="flex justify-center">
         <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Fii mai deștept cu banii tăi</div>
         </div>
         <h2 className="text-center text-3xl md:text-[54px] xl:text-[64px] md:leading-[60px] xl:leading-[72px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">Cu FinHub, devii stăpân pe finanțele tale – simplu și eficient.</h2>
         <p className="text-center text-[22px] xl:text-[26px] leading-[30px] xl:leading-[36px] tracking-tight text-[#010D3E] mt-5">FinHub te pregătește pentru viitorul tău financiar și academic – direct de pe orice ecran.</p></div>
         <div className="relative">
         <Image src={productImage} alt="ProductImage" className="mt-10 xl:mt-16" />
         <Image src={pyramidImage} alt="PyramidImage" className="hidden md:block absolute -right-36 xl:-right-48 -top-32 xl:-top-40 xl:scale-125" height={262} width={262} />
         <Image src={tubeImage} alt="TubeImage" height={248} className="hidden md:block absolute bottom-24 xl:bottom-32 -left-36 xl:-left-48 xl:scale-125" />
         </div>
        </div>
       </section>
    )
}