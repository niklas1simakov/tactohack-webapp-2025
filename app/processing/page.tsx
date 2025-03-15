"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import { useProcess } from "@/lib/context/ProcessContext";

const mockNextSteps = [
  "Analyzing requirements",
  "Parsing offers",
  "Generating RFQ response",
];

export default function ProcessingPage() {
  const router = useRouter();
  const { criteria } = useProcess();

  useEffect(() => {
    if (criteria.length === 0) {
      router.push("/");
    }
  }, [criteria.length, router]);

  if (criteria.length === 0) {
    return null;
  }

  // Calculate totals
  const totalCategories = criteria.length;
  const totalQuantity = criteria.reduce((sum, c) => sum + c.quantity, 0);
  const totalSpecs = criteria.reduce((sum, c) => sum + c.specs.length, 0);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mb-6">
        <span className={title({ size: "sm" })}>Processing Complete</span>
        <div className={subtitle({ class: "mt-4" })}>
          We&apos;ve analyzed your requirements and are preparing your RFQ
          response.
        </div>
      </div>

      <div className="w-full max-w-4xl">
        {/* Summary Section */}
        <div className="mb-8 p-6 bg-content1 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Requirements Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-content2 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {totalCategories}
              </div>
              <div className="text-sm mt-1">Product Categories</div>
            </div>
            <div className="text-center p-4 bg-content2 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {totalQuantity}
              </div>
              <div className="text-sm mt-1">Total Quantity</div>
            </div>
            <div className="text-center p-4 bg-content2 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {totalSpecs}
              </div>
              <div className="text-sm mt-1">Specifications</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8 p-6 bg-content1 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Progress</h3>
          <div className="space-y-4">
            {mockNextSteps.map((step, index) => (
              <div key={step} className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    index === 0
                      ? "bg-primary text-white"
                      : "bg-content2 text-foreground-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{step}</div>
                  {index === 0 && (
                    <div className="text-xs text-foreground-500 mt-1">
                      In progress...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Message */}
        <div className="text-center p-6 bg-content1 rounded-lg shadow-sm">
          <p className="text-sm text-foreground-500">
            Your RFQ response will be ready for download shortly. We&apos;ll
            notify you when it&apos;s complete.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className={buttonStyles({
            color: "default",
            variant: "flat",
            radius: "full",
          })}
          onClick={() => router.push("/validate")}
        >
          &lt; Back
        </button>
      </div>
    </section>
  );
}
