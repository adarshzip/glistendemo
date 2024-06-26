import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { Children } from "react";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
}

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="absolute w-full max-w-xl rounded-full bg-blue-400/20 glow -z-10 aspect-square blur-3xl filter" />


      <PrismicRichText field={slice.primary.heading} 
      components={{
        heading2: ({children})=>(
          <h2 className="text-5xl font-medium text-center text-balance md:text-7xl ">
            {children}
          </h2>
        ),
      }}
      />

      <div className="grid items-center gap-8 p-8 mt-16 border rounded-xl border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 backdrop-blur-sm lg:grid-cols-3 lg:py-12 lg:gap-0">
        <div>

          <div className="p-4 text-3xl rounded-lg w-fit bg-blue-500/35">
            <>{slice.primary.icon && icons[slice.primary.icon]}</>
          </div>
          
          <div className="mt-6 text-2xl font-normal">
            <PrismicRichText field={slice.primary.subheading} />
          </div>

          <div className="max-w-xl mt-4 prose prose-invert">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink className="mt-6" field={slice.primary.button_link}>
            {slice.primary.button_text || "Learn More"}
          </ButtonLink>
        </div>

        <PrismicNextImage field={slice.primary.image} 
          className={clsx("opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
            slice.variation === "reverse" ? 
            "lg: order-1 lg:translate-x-[15%]" : 
            "lg: -order-1 lg:translate-x-[-15%]",
        )} />
      </div>
    </Bounded>
  );
};

export default Showcase;
