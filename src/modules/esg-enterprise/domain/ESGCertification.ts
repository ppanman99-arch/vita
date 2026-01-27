/** Domain entity for ESG / green certifications. */

export interface ESGCertification {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  expiryAt?: string;
  type?: string;
}
