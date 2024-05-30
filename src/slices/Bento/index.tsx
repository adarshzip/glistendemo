import Bounded from "@/components/Bounded";
import { Content, asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento = ({ slice }: BentoProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      
      <PrismicRichText field={slice.primary.heading} 
      components={{
        heading2: ({children}) => (
          <h2 className="text-5xl font-medium text-center text-balance md:text-7xl">
            {children}
          </h2>
        ),
        em: ({children}) => (
          <em className="not-italic text-transparent bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text">
            {children}
          </em>
        ),
      }}
      />

      <div className="max-w-md mx-auto mt-6 text-center text-balance text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10"> 
        {slice.items.map((item) => (
          <div className={ clsx("grid row-span-3 gap-4 p-4 rounded-lg glass-container grid-rows-subgrid bg-gradient-to-b from-gray-900 to-gray-950", item.wide ? "md:col-span-2" : "md:col-span-1")} key={asText(item.title)}>
            <h3 className="text-3xl">
              <PrismicText field={item.title} />
            </h3>
            <div className="max-w-md text-balance text-slate-300">
              <PrismicRichText field={item.body} />
            </div>
            <PrismicNextImage className="w-auto max-h-36" field={item.image} />
          </div>
        ))}
      </div>
      

    </Bounded>
  );
};

export default Bento;
