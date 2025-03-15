/**
 * API service for handling PDF processing and criteria extraction
 */

// Mock criteria data - this would normally come from the server
const mockCriteria = [
  {
    id: "c1",
    category: "Monitors",
    quantity: 20,
    specs: [
      { name: "resolution", value: "3840x2160" },
      { name: "refresh-rate", value: "60Hz" },
      { name: "panel-type", value: "IPS" },
      { name: "connectivity", value: "HDMI, DisplayPort" },
      { name: "size", value: "27-inch" },
    ],
  },
  {
    id: "c2",
    category: "Laptops",
    quantity: 35,
    specs: [
      { name: "processor", value: "Intel i7-12700H" },
      { name: "ram", value: "16GB DDR5" },
      { name: "storage", value: "512GB NVMe SSD" },
      { name: "screen-size", value: "14-inch" },
    ],
  },
  {
    id: "c3",
    category: "Network Switches",
    quantity: 8,
    specs: [
      { name: "ports", value: "48-port" },
      { name: "speed", value: "10GbE" },
      { name: "management", value: "Managed" },
      { name: "poe", value: "PoE+" },
    ],
  },
];

// Updated interface for the new criteria structure
export interface Spec {
  name: string;
  value: string;
}

export interface Criterion {
  id: string;
  category: string;
  quantity: number;
  specs: Spec[];
}

export interface ExtractCriteriaResponse {
  criteria: Criterion[];
  success: boolean;
  message?: string;
}

export interface SubmitCriteriaResponse {
  success: boolean;
  message: string;
  nextSteps?: string[];
}

/**
 * Extracts criteria from a PDF file
 *
 * @param file The PDF file to process
 * @returns A promise that resolves to the extracted criteria
 */
export async function extractCriteriaFromPDF(
  file: File
): Promise<ExtractCriteriaResponse> {
  // Mock API call - in a real app, you would send the file to your server
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log("Processing file:", file.name);

      // Return mock data
      resolve({
        criteria: mockCriteria,
        success: true,
      });

      // For testing error state:
      // resolve({
      //   criteria: [],
      //   success: false,
      //   message: "Failed to process PDF. Please try again with a different file."
      // });
    }, 1500); // 1.5 second delay to simulate processing
  });
}

/**
 * Submits the validated criteria to the server
 *
 * @param criteria The validated criteria to submit
 * @returns A promise that resolves to the submission result
 */
export async function submitCriteria(
  criteria: Criterion[]
): Promise<SubmitCriteriaResponse> {
  // Mock API call - in a real app, you would send the criteria to your server
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log("Submitting criteria:", criteria);

      // Return mock success response
      resolve({
        success: true,
        message: "Criteria submitted successfully",
        nextSteps: [
          "Generating response document",
          "Preparing quote",
          "Reviewing compliance",
        ],
      });

      // For testing error state:
      // resolve({
      //   success: false,
      //   message: "Failed to submit criteria. Please try again."
      // });
    }, 1000); // 1 second delay
  });
}

// In a real implementation, replace these functions with actual API calls:
/*
export async function extractCriteriaFromPDF(file: File): Promise<ExtractCriteriaResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('https://your-api-endpoint.com/extract-criteria', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to process PDF');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error extracting criteria:', error);
    return {
      criteria: [],
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

export async function submitCriteria(criteria: Criterion[]): Promise<SubmitCriteriaResponse> {
  try {
    const response = await fetch('https://your-api-endpoint.com/submit-criteria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ criteria }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit criteria');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting criteria:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
*/
