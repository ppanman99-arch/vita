/**
 * E-contract (electronic contract) integration for góp vốn / ESG investment.
 * Stub: returns mock contract id; replace with real e-contract provider when ready.
 * Env: API keys should be server-side (Edge Function / backend).
 */

export interface CreateContractParams {
  investmentId: string;
  userId: string;
  opportunityId: string;
  amount: number;
  partyNames: { investor: string; cooperative: string };
}

export interface CreateContractResult {
  contractId: string | null;
  signingUrl: string | null;
  error?: string;
}

/**
 * Create contract and return contract id and optional signing link.
 * Real implementation would call e-contract provider API.
 */
export async function createContract(params: CreateContractParams): Promise<CreateContractResult> {
  // Stub: return mock id. Replace with real API call.
  if (import.meta.env.VITE_ECONTRACT_API_URL) {
    // TODO: call backend/Edge Function to create contract, return contractId and signingUrl
  }
  return {
    contractId: `contract-${params.investmentId}-${Date.now()}`,
    signingUrl: null,
  };
}
