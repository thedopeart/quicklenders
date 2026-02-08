export const domain = 'quicklenders.com'
export const companyName = 'Quick Lenders'
export const phoneNumber = '3039218529'
export const phoneFormatted = '(303) 921-8529'
export const emailAddress = 'info@quicklenders.com'
export const hours = 'Mon-Fri 9AM-5PM MST'

export const address: Address = {
    street: '',
    city: '',
    state: 'Colorado',
    stateAbbr: 'CO',
    zip: '',
    country: 'USA',
}

export const loanProducts = [
  { name: 'Term Loans', slug: 'term-loans', amountRange: '$30,000 - $10M', terms: '1-3 years', rates: '10-25%' },
  { name: 'Lines of Credit', slug: 'lines-of-credit', amountRange: '$30,000 - $10M', terms: '1-3 years', rates: '10-25%' },
  { name: 'Asset-Based Lending', slug: 'asset-backed-loans', amountRange: '$250,000 - $100M', terms: '1-3 years', rates: '10-25%' },
  { name: 'Equipment Financing', slug: 'equipment-financing', amountRange: '$50,000 - $50M', terms: '1-7 years', rates: '7-14%' },
  { name: 'ESOP', slug: 'esop', amountRange: '$1M - $50M', terms: '3-10 years', rates: '6-9%' },
  { name: 'Investment Banking', slug: 'investment-banking', amountRange: '$20M+', terms: '1-10 years', rates: '8-15%' },
  { name: 'Bonds', slug: 'bonds', amountRange: '$250,000 - $50M', terms: '1-10 years', rates: '4-8%' },
] as const