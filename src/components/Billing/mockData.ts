export const mockPaymentMethods = [
  { id: 1, brand: "Visa", last4: "4242", exp: "12/26", isDefault: true },
  { id: 2, brand: "Mastercard", last4: "5555", exp: "09/24", isDefault: false },
  { id: 3, brand: "Amex", last4: "3782", exp: "11/25", isDefault: false },
];

export const mockInvoices = [
  { id: "#MS-415646", date: "2025-11-01", amount: 180.00, status: "Paid" },
  { id: "#RV-126749", date: "2025-10-01", amount: 250.00, status: "Paid" },
  { id: "#QW-103578", date: "2025-09-01", amount: 120.00, status: "Due" },
  { id: "#MS-415647", date: "2024-04-01", amount: 99.99, status: "Paid" },
  { id: "#AR-803481", date: "2024-02-09", amount: 300.00, status: "Paid" },
];

export const mockBillingInformation = [
  { id: 1, fullName: "Oliver Liam", company: "Viking Burrito", email: "oliver.liam@example.com", vatNumber: "FRB1235476", billingCycle: "Monthly", nextPaymentDate: "2025-12-01", amount: 49.99 },
  { id: 2, fullName: "Lucas Harper", company: "Stone Tech Zone", email: "lucas@stone-tech.com", vatNumber: "FRB1235476", billingCycle: "Monthly", nextPaymentDate: "2025-12-15", amount: 87.08 },
  { id: 3, fullName: "Ethan James", company: "Fiber Notion", email: "ethan@fiber.com", vatNumber: "FRB1235476", billingCycle: "Annually", nextPaymentDate: "2026-01-23", amount: 102.11 },
];

export const mockTransactions = [
  { id: 1, description: "Netflix", date: "2020-03-27 13:45:00", amount: 2500.00, type: "debit" },
  { id: 2, description: "Apple", date: "2020-03-27 04:30:00", amount: 2000.99, type: "credit" }, 
  { id: 3, description: "Stripe", date: "2020-03-26 13:45:00", amount: 750.00, type: "credit" },
  { id: 4, description: "HubSpot", date: "2020-03-26 12:30:00", amount: 1000.00, type: "credit" },
  { id: 5, description: "Creative Tim", date: "2020-03-26 08:30:00", amount: 2500.00, type: "credit" },
  { id: 6, description: "Webflow", date: "2020-03-26 05:00:00", amount: 120.00, type: "pending" },
];