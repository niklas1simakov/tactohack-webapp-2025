"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { button as buttonStyles } from "@heroui/theme";
import { PlusIcon, MinusIcon } from "lucide-react";

import { title, subtitle } from "@/components/primitives";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useProcess } from "@/lib/context/ProcessContext";
import {
  extractCriteriaFromPDF,
  submitCriteria,
  Criterion,
  Spec,
} from "@/lib/api";

export default function ValidatePage() {
  const router = useRouter();
  const {
    pdfFile,
    criteria,
    setCriteria,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useProcess();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If we don't have a PDF file or criteria, redirect back to home
  useEffect(() => {
    if (!pdfFile && !isLoading && criteria.length === 0) {
      router.push("/");
    }
  }, [pdfFile, isLoading, criteria.length, router]);

  const handleRegenerate = async () => {
    if (!pdfFile) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await extractCriteriaFromPDF(pdfFile);

      if (response.success) {
        setCriteria(response.criteria);
      } else {
        setError(response.message || "Failed to extract criteria from the PDF");
      }
    } catch (err) {
      console.error("Error regenerating criteria:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await submitCriteria(criteria);

      if (response.success) {
        router.push("/results");
      } else {
        setError(response.message || "Failed to submit criteria");
      }
    } catch (err) {
      console.error("Error submitting criteria:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to update a criterion
  const updateCriterion = (id: string, updates: Partial<Criterion>) => {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === id ? { ...criterion, ...updates } : criterion
      )
    );
  };

  // Function to update a spec
  const updateSpec = (
    criterionId: string,
    specIndex: number,
    updates: Partial<Spec>
  ) => {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === criterionId
          ? {
              ...criterion,
              specs: criterion.specs.map((spec, idx) =>
                idx === specIndex ? { ...spec, ...updates } : spec
              ),
            }
          : criterion
      )
    );
  };

  // Function to remove a criterion
  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter((criterion) => criterion.id !== id));
  };

  // Function to add a new spec
  const addSpec = (criterionId: string) => {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === criterionId
          ? {
              ...criterion,
              specs: [...criterion.specs, { name: "new-spec", value: "value" }],
            }
          : criterion
      )
    );
  };

  // Function to remove a spec
  const removeSpec = (criterionId: string, specIndex: number) => {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === criterionId
          ? {
              ...criterion,
              specs: criterion.specs.filter((_, idx) => idx !== specIndex),
            }
          : criterion
      )
    );
  };

  if (!pdfFile && !isLoading && criteria.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mb-6">
        <span className={title({ size: "sm" })}>
          Validate Extracted Requirements
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Review and edit the requirements extracted from your document before
          proceeding.
        </div>
      </div>

      {isLoading ? (
        <div className="w-full max-w-4xl p-8 flex justify-center">
          <LoadingSpinner size="lg" message="Processing your document..." />
        </div>
      ) : error ? (
        <div className="w-full max-w-4xl p-6 bg-danger/10 border border-danger rounded-lg text-center">
          <p className="text-danger font-medium">{error}</p>
          <button
            className={buttonStyles({
              color: "danger",
              variant: "flat",
              size: "sm",
              className: "mt-4",
            })}
            onClick={() => router.push("/")}
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="w-full max-w-4xl">
            {criteria.map((criterion) => (
              <div
                key={criterion.id}
                className="mb-6 border rounded-lg bg-content1 shadow-sm overflow-hidden"
              >
                {/* Category Header */}
                <div className="p-4 border-b bg-content2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <input
                        className="w-full text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none transition-colors py-1"
                        value={criterion.category}
                        onChange={(e) =>
                          updateCriterion(criterion.id, {
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center ml-4">
                      <span className="text-sm mr-2">Quantity:</span>
                      <input
                        type="number"
                        min="1"
                        className="w-16 p-1 border rounded text-right"
                        value={criterion.quantity}
                        onChange={(e) =>
                          updateCriterion(criterion.id, {
                            quantity: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                      <button
                        className={buttonStyles({
                          color: "danger",
                          variant: "light",
                          size: "sm",
                          className: "ml-4",
                        })}
                        onClick={() => removeCriterion(criterion.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Specs List */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Specifications</h4>
                    <button
                      className="flex items-center text-xs text-primary"
                      onClick={() => addSpec(criterion.id)}
                    >
                      <PlusIcon size={14} className="mr-1" /> Add Spec
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {criterion.specs.map((spec, specIndex) => (
                      <div
                        key={specIndex}
                        className="flex items-center space-x-2"
                      >
                        <input
                          className="flex-1 text-xs p-1.5 border rounded-l"
                          value={spec.name}
                          placeholder="Spec name"
                          onChange={(e) =>
                            updateSpec(criterion.id, specIndex, {
                              name: e.target.value,
                            })
                          }
                        />
                        <span className="text-xs">=</span>
                        <input
                          className="flex-1 text-xs p-1.5 border rounded-r"
                          value={spec.value}
                          placeholder="Value"
                          onChange={(e) =>
                            updateSpec(criterion.id, specIndex, {
                              value: e.target.value,
                            })
                          }
                        />
                        <button
                          className="text-xs text-danger p-1"
                          onClick={() => removeSpec(criterion.id, specIndex)}
                        >
                          <MinusIcon size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className={buttonStyles({
                color: "default",
                variant: "flat",
                radius: "full",
              })}
              onClick={handleRegenerate}
              disabled={isSubmitting}
            >
              Regenerate
            </button>
            <button
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
              })}
              onClick={handleNext}
              disabled={isSubmitting || criteria.length === 0}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Next >"
              )}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
