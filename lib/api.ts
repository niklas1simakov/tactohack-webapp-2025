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

export interface Criterion {
  category: string;
  quantity: number;
  specs: ProductSpecs;
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
  recommendations?: ProductRecommendation[];
}

export interface ProductSpecs {
  [key: string]: string | number;
}

export interface ProductRecommendation {
  category: string;
  price: number;
  brand: string;
  model_name: string;
  specs: ProductSpecs;
}

export interface ProcessingResponse {
  success: boolean;
  message?: string;
  recommendations: ProductRecommendation[];
}

const mockRecommendations: ProductRecommendation[] = [
  {
    category: "Laptops",
    price: 1299,
    brand: "Lenovo",
    model_name: "100w Gen 4",
    specs: {
      refreshrate: "60",
      screen: "13.3",
      ram: 16,
      storage: 512,
      gpu: "integrated",
      cpu: "Intel Processor N100",
      battery: 47,
      op_sys: "Windows 11",
    },
  },
  {
    category: "Monitors",
    price: 499,
    brand: "Dell",
    model_name: "UltraSharp U2723QE",
    specs: {
      resolution: "3840x2160",
      refreshrate: "60",
      panel: "IPS",
      size: "27",
      ports: "HDMI, DisplayPort, USB-C",
      response_time: "5ms",
      brightness: "350cd/m²",
    },
  },
  {
    category: "Network Switches",
    price: 1899,
    brand: "Cisco",
    model_name: "Catalyst 9200-48P",
    specs: {
      ports: "48",
      speed: "10GbE",
      poe: "PoE+",
      switching_capacity: "176 Gbps",
      management: "Full",
      stacking: "Yes",
      power_budget: "740W",
    },
  },
];

export interface RFQEmail {
  category: string;
  subject: string;
  to: string;
  content: string;
}

export interface GenerateEmailsResponse {
  success: boolean;
  message?: string;
  emails: RFQEmail[];
}

export interface SendEmailsResponse {
  success: boolean;
  message?: string;
}

const mockEmails: RFQEmail[] = [
  {
    category: "Laptops",
    subject: "RFQ: 35 Lenovo 100w Gen 4 Laptops for Government Tender",
    to: "sales@lenovo.com",
    content: `Dear Lenovo Sales Team,

I am writing to request a quotation for 35 Lenovo 100w Gen 4 laptops for a government tender. The specifications we require are:

• Screen: 13.3" display
• RAM: 16GB
• Storage: 512GB
• Processor: Intel Processor N100
• Operating System: Windows 11
• Battery: 47Wh

Please provide:
1. Unit price and total cost for 35 units
2. Delivery timeline
3. Warranty terms
4. Support options
5. Bulk order discounts if applicable

We need this quotation by the end of next week for our tender submission.

Best regards,
[Your name]`,
  },
  {
    category: "Monitors",
    subject: "RFQ: 20 Dell UltraSharp U2723QE Monitors",
    to: "dell.commercial@dell.com",
    content: `Dear Dell Commercial Team,

I am requesting a quotation for 20 Dell UltraSharp U2723QE monitors with the following specifications:

• Resolution: 3840x2160
• Panel Type: IPS
• Size: 27"
• Ports: HDMI, DisplayPort, USB-C
• Response Time: 5ms
• Brightness: 350cd/m²

Please include in your quotation:
1. Unit price and total cost for 20 units
2. Estimated delivery time
3. Warranty information
4. Installation support options
5. Volume discount details

We require this quotation within 5 business days.

Best regards,
[Your name]`,
  },
  {
    category: "Network Switches",
    subject: "RFQ: 8 Cisco Catalyst 9200-48P Network Switches",
    to: "cisco.sales@cisco.com",
    content: `Dear Cisco Sales Team,

I am writing to request a quotation for 8 Cisco Catalyst 9200-48P Network Switches with the following specifications:

• 48 Ports
• 10GbE Speed
• PoE+ Support
• Switching Capacity: 176 Gbps
• Full Management Capabilities
• Stacking Support
• Power Budget: 740W

Please provide the following information:
1. Unit price and total cost for 8 units
2. Lead time for delivery
3. Warranty and support terms
4. Installation services available
5. Training options for our IT team

We need this quotation within the next 7 business days.

Best regards,
[Your name]`,
  },
];

/**
 * Extracts criteria from a PDF file
 *
 * @param file The PDF file to process
 * @returns A promise that resolves to the extracted criteria
 */
/*
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
*/

/**
 * Submits the validated criteria to the server
 *
 * @param criteria The validated criteria to submit
 * @returns A promise that resolves to the submission result
 */
/*
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
  */

export async function processRequirements(): Promise<ProcessingResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        recommendations: mockRecommendations,
      });
    }, 2000); // 2 second delay to simulate API response
  });
}

export async function generateEmails(): Promise<GenerateEmailsResponse> {
  // Mock API call - in a real app, you would send a request to your server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        emails: mockEmails,
      });
    }, 2000);
  });
}

export async function sendEmails(
  emails: RFQEmail[]
): Promise<SendEmailsResponse> {
  // Mock API call - in a real app, you would send a request to your server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "All emails have been sent successfully",
      });
    }, 1500);
  });
}

// In a real implementation, replace these functions with actual API calls:
export async function extractCriteriaFromPDF(
  file: File
): Promise<ExtractCriteriaResponse> {
  try {
    const formData = new FormData();

    formData.append("file", file);

    // create json object with input key and text as value
    const json = {
      input:
        "I need a laptop with atleast 512GB storage with extensive certified security features and a camera shutter",
    };

    const response = await fetch("http://localhost:3001/extract-req", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to process PDF");
    }

    const data = await response.json();

    return {
      criteria: data,
      success: true,
      message: "Criteria extracted successfully",
    };
  } catch (error) {
    return {
      criteria: [],
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function submitCriteria(
  criteria: Criterion[]
): Promise<SubmitCriteriaResponse> {
  try {
    const response = await fetch("http://localhost:3001/match-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requirements: criteria }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit criteria");
    }

    const data = await response.json();

    return {
      success: true,
      message: "Criteria submitted successfully",
      recommendations: data || [],
    };
  } catch (error) {
    console.error("Error submitting criteria:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
