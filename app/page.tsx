"use client";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Dropzone } from "@/components/Dropzone";

export default function Home() {
  // This function will be called when a file is accepted by the dropzone
  const handleFileAccepted = (file: File) => {
    console.log("File accepted:", file);
    // Here you would typically upload the file to your server
    // or process it client-side
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Automatically&nbsp;</span>
        <span className={title()}>generate&nbsp;</span>
        <br />
        <span className={title({ color: "violet" })}>RFQ responses</span>
        <div className={subtitle({ class: "mt-4" })}>
          Just drop the tender notice PDF and let our AI do the rest.
        </div>
      </div>

      {/* Dropzone */}
      <Dropzone onFileAccepted={handleFileAccepted} className="mt-6 mb-6" />

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Next &gt;
        </Link>
      </div>
    </section>
  );
}
