"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import { useProcess } from "@/lib/context/ProcessContext";
import { processRequirements, ProductRecommendation } from "@/lib/api";

const mockNextSteps = [
  "Analyzing requirements",
  "Finding matching products",
  "Calculating best offers",
  "Preparing recommendations",
];

export default function ProcessingPage() {
  const router = useRouter();
  const { criteria } = useProcess();
  const [currentStep, setCurrentStep] = useState(0);
  const [recommendations, setRecommendations] = useState<
    ProductRecommendation[]
  >([]);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (criteria.length === 0) {
      router.push("/");

      return;
    }

    let stepInterval: NodeJS.Timeout;
    let mounted = true;

    const processSteps = async () => {
      // Progress through steps
      stepInterval = setInterval(() => {
        setCurrentStep((current) => {
          if (current >= mockNextSteps.length - 1) {
            clearInterval(stepInterval);

            return current;
          }

          return current + 1;
        });
      }, 7500); // 7.5 seconds per step, total 30 seconds

      // After steps complete, call API
      setTimeout(async () => {
        try {
          const response = await processRequirements();

          if (mounted) {
            if (response.success) {
              setRecommendations(response.recommendations);
              setIsComplete(true);
            } else {
              setError(response.message || "Failed to process requirements");
            }
          }
        } catch (err) {
          if (mounted) {
            setError("An unexpected error occurred. Please try again.");
          }
        }
      }, 30000); // Wait 30 seconds before API call
    };

    processSteps();

    return () => {
      mounted = false;
      if (stepInterval) {
        clearInterval(stepInterval);
      }
    };
  }, [criteria.length, router]);

  if (criteria.length === 0) {
    return null;
  }

  // Calculate totals
  const totalCategories = criteria.length;
  const totalQuantity = criteria.reduce((sum, c) => sum + c.quantity, 0);
  const totalSpecs = criteria.reduce((sum, c) => sum + c.specs.length, 0);

  // Calculate total price
  const totalPrice = recommendations.reduce((sum, rec) => {
    const category = criteria.find(
      (c) => c.category.toLowerCase() === rec.category.toLowerCase()
    );

    return sum + rec.price * (category?.quantity || 0);
  }, 0);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mb-6">
        <span className={title({ size: "sm" })}>
          {isComplete ? "Recommendations Ready" : "Processing Requirements"}
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          {isComplete
            ? "We&apos;ve found the best matches for your requirements."
            : "Please wait while we analyze your requirements and find the best matches."}
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
              <div className="text-sm mt-1">Categories</div>
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

        {!isComplete ? (
          /* Progress Section */
          <div className="mb-8 p-6 bg-content1 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="space-y-4">
              {mockNextSteps.map((step, index) => (
                <div key={step} className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index === currentStep
                        ? "bg-primary text-white"
                        : index < currentStep
                          ? "bg-success text-white"
                          : "bg-content2 text-foreground-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{step}</div>
                    {index === currentStep && (
                      <div className="text-xs text-foreground-500 mt-1">
                        In progress...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Recommendations Section */
          <div className="space-y-6">
            {recommendations.map((rec) => {
              const category = criteria.find(
                (c) => c.category.toLowerCase() === rec.category.toLowerCase()
              );
              const quantity = category?.quantity || 0;
              const subtotal = rec.price * quantity;

              return (
                <div
                  key={rec.category}
                  className="p-6 bg-content1 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {rec.brand} {rec.model_name}
                      </h3>
                      <p className="text-sm text-foreground-500">
                        {rec.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        ${rec.price.toLocaleString()} × {quantity}
                      </div>
                      <div className="text-sm text-foreground-500">
                        Subtotal: ${subtotal.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(rec.specs).map(([key, value]) => (
                      <div key={key} className="bg-content2 p-3 rounded">
                        <div className="text-xs text-foreground-500 capitalize">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Total Price */}
            <div className="p-6 bg-primary-50 dark:bg-primary-50 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Total Investment</h3>
                <div className="text-2xl font-bold text-primary">
                  ${totalPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-danger/10 border border-danger rounded-lg text-center">
            <p className="text-danger">{error}</p>
          </div>
        )}
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
        {isComplete && (
          <button
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            onClick={() => router.push("/email")}
          >
            Prepare Email &gt;
          </button>
        )}
      </div>
    </section>
  );
}
