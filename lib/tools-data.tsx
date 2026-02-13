import Link from 'next/link'
import { ReactNode } from 'react'
import {
  Calculator,
  ArrowRightLeft,
  PiggyBank,
  TrendingUp,
  BarChart3,
  DollarSign,
  Percent,
  Building2,
  Scale,
  Clock,
  FileText,
  Landmark,
  CreditCard,
  Receipt,
  BadgeDollarSign,
  Briefcase,
  LineChart,
  Wallet,
  Banknote,
  Shield,
  BookOpen,
  Target,
  Search,
} from 'lucide-react'

export type ToolCategory = 'calculators' | 'interactive-tools' | 'content-assets'
export type ToolStatus = 'live' | 'coming-soon'

export interface ToolData {
  slug: string
  name: string
  category: ToolCategory
  status: ToolStatus
  icon: React.ComponentType<{ className?: string }>
  shortDescription: string
  longDescription: string
  features: string[]
  faqs: { question: string; answer: ReactNode; schemaAnswer: string }[]
  seo: {
    title: string
    description: string
  }
  relatedTools: string[]
  relatedLoanProducts: string[]
}

export const categoryLabels: Record<ToolCategory, string> = {
  'calculators': 'Calculators',
  'interactive-tools': 'Interactive Tools',
  'content-assets': 'Content Assets',
}

export const toolsData: Record<string, ToolData> = {
  'loan-payment-calculator': {
    slug: 'loan-payment-calculator',
    name: 'Loan Payment Calculator',
    category: 'calculators',
    status: 'live',
    icon: Calculator,
    shortDescription: 'Calculate monthly payments, total interest, and amortization schedules for any business loan.',
    longDescription: 'Our free business loan payment calculator helps you estimate monthly payments, total interest costs, and view a complete amortization schedule. Compare different loan amounts, interest rates, and term lengths to find the financing structure that fits your budget.',
    features: ['Amortization schedule', 'Multiple payment frequencies', 'Interactive charts', 'Instant results', 'Estimated payoff date', 'Payment frequency comparison'],
    faqs: [
      {
        question: 'How is the monthly loan payment calculated?',
        answer: <>The monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. This formula ensures each payment covers both interest and principal, with the interest portion decreasing over time as you pay down the balance. Our calculator handles this math automatically. Just enter your <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">loan terms</Link> and see your results instantly.</>,
        schemaAnswer: 'The monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. This formula ensures each payment covers both interest and principal, with the interest portion decreasing over time as the balance is paid down.',
      },
      {
        question: 'What is an amortization schedule?',
        answer: <>An amortization schedule is a complete table showing every payment over the life of a loan, broken down into principal and interest components. Early payments consist mostly of interest, while later payments apply more toward the principal balance. This schedule helps you understand exactly how much of each payment goes toward reducing your debt versus paying interest charges. For <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loans</Link>, understanding amortization is key to effective financial planning.</>,
        schemaAnswer: 'An amortization schedule is a complete table showing every payment over the life of a loan, broken down into principal and interest components. Early payments consist mostly of interest, while later payments apply more toward the principal balance. This schedule helps you understand exactly how much of each payment goes toward reducing your debt versus paying interest charges.',
      },
      {
        question: 'How does the payment frequency affect total interest paid?',
        answer: <>Choosing biweekly or weekly payments instead of monthly can reduce the total interest you pay over the life of the loan. With biweekly payments, you make 26 half-payments per year, which equals 13 full payments, effectively one extra payment annually. This accelerates principal reduction and shortens the loan term. The savings can be significant on larger <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business loans</Link>, potentially saving thousands in interest charges.</>,
        schemaAnswer: 'Choosing biweekly or weekly payments instead of monthly can reduce the total interest you pay over the life of the loan. With biweekly payments, you make 26 half-payments per year, which equals 13 full payments, one extra payment annually. This accelerates principal reduction and shortens the loan term, potentially saving thousands in interest charges.',
      },
      {
        question: 'What loan amounts and terms can I calculate?',
        answer: <>Our calculator supports loan amounts from $10,000 to $10,000,000, interest rates from 1% to 35%, and terms from 6 months to 25 years. You can toggle between monthly, biweekly, and weekly payment frequencies to see how each option affects your total cost. For personalized rates based on your business profile, you can <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">get your options</Link> with no impact to your credit score.</>,
        schemaAnswer: 'The calculator supports loan amounts from $10,000 to $10,000,000, interest rates from 1% to 35%, and terms from 6 months to 25 years. You can toggle between monthly, biweekly, and weekly payment frequencies to see how each option affects your total cost.',
      },
      {
        question: 'Is this calculator accurate for business loans?',
        answer: <>This calculator uses the same standard amortization formula that lenders use to determine payment schedules for <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> and other fixed-rate products. However, actual loan terms may include origination fees, variable rates, or other factors that affect total cost. For a precise quote tailored to your situation, we recommend <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">speaking with a funding specialist</Link> at Quick Lenders.</>,
        schemaAnswer: 'This calculator uses the same standard amortization formula that lenders use to determine payment schedules for term loans and other fixed-rate products. However, actual loan terms may include origination fees, variable rates, or other factors that affect total cost. For a precise quote, speaking with a funding specialist is recommended.',
      },
    ],
    seo: {
      title: 'Business Loan Payment Calculator | Quick Lenders',
      description: 'Calculate your business loan payments, total interest, and amortization schedule. Compare monthly, biweekly, and weekly payment options. Free calculator with instant results.',
    },
    relatedTools: ['factor-rate-to-apr-calculator', 'total-cost-of-capital-calculator', 'business-loan-comparison-tool'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'factor-rate-to-apr-calculator': {
    slug: 'factor-rate-to-apr-calculator',
    name: 'Factor Rate to APR Converter',
    category: 'calculators',
    status: 'live',
    icon: ArrowRightLeft,
    shortDescription: 'Convert factor rates to APR to understand the true annual cost of merchant cash advances and short-term loans.',
    longDescription: 'Factor rates can make expensive financing look affordable. Our free converter translates factor rates into APR so you can compare the true cost of merchant cash advances and short-term business loans against traditional financing options.',
    features: ['Factor rate to APR conversion', 'Total cost breakdown', 'Payment schedule', 'Cost comparison context', 'Cost per dollar borrowed', 'Daily, weekly & monthly payments'],
    faqs: [
      {
        question: 'What is a factor rate?',
        answer: <>A factor rate is a decimal number (typically between 1.1 and 1.5) used to calculate the total repayment amount on merchant cash advances and some short-term business loans. Unlike an interest rate, a factor rate is multiplied by the total borrowed amount to determine the fixed total repayment. For example, a $50,000 advance with a 1.30 factor rate means you repay $65,000 total. Because factor rates do not account for repayment timing, they can obscure the true cost, which is why converting to APR is important. Learn more about <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan alternatives</Link> with transparent interest rates.</>,
        schemaAnswer: 'A factor rate is a decimal number (typically between 1.1 and 1.5) used to calculate the total repayment amount on merchant cash advances and some short-term business loans. It is multiplied by the total borrowed amount to determine the fixed total repayment. For example, a $50,000 advance with a 1.30 factor rate means you repay $65,000 total.',
      },
      {
        question: 'How do you convert a factor rate to APR?',
        answer: <>The simplified conversion formula is: APR = ((Factor Rate - 1) / Term in Years) x 100. For example, a 1.30 factor rate on a 6-month term equals approximately (0.30 / 0.5) x 100 = 60% APR. This conversion reveals the true annual cost, which is often dramatically higher than the factor rate suggests. Our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">calculator</Link> handles this conversion instantly and also shows your total repayment, cost per dollar borrowed, and payment schedule.</>,
        schemaAnswer: 'The simplified conversion formula is: APR = ((Factor Rate - 1) / Term in Years) x 100. For example, a 1.30 factor rate on a 6-month term equals approximately (0.30 / 0.5) x 100 = 60% APR. This conversion reveals the true annual cost, which is often dramatically higher than the factor rate suggests.',
      },
      {
        question: 'Why is APR more useful than a factor rate?',
        answer: <>APR (Annual Percentage Rate) standardizes borrowing costs on an annual basis, making it possible to compare different financing products on equal footing. A factor rate of 1.20 might seem low, but if the repayment term is only 3 months, the APR could exceed 80%. Traditional <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link> quote rates as APR, making comparison straightforward. Always convert factor rates to APR before committing to any financing.</>,
        schemaAnswer: 'APR standardizes borrowing costs on an annual basis, making it possible to compare different financing products on equal footing. A factor rate of 1.20 might seem low, but if the repayment term is only 3 months, the APR could exceed 80%. Traditional business loans and lines of credit quote rates as APR, making comparison straightforward.',
      },
      {
        question: 'What is a typical factor rate for a merchant cash advance?',
        answer: <>Merchant cash advances typically carry factor rates between 1.10 and 1.50, with most falling in the 1.20 to 1.40 range. This translates to APRs that can range from 30% to over 150%, depending on the repayment term. While MCAs provide fast funding, the cost can be substantially higher than traditional options. If you qualify, a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loan</Link> or <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> typically offers much lower effective rates.</>,
        schemaAnswer: 'Merchant cash advances typically carry factor rates between 1.10 and 1.50, with most falling in the 1.20 to 1.40 range. This translates to APRs that can range from 30% to over 150%, depending on the repayment term. While MCAs provide fast funding, the cost can be substantially higher than traditional term loans or lines of credit.',
      },
      {
        question: 'Can I use this calculator for any type of business financing?',
        answer: <>This calculator is specifically designed for financing products that use factor rates, including merchant cash advances, revenue-based financing, and some short-term business loans. If your financing uses a traditional interest rate, our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> is the better tool. For help evaluating your overall financing options, <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">connect with our team</Link> for a no-obligation consultation.</>,
        schemaAnswer: 'This calculator is specifically designed for financing products that use factor rates, including merchant cash advances, revenue-based financing, and some short-term business loans. If your financing uses a traditional interest rate, a standard loan payment calculator would be the better tool.',
      },
    ],
    seo: {
      title: 'Factor Rate to APR Converter | Free Tool | Quick Lenders',
      description: 'Convert factor rates to APR instantly. Understand the true annual cost of merchant cash advances and short-term business loans. See total repayment, cost per dollar, and payment breakdowns.',
    },
    relatedTools: ['loan-payment-calculator', 'total-cost-of-capital-calculator', 'business-loan-comparison-tool'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit'],
  },
  'total-cost-of-capital-calculator': {
    slug: 'total-cost-of-capital-calculator',
    name: 'Total Cost of Capital Calculator',
    category: 'calculators',
    status: 'live',
    icon: DollarSign,
    shortDescription: 'Calculate the complete cost of any financing option including fees, interest, and hidden charges.',
    longDescription: 'See the true all-in cost of any business loan or advance. Enter your rate, fees, and terms to get the effective APR, total cost of capital, and cost per dollar borrowed. Works with both APR and factor rate pricing.',
    features: ['All-in cost analysis', 'Fee breakdown chart', 'Effective APR calculation', 'Cost per dollar borrowed', 'Stated vs effective rate comparison', 'APR and factor rate support'],
    faqs: [
      {
        question: 'What is the total cost of capital?',
        answer: <>The total cost of capital is the sum of all costs you pay to borrow money, including interest charges, origination fees, closing costs, documentation fees, and any other charges. It gives you a single number that represents the true price of financing. For example, a $200,000 <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> at 10% over 3 years with a 2% origination fee costs roughly $38,000 in interest plus $4,000 in fees, for a total cost of capital of $42,000.</>,
        schemaAnswer: 'The total cost of capital is the sum of all costs to borrow money, including interest charges, origination fees, closing costs, documentation fees, and other charges. It gives you a single number representing the true price of financing.',
      },
      {
        question: 'What is effective APR and how is it different from the stated rate?',
        answer: <>The stated rate is the interest rate your lender quotes. The effective APR includes all fees on top of the interest rate, expressed as an annual percentage. Fees reduce the net amount you receive while you still pay interest on the full loan amount. A 10% stated rate with a 3% origination fee might produce an effective APR of 12% or higher. The difference gets larger with higher fees and shorter terms. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR converter</Link> if your loan uses factor rate pricing instead of APR.</>,
        schemaAnswer: 'The stated rate is the quoted interest rate. The effective APR includes all fees on top of the interest rate, expressed as an annual percentage. Fees reduce the net amount you receive while you still pay interest on the full loan amount, making the effective APR higher than the stated rate.',
      },
      {
        question: 'What fees are commonly charged on business loans?',
        answer: <>Origination fees are the most common, typically 1% to 5% of the loan amount. Closing costs cover appraisals, title searches, and legal work. Documentation fees are charged for processing your application. Other charges may include UCC filing fees, wire transfer fees, and technology or platform fees. Not every lender charges all of these. When comparing offers, always ask for the full fee schedule. For <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>, watch for annual fees and draw fees in addition to the interest rate.</>,
        schemaAnswer: 'Common fees include origination fees (1-5% of loan amount), closing costs (appraisals, title, legal), documentation fees, UCC filing fees, wire fees, and platform fees. Not every lender charges all of these. Always ask for the full fee schedule when comparing offers.',
      },
      {
        question: 'What is a good cost per dollar borrowed?',
        answer: <>Cost per dollar borrowed tells you how much you pay in total costs for every $1 you receive. Under $0.10 per dollar is competitive for most business financing. Between $0.10 and $0.20 is typical. Above $0.25 is expensive and common with short-term or high-risk products. The number depends on your rate, term, and fees. A longer term at the same rate means higher cost per dollar because you pay interest for more months. Use our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> to compare cost per dollar across multiple offers.</>,
        schemaAnswer: 'Under $0.10 per dollar is competitive for most business financing. Between $0.10 and $0.20 is typical. Above $0.25 is expensive and common with short-term or high-risk products. The number depends on your rate, term length, and fees.',
      },
      {
        question: 'How can I reduce my total cost of capital?',
        answer: <>The most effective way is to negotiate lower fees or find a lender that charges fewer of them. Some lenders waive origination fees for strong borrowers. Choosing a shorter term reduces total interest but increases monthly payments. Improving your credit score and showing strong revenue can qualify you for lower rates. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to see what rates and fee structures are available for your business, with no impact to your credit score.</>,
        schemaAnswer: 'Negotiate lower fees, choose lenders with fewer charges, opt for shorter terms to reduce total interest, and improve your credit profile to qualify for lower rates. Comparing multiple offers is the most effective way to minimize total cost.',
      },
    ],
    seo: {
      title: 'Total Cost of Capital Calculator | Free | Quick Lenders',
      description: 'Calculate the true all-in cost of business financing. See effective APR, total fees, cost per dollar borrowed, and a breakdown of every charge beyond the stated rate.',
    },
    relatedTools: ['loan-payment-calculator', 'factor-rate-to-apr-calculator', 'business-loan-comparison-tool'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit'],
  },
  'break-even-calculator': {
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    category: 'calculators',
    status: 'live',
    icon: Target,
    shortDescription: 'Determine how many units or revenue you need to cover costs and start generating profit.',
    longDescription: 'Figure out exactly how many units you need to sell before your business turns a profit. Enter your fixed costs, price, and variable cost per unit, and this calculator does the rest. You will see your break-even point in units and revenue, plus an interactive chart showing your loss and profit zones.',
    features: ['Break-even units & revenue', 'Contribution margin analysis', 'Interactive profit chart', 'Real-time calculations', 'Revenue break-even point', 'Financing decision support'],
    faqs: [
      {
        question: 'What is a break-even point?',
        answer: <>The break-even point is the number of units you need to sell (or total revenue you need to earn) to cover all of your costs, both fixed and variable, with zero profit and zero loss. Every unit sold beyond that point generates profit. Knowing your break-even point is useful when planning a product launch, evaluating <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business loan</Link> feasibility, or setting prices.</>,
        schemaAnswer: 'The break-even point is the number of units sold (or total revenue) at which your business covers all of its costs, both fixed and variable, with zero profit and zero loss. Every unit sold beyond the break-even point generates profit. Knowing your break-even point is essential for planning product launches, evaluating loan feasibility, and setting prices.',
      },
      {
        question: 'How is the break-even point calculated?',
        answer: <>The break-even point in units is calculated by dividing your total fixed costs by the contribution margin per unit. The contribution margin is simply your selling price minus the variable cost per unit. For example, if your monthly fixed costs are $25,000, your price is $150, and your variable cost is $60 per unit, the contribution margin is $90, and you need to sell approximately 278 units to break even. Our <Link href="/tools/break-even-calculator" className="text-theme-primary-light font-medium hover:underline">calculator</Link> handles this math instantly.</>,
        schemaAnswer: 'The break-even point in units is calculated by dividing total fixed costs by the contribution margin per unit (selling price minus variable cost per unit). For example, if monthly fixed costs are $25,000, price is $150, and variable cost is $60, the contribution margin is $90 and you need to sell approximately 278 units to break even.',
      },
      {
        question: 'What is a contribution margin?',
        answer: <>The contribution margin is the amount each unit sold contributes toward covering your fixed costs and generating profit. It equals the selling price minus the variable cost per unit. A higher contribution margin means you need fewer sales to break even. The contribution margin ratio (expressed as a percentage of the selling price) shows how efficiently each dollar of revenue covers overhead. For businesses evaluating <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link>, improving contribution margin is a key lever.</>,
        schemaAnswer: 'The contribution margin is the amount each unit sold contributes toward covering fixed costs and generating profit, calculated as selling price minus variable cost per unit. A higher contribution margin means fewer sales are needed to break even. The contribution margin ratio, expressed as a percentage of selling price, shows how efficiently each revenue dollar covers overhead.',
      },
      {
        question: 'What counts as a fixed cost vs. a variable cost?',
        answer: <>Fixed costs stay the same regardless of how many units you sell. Examples: rent, salaries, insurance, and <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">loan payments</Link>. Variable costs change with production volume. Examples: raw materials, packaging, shipping, and sales commissions. Correctly categorizing your costs is critical for an accurate break-even analysis. A good rule of thumb: if the cost exists even when you sell zero units, it is fixed.</>,
        schemaAnswer: 'Fixed costs remain constant regardless of how many units you sell, such as rent, salaries, insurance, and loan payments. Variable costs change directly with production volume, such as raw materials, packaging, shipping, and sales commissions. If a cost exists even when you sell zero units, it is fixed.',
      },
      {
        question: 'How can break-even analysis help with financing decisions?',
        answer: <>Break-even analysis shows you how much additional revenue a new investment or loan needs to generate before it pays for itself. If you are considering a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> to fund expansion, add the loan payment to your fixed costs and recalculate. That tells you the minimum sales volume needed to cover the financing. You can also use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to determine exact monthly payments before plugging them into this tool.</>,
        schemaAnswer: 'Break-even analysis shows how much additional revenue a new investment or loan needs to generate before it becomes profitable. By adding loan payments to fixed costs and recalculating, you can determine the minimum sales volume needed to cover financing costs.',
      },
    ],
    seo: {
      title: 'Break-Even Calculator | Free Business Tool | Quick Lenders',
      description: 'Calculate your break-even point in units and revenue. See your profit zone with an interactive chart and contribution margin analysis. Free calculator, no signup required.',
    },
    relatedTools: ['loan-payment-calculator', 'roi-calculator', 'total-cost-of-capital-calculator'],
    relatedLoanProducts: ['term-loans', 'equipment-financing', 'lines-of-credit'],
  },
  'roi-calculator': {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'calculators',
    status: 'live',
    icon: TrendingUp,
    shortDescription: 'Measure the return on investment for business purchases, expansions, and financing decisions.',
    longDescription: 'Calculate whether a business loan will generate positive returns. Enter your loan amount, expected revenue increase, and cost savings to see your ROI percentage, net profit, payback period, and monthly cash flow impact. Includes a cumulative profit chart showing when your investment breaks even.',
    features: ['ROI percentage with verdict', 'Net profit over loan term', 'Payback period in months', 'Monthly cash flow impact', 'Cumulative profit chart', 'Ramp-up period modeling'],
    faqs: [
      {
        question: 'How is business loan ROI calculated?',
        answer: <>ROI measures the return you get relative to the cost of the investment. The formula is: ROI = (Net Profit / Investment Cost) x 100. Net profit is the total revenue increase and cost savings from the investment, minus the total cost of the loan (all payments including interest). If you borrow $200,000 and the investment generates $300,000 in total returns over the loan term, your net profit is $100,000 and your ROI is 50%. This calculator factors in the full cost of borrowing, including interest, so you see the true return after financing costs.</>,
        schemaAnswer: 'ROI = (Net Profit / Investment Cost) x 100. Net profit is the total revenue increase and cost savings minus the total loan cost including interest. A positive ROI means the investment generates more than it costs to finance.',
      },
      {
        question: 'What is a good ROI for a business loan?',
        answer: <>Any positive ROI means the investment is generating more than the cost of borrowing. An ROI above 25% is generally considered strong for a financed investment. Between 10% and 25% is solid. Below 10% is marginal and you should consider whether the risk is worth the return. Negative ROI means the loan costs more than the investment produces, so you would lose money. These thresholds vary by industry and risk tolerance. Use our <Link href="/tools/break-even-calculator" className="text-theme-primary-light font-medium hover:underline">break-even calculator</Link> for a more detailed break-even analysis.</>,
        schemaAnswer: 'Any positive ROI means the investment earns more than it costs. Above 25% is strong, 10-25% is solid, below 10% is marginal, and negative means the loan costs more than the investment returns.',
      },
      {
        question: 'What does the ramp-up period mean?',
        answer: <>The ramp-up period is the number of months after you make the investment before it starts generating its full expected returns. Most business investments do not produce results on day one. New equipment might take a month to install. A new location might take 3 months to attract customers. A marketing campaign might take 6 months to show full impact. During the ramp-up, you are still making loan payments but the investment has not yet reached full productivity. This calculator accounts for the ramp-up by excluding those months from the return calculation, giving you a more realistic ROI.</>,
        schemaAnswer: 'The ramp-up period is the months between making an investment and when it starts generating full returns. New equipment, locations, or campaigns typically need 1-6 months before reaching full productivity. The calculator excludes ramp-up months from returns for a realistic ROI.',
      },
      {
        question: 'Should I use ROI or payback period to evaluate a loan?',
        answer: <>Both metrics tell you different things. ROI shows the total percentage return over the life of the loan. Payback period shows how many months until the investment has covered its own cost. Use payback period if cash flow timing matters: if your payback is 18 months on a 36-month loan, you will be cash-flow positive for the last 18 months. Use ROI to compare different investment options: a 40% ROI with one strategy versus 25% with another. Our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> shows the exact monthly payments so you can plan cash flow alongside ROI.</>,
        schemaAnswer: 'ROI shows total percentage return over the loan term. Payback period shows months until the investment covers its cost. Use payback for cash flow timing, ROI for comparing investments. Both together give a complete picture.',
      },
      {
        question: 'Is it worth taking a loan to grow my business?',
        answer: <>It depends on the numbers. If the expected return from the investment exceeds the total cost of borrowing, the loan creates value. A $200,000 equipment purchase at 10% over 3 years costs roughly $232,000 total. If that equipment generates $400,000 in additional revenue, the net profit is $168,000 and the ROI is 84%. Enter your specific numbers in this calculator to see your projected return. If the ROI is negative or below 10%, consider whether the investment can be scaled differently or if the timing is right. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to explore your financing options with no impact to your credit score.</>,
        schemaAnswer: 'It depends on the numbers. If the expected return exceeds total borrowing cost, the loan creates value. Enter your specific investment amount, expected revenue increase, and loan terms to see your projected ROI. Positive ROI means the loan pays for itself and more.',
      },
    ],
    seo: {
      title: 'ROI Calculator | Is a Business Loan Worth It? | Quick Lenders',
      description: 'Calculate return on investment for business loans. See ROI percentage, net profit, payback period, and cash flow impact. Free, instant results.',
    },
    relatedTools: ['break-even-calculator', 'loan-payment-calculator', 'business-loan-comparison-tool'],
    relatedLoanProducts: ['term-loans', 'equipment-financing', 'lines-of-credit'],
  },
  'equipment-financing-calculator': {
    slug: 'equipment-financing-calculator',
    name: 'Equipment Financing Calculator',
    category: 'calculators',
    status: 'live',
    icon: Building2,
    shortDescription: 'Compare the true cost of buying vs. leasing equipment, including tax benefits, Section 179, and total cost of ownership.',
    longDescription: 'Run a full lease-vs-buy comparison for your equipment purchase. Enter the equipment cost, financing terms, and lease terms to see a side-by-side breakdown of monthly payments, total cost, tax savings, and residual value. Includes Section 179 deduction estimates and a clear recommendation.',
    features: ['Lease vs buy comparison', 'Section 179 tax savings', 'Total cost of ownership', 'Monthly payment breakdown', 'Residual value analysis', 'Decision guidance'],
    faqs: [
      {
        question: 'Is it better to buy or lease equipment for a small business?',
        answer: <>It depends on how long you will use the equipment, your tax situation, cash flow needs, and whether the equipment holds its value. Buying is generally cheaper long-term for equipment you will use for many years, especially when you factor in Section 179 tax deductions and residual value. Leasing works better for technology that becomes outdated quickly or when you need to preserve cash. This calculator runs the full comparison with your numbers. See our <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link> page for more on purchase options.</>,
        schemaAnswer: 'It depends on usage duration, tax situation, cash flow, and residual value. Buying is generally cheaper long-term for durable equipment, especially with Section 179 deductions. Leasing works better for rapidly changing technology or when cash preservation is the priority.',
      },
      {
        question: 'What is Section 179 and how does it affect the buy vs lease decision?',
        answer: <>Section 179 of the IRS tax code allows businesses to deduct the full purchase price of qualifying equipment in the year it is placed in service, rather than depreciating it over several years. The current annual limit is $1,160,000. This can dramatically reduce the effective first-year cost of buying equipment with financing. For example, purchasing $150,000 of equipment at a 25% tax rate saves $37,500 in Year 1 taxes. Leased equipment under a capital lease may also qualify, but operating leases generally do not. Consult your accountant for specifics.</>,
        schemaAnswer: 'Section 179 allows businesses to deduct the full purchase price of qualifying equipment in the year of purchase, up to $1,160,000. This can dramatically reduce the effective cost of buying. For example, $150,000 of equipment at a 25% tax rate saves $37,500 in Year 1 taxes.',
      },
      {
        question: 'Can I get equipment financing with bad credit?',
        answer: <>Equipment financing is often easier to qualify for than unsecured loans because the equipment itself serves as collateral. While better credit gets better rates, many lenders work with credit scores in the 600+ range for equipment loans. Rates for equipment financing typically range from 7% to 14%, depending on creditworthiness and equipment type. <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">Asset-based lending</Link> is another option for larger purchases. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Check your options</Link> to see what you qualify for.</>,
        schemaAnswer: 'Equipment financing is often easier to qualify for because the equipment serves as collateral. Many lenders work with credit scores in the 600+ range. Rates typically range from 7-14% depending on creditworthiness and equipment type.',
      },
      {
        question: 'What is the difference between an operating lease and a capital lease?',
        answer: <>An operating lease is like renting. You use the equipment and return it when the lease ends, with no ownership transfer. A capital lease (also called a $1 buyout lease) is structured so you own the equipment at the end for a nominal fee. Capital leases are treated more like purchases for accounting and tax purposes, meaning you may be able to claim depreciation. Operating leases keep the asset off your balance sheet and the full payment is deductible as a business expense.</>,
        schemaAnswer: 'An operating lease is like renting. You return the equipment at the end. A capital lease transfers ownership at the end for a nominal fee. Capital leases are treated like purchases for tax purposes. Operating leases keep the asset off your balance sheet.',
      },
      {
        question: 'How long should I finance equipment?',
        answer: <>A good guideline is to match your loan term to the equipment&apos;s useful life. You do not want to still be paying for equipment that needs replacing. For vehicles and fleet equipment, 3 to 5 years is typical. For heavy machinery and manufacturing equipment, 5 to 7 years. For technology and IT equipment, 2 to 3 years. Our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> can help you see how different terms affect your monthly payment.</>,
        schemaAnswer: 'Match your loan term to the equipment useful life. Vehicles: 3-5 years. Heavy machinery: 5-7 years. Technology: 2-3 years. Avoid paying for equipment that needs replacing.',
      },
    ],
    seo: {
      title: 'Equipment Financing & Leasing Calculator | Quick Lenders',
      description: 'Compare the true cost of buying vs leasing equipment. Factor in Section 179, tax benefits, and residual value. Free side-by-side calculator.',
    },
    relatedTools: ['loan-payment-calculator', 'break-even-calculator', 'loan-affordability-calculator'],
    relatedLoanProducts: ['equipment-financing', 'asset-backed-loans', 'term-loans'],
  },
  'dscr-calculator': {
    slug: 'dscr-calculator',
    name: 'DSCR Calculator',
    category: 'calculators',
    status: 'live',
    icon: Scale,
    shortDescription: 'Calculate your Debt Service Coverage Ratio to see if your business can handle new loan payments.',
    longDescription: 'DSCR is one of the first metrics lenders check when evaluating a loan application. Enter your income and debt obligations to see your ratio, how lenders interpret it, and what you can afford. Includes simple and detailed calculation modes.',
    features: ['Current & projected DSCR', 'Visual gauge with lender zones', 'Simple & detailed modes', 'Lender requirement comparison', 'What-if scenarios', 'Max affordable payment'],
    faqs: [
      {
        question: 'What is Debt Service Coverage Ratio (DSCR)?',
        answer: <>DSCR measures how much income your business has available to cover debt payments. The formula is simple: divide your annual Net Operating Income by your total annual debt service (all loan payments). A DSCR of 1.0 means your income exactly covers your debt. Anything above 1.0 means you have a cushion. Most lenders want to see 1.15 or higher before approving a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business loan</Link>.</>,
        schemaAnswer: 'DSCR measures how much income your business has available to cover debt payments. The formula is: Net Operating Income divided by Total Annual Debt Service. A DSCR of 1.0 means income exactly covers debt. Most lenders require 1.15 or higher.',
      },
      {
        question: 'What DSCR do lenders require?',
        answer: <>Requirements vary by lender type. SBA loans typically require a minimum DSCR of 1.15. Traditional bank <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> usually look for 1.20 to 1.35. Online lenders are more flexible, often accepting 1.0 to 1.15. Commercial real estate loans generally require 1.25 to 1.35. A higher DSCR does not just help you qualify. It can also get you better rates and terms because the lender sees lower risk.</>,
        schemaAnswer: 'SBA loans typically require a minimum DSCR of 1.15. Bank term loans look for 1.20 to 1.35. Online lenders often accept 1.0 to 1.15. Commercial real estate loans require 1.25 to 1.35. A higher DSCR can also improve your rates and terms.',
      },
      {
        question: 'What if my DSCR is below 1.0?',
        answer: <>A DSCR below 1.0 means your current income does not fully cover your debt payments. Most traditional lenders will not approve new financing at this level. However, you still have options: <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based lending</Link> evaluates your collateral rather than income alone, and revenue-based financing may focus on top-line sales. You can also improve your DSCR by increasing revenue, cutting operating costs, or paying down existing debt before applying.</>,
        schemaAnswer: 'A DSCR below 1.0 means your income does not fully cover debt payments. Most traditional lenders will not approve at this level. Options include asset-based lending, revenue-based financing, or improving your DSCR by increasing revenue, cutting costs, or paying down existing debt.',
      },
      {
        question: 'How is Net Operating Income (NOI) calculated?',
        answer: <>Net Operating Income is your annual revenue minus operating expenses, before interest, taxes, depreciation, and amortization. In simple terms: the money your business earns from operations before paying on any loans. You can find this on your Profit & Loss statement. Our calculator offers a detailed mode where you can enter revenue, cost of goods sold, and operating expenses separately if you do not know your NOI offhand. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to estimate proposed loan payments.</>,
        schemaAnswer: 'Net Operating Income is annual revenue minus operating expenses, before interest, taxes, depreciation, and amortization. It represents the money your business earns from operations before loan payments. You can find this on your Profit and Loss statement.',
      },
      {
        question: 'Can I get a loan with a low DSCR?',
        answer: <>Yes, depending on the financing type. <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> often focuses on the equipment value rather than DSCR. Invoice factoring evaluates your customers' creditworthiness. <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">Lines of credit</Link> from online lenders may accept lower ratios if your revenue is strong. A low DSCR does not mean zero options, but your choices and rates will be more limited. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to explore what fits your situation.</>,
        schemaAnswer: 'Yes, depending on the financing type. Equipment financing focuses on asset value rather than DSCR. Invoice factoring evaluates customer creditworthiness. Online lines of credit may accept lower ratios with strong revenue. Options exist but may be more limited.',
      },
    ],
    seo: {
      title: 'DSCR Calculator | Debt Coverage Ratio | Quick Lenders',
      description: 'Calculate your Debt Service Coverage Ratio instantly. See how lenders evaluate your business and what you can afford. Free, no signup required.',
    },
    relatedTools: ['loan-payment-calculator', 'loan-affordability-calculator', 'loan-finder-quiz'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'asset-backed-loans'],
  },
  'prepayment-penalty-calculator': {
    slug: 'prepayment-penalty-calculator',
    name: 'Prepayment Penalty Calculator',
    category: 'calculators',
    status: 'live',
    icon: PiggyBank,
    shortDescription: 'Calculate whether paying off your business loan early or refinancing makes sense after the prepayment penalty.',
    longDescription: 'Enter your current loan details and prepayment penalty terms to see the net savings from an early payoff or a refinance. Supports 5 penalty types: percentage of balance, percentage of original amount, SBA declining scale, minimum interest, and flat fee. Includes break-even analysis and a clear recommendation.',
    features: ['5 penalty types supported', 'Early payoff analysis', 'Refinance comparison', 'Break-even timeline', 'Net savings calculation', 'Keep vs pay vs refinance verdict'],
    faqs: [
      {
        question: 'What is a prepayment penalty?',
        answer: <>A prepayment penalty is a fee lenders charge when you pay off a loan before the scheduled end date. It compensates the lender for the interest income they lose when you pay early. Not all business loans have them, but many do. Common structures include a flat percentage of the remaining balance (typically 1% to 5%), a percentage of the original loan amount, or a minimum interest guarantee where you owe a set number of months of interest regardless of when you pay off. SBA 7(a) loans have a specific declining penalty: 5% in year 1, 3% in year 2, 1% in year 3, and nothing after that. Always check your loan agreement for prepayment terms before signing.</>,
        schemaAnswer: 'A prepayment penalty is a fee charged when you pay off a loan early. Common types include a percentage of the remaining balance (1-5%), minimum interest guarantees, and SBA declining penalties (5% year 1, 3% year 2, 1% year 3). Check your loan agreement for specifics.',
      },
      {
        question: 'When does paying a prepayment penalty make sense?',
        answer: <>Paying the penalty makes sense when the interest you save by paying off early exceeds the penalty cost. For example, if you owe $100,000 at 15% with 36 months left, your remaining interest is roughly $25,000. A 3% penalty costs $3,000. Net savings: $22,000. The penalty is clearly worth it. It also makes sense when you are refinancing to a much lower rate (at least 2 to 3 percentage points lower) and the break-even point falls well within your remaining term. Use this calculator to run your specific numbers. If the net savings are positive, paying early is usually the right move.</>,
        schemaAnswer: 'Paying the penalty makes sense when interest savings exceed the penalty cost. For example, a 3% penalty on $100,000 ($3,000) is worth paying if you save $22,000 in interest. Also worth it when refinancing to a rate at least 2-3% lower with a reasonable break-even.',
      },
      {
        question: 'How do SBA loan prepayment penalties work?',
        answer: <>SBA 7(a) loans over $50,000 have a declining prepayment penalty that only applies during the first 3 years and only if you pay off the loan using proceeds from another loan (refinancing). The penalty is 5% of the prepaid amount in year 1, 3% in year 2, and 1% in year 3. After year 3, there is no penalty. If you pay off the loan using business cash flow rather than refinancing, the SBA penalty typically does not apply. SBA 504 loans have different terms that vary by debenture. Check with your lender for specifics. Use our <Link href="/tools/sba-loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">SBA loan calculator</Link> to estimate payment and fee details.</>,
        schemaAnswer: 'SBA 7(a) loans over $50,000 have a declining penalty: 5% in year 1, 3% in year 2, 1% in year 3, none after. It only applies when refinancing with another loan, not when paying from business cash flow.',
      },
      {
        question: 'What is a break-even point for refinancing?',
        answer: <>The break-even point is the number of months it takes for your monthly payment savings to cover the upfront costs of refinancing (prepayment penalty plus any new loan fees). If refinancing costs $5,000 upfront and saves you $200 per month, your break-even is 25 months. After 25 months, every dollar saved is true savings. If your remaining term is shorter than the break-even point, refinancing costs more than it saves. A good rule: the break-even should be less than half your remaining term so you have meaningful savings after crossing it.</>,
        schemaAnswer: 'The break-even point is when monthly payment savings cover the upfront costs (penalty plus fees). Example: $5,000 costs / $200 monthly savings = 25 months. If remaining term is shorter than break-even, refinancing loses money.',
      },
      {
        question: 'How do I find out if my loan has a prepayment penalty?',
        answer: <>Check your original loan agreement or promissory note. Look for sections labeled "prepayment," "early payoff," "prepayment premium," or "exit fee." If you cannot find it, call your lender and ask directly. Some online lenders use "minimum interest" clauses instead of traditional penalties, which accomplish the same thing. When comparing new loan offers, always ask about prepayment terms upfront. A slightly higher rate with no penalty can be cheaper long-term than a lower rate with a 5% penalty. Use our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> to evaluate offers side by side.</>,
        schemaAnswer: 'Check your loan agreement for sections labeled prepayment, early payoff, or exit fee. Call your lender if unsure. Some lenders use minimum interest clauses instead. When comparing offers, always ask about prepayment terms upfront.',
      },
    ],
    seo: {
      title: 'Prepayment Penalty Calculator | Payoff Tool | Quick Lenders',
      description: 'Calculate your prepayment penalty and see if paying off early or refinancing saves money. Supports SBA, bank, and online lender penalties. Free, instant results.',
    },
    relatedTools: ['loan-payment-calculator', 'business-loan-comparison-tool', 'sba-loan-payment-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit'],
  },
  'refinance-savings-calculator': {
    slug: 'refinance-savings-calculator',
    name: 'Refinance Savings Calculator',
    category: 'calculators',
    status: 'live',
    icon: Percent,
    shortDescription: 'Compare your current loan with refinance options to see if switching makes financial sense.',
    longDescription: 'Find out if refinancing your business loan saves you money. Enter your current loan details and a new offer to see monthly savings, total interest saved, net savings after fees, and a break-even timeline.',
    features: ['Monthly payment comparison', 'Total interest savings', 'Net savings after fees', 'Break-even timeline', 'Balance payoff chart', 'Side-by-side comparison table'],
    faqs: [
      {
        question: 'When does refinancing a business loan make sense?',
        answer: <>Refinancing makes sense when the total savings exceed the total costs. The savings come from a lower interest rate, shorter term, or both. The costs include origination fees, closing costs, and any prepayment penalty on your existing loan. If the net savings are positive and the break-even period is shorter than the time you plan to keep the loan, refinancing is worth it. Use our <Link href="/tools/prepayment-penalty-calculator" className="text-theme-primary-light font-medium hover:underline">prepayment penalty calculator</Link> to estimate the cost of exiting your current loan early.</>,
        schemaAnswer: 'Refinancing makes sense when total savings exceed total costs. Savings come from a lower rate or shorter term. Costs include origination fees, closing costs, and prepayment penalties. If net savings are positive and the break-even period is shorter than the remaining loan life, refinancing is worthwhile.',
      },
      {
        question: 'What is the break-even point for refinancing?',
        answer: <>The break-even point is the number of months it takes for your monthly payment savings to cover the upfront cost of refinancing. If refinancing lowers your payment by $600/month and costs $3,600 in fees, the break-even is 6 months. After that, every month of savings is pure gain. If you plan to pay off the loan before the break-even point, refinancing costs more than it saves. A break-even under 12 months is generally a good sign. Our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> can help you estimate payments under different terms.</>,
        schemaAnswer: 'The break-even point is the number of months for monthly payment savings to cover refinance costs. If refinancing saves $600/month and costs $3,600, break-even is 6 months. After break-even, every month of savings is pure gain. Under 12 months is generally favorable.',
      },
      {
        question: 'Does refinancing always lower my interest rate?',
        answer: <>Not necessarily. Rates depend on your current credit profile, revenue, time in business, and market conditions. If your business has grown or your credit has improved since the original loan, you may qualify for a better rate. If conditions have worsened, you might not see an improvement. Even with a similar rate, refinancing can help if you extend the term to lower monthly payments or shorten it to reduce total interest. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to see what rates you qualify for today.</>,
        schemaAnswer: 'Not always. Rates depend on your credit profile, revenue, time in business, and market conditions. If your business has improved since the original loan, you may qualify for a better rate. Even with a similar rate, adjusting the term can lower payments or reduce total interest.',
      },
      {
        question: 'What fees are involved in refinancing?',
        answer: <>Common refinancing costs include an origination fee (1-3% of the new loan amount), closing costs ($500 to $5,000+), and a prepayment penalty on your existing loan if one exists. Some lenders waive origination fees to attract refinance borrowers. Always calculate the net savings after all costs before deciding. Our <Link href="/tools/total-cost-of-capital-calculator" className="text-theme-primary-light font-medium hover:underline">total cost of capital calculator</Link> can help you compare the all-in cost of each option.</>,
        schemaAnswer: 'Common refinancing costs include an origination fee (1-3%), closing costs ($500-$5,000+), and any prepayment penalty on the existing loan. Some lenders waive origination fees for refinance borrowers. Always calculate net savings after all costs.',
      },
      {
        question: 'Should I extend the term when refinancing?',
        answer: <>It depends on your priorities. Extending the term lowers monthly payments, which improves cash flow. But you pay interest for more months, so total interest may go up even with a lower rate. If cash flow is tight, the lower payment can be worth the extra interest. If you can afford the higher payment, keeping the same or a shorter term maximizes your total savings. This calculator shows both monthly savings and total cost so you can weigh the tradeoff for <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>.</>,
        schemaAnswer: 'Extending the term lowers monthly payments but may increase total interest even with a lower rate. If cash flow is tight, the lower payment can be worthwhile. If you can afford higher payments, keeping a shorter term maximizes total savings.',
      },
    ],
    seo: {
      title: 'Refinance Savings Calculator | Free | Quick Lenders',
      description: 'Calculate if refinancing your business loan saves money. See monthly savings, total interest saved, break-even timeline, and net savings after fees and penalties.',
    },
    relatedTools: ['loan-payment-calculator', 'total-cost-of-capital-calculator', 'prepayment-penalty-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit'],
  },
  'cash-flow-forecast-tool': {
    slug: 'cash-flow-forecast-tool',
    name: 'Cash Flow Forecast Tool',
    category: 'calculators',
    status: 'live',
    icon: LineChart,
    shortDescription: 'Project your business cash flow over the next 12 months with loan payments factored in.',
    longDescription: 'Enter your revenue, expenses, and loan payments to see a 12-month cash flow projection. Includes revenue growth modeling, seasonal adjustments, optional new loan impact, funding gap alerts, and a visual chart showing your cash position each month.',
    features: ['12-month cash projection', 'Revenue growth modeling', 'Seasonal adjustments', 'New loan impact analysis', 'Funding gap alerts', 'Monthly cash flow chart'],
    faqs: [
      {
        question: 'What is a cash flow forecast?',
        answer: <>A cash flow forecast projects how much cash your business will have each month over a future period, typically 12 months. It takes your expected revenue, subtracts operating expenses and loan payments, and shows whether you will have a surplus or a shortfall each month. The running cash balance tells you if and when you might run low on cash. Lenders often ask for a cash flow projection as part of a loan application because it shows you can handle the payments. This tool builds your forecast automatically from a few key inputs.</>,
        schemaAnswer: 'A cash flow forecast projects monthly cash position over a future period by subtracting expenses and loan payments from revenue. It shows surpluses, shortfalls, and when you might run low on cash.',
      },
      {
        question: 'How do I estimate revenue growth for my forecast?',
        answer: <>Start with your actual revenue from the past 3 to 6 months and use that as your baseline. For growth rate, look at your recent trend: if revenue has been growing 2% month-over-month, use that. If you are launching a new product or entering a new market, you might project higher growth, but be conservative. A common mistake is overestimating growth. If you are unsure, run the forecast twice: once with your optimistic estimate and once with 0% growth to see the worst case. This calculator lets you adjust individual months for seasonal patterns too.</>,
        schemaAnswer: 'Start with actual recent revenue as your baseline. Use your recent month-over-month growth rate. Be conservative with estimates. Run the forecast with both optimistic and 0% growth scenarios.',
      },
      {
        question: 'What happens if my forecast shows negative cash flow?',
        answer: <>Negative cash flow in one or two months is not unusual, especially for seasonal businesses. But if your running cash balance drops below zero, that means you would run out of cash without additional funding. Options include building a larger cash reserve before the gap, opening a <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> to bridge short periods, reducing expenses during slow months, or adjusting payment terms with customers and suppliers. This tool highlights months where your balance goes negative so you can plan ahead. Use our <Link href="/tools/working-capital-calculator" className="text-theme-primary-light font-medium hover:underline">working capital calculator</Link> to analyze your current cash position.</>,
        schemaAnswer: 'Negative cash flow in some months is common for seasonal businesses. If your running balance drops below zero, consider a cash reserve, line of credit, expense reductions, or adjusted payment terms.',
      },
      {
        question: 'How does adding a new loan affect my cash flow?',
        answer: <>A new loan adds a monthly payment to your expenses, which reduces your net cash flow. This tool lets you toggle on a proposed new loan payment to see the impact before you borrow. If your forecast stays positive with the new payment, you can likely handle the debt. If it pushes several months into negative territory, you may need a smaller loan, a longer term (lower payment), or to wait until revenue is stronger. Check your <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR</Link> to see how lenders will evaluate your debt capacity.</>,
        schemaAnswer: 'A new loan adds a monthly payment that reduces net cash flow. Toggle on a proposed payment in this tool to see if your forecast stays positive. If it goes negative, consider a smaller loan or longer term.',
      },
      {
        question: 'Should I include seasonal patterns in my forecast?',
        answer: <>Yes, if your business has predictable busy and slow periods. Restaurants, retail, landscaping, construction, tourism, and many service businesses see significant seasonal swings. Ignoring seasonality can make your forecast misleadingly optimistic during slow months or overly conservative during peak months. This tool lets you adjust individual months up or down as a percentage of your baseline revenue. If you do not have clear seasonal patterns, leaving all months at 100% works fine. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> about financing options designed for seasonal businesses.</>,
        schemaAnswer: 'Yes, if your business has predictable busy and slow periods. Ignoring seasonality can make forecasts misleading. This tool lets you adjust individual months up or down from your baseline revenue.',
      },
    ],
    seo: {
      title: 'Cash Flow Forecast Tool | 12-Month Projection | Quick Lenders',
      description: 'Project your business cash flow over 12 months. Model revenue growth, seasonal patterns, and new loan impact. See funding gaps instantly. Free tool.',
    },
    relatedTools: ['dscr-calculator', 'working-capital-calculator', 'loan-payment-calculator'],
    relatedLoanProducts: ['lines-of-credit', 'term-loans'],
  },
  'business-loan-comparison-tool': {
    slug: 'business-loan-comparison-tool',
    name: 'Loan Comparison Tool',
    category: 'interactive-tools',
    status: 'live',
    icon: BarChart3,
    shortDescription: 'Compare up to 3 loan offers side by side to find the best option for your business.',
    longDescription: 'Enter the details of multiple loan offers and see a side-by-side comparison of monthly payments, total interest, total cost with fees, and cost per $1,000 borrowed. See which loan wins by different criteria and get guidance on choosing the right option for your situation.',
    features: ['Side-by-side comparison', 'Up to 3 offers', 'Total cost ranking', 'Winner badges', 'Cost per $1,000 analysis', 'Fee impact breakdown'],
    faqs: [
      {
        question: 'Why does a lower interest rate sometimes cost more than a higher one?',
        answer: <>A lower rate on a longer term can result in more total interest than a higher rate on a shorter term. For example, 9% over 10 years costs far more in interest than 15% over 3 years on the same amount, even though the rate is lower. Total cost depends on both rate and term. This calculator shows total cost for each loan so you can see the full picture. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to explore different rate and term combinations.</>,
        schemaAnswer: 'A lower rate on a longer term can cost more in total interest than a higher rate on a shorter term. For example, 9% over 10 years costs far more in interest than 15% over 3 years. Total cost depends on both rate and term length.',
      },
      {
        question: 'What fees should I include when comparing loans?',
        answer: <>Include every upfront charge: origination fees (typically 1% to 5% of the loan amount), closing costs, documentation fees, and any other charges deducted from your proceeds or added to your balance. These fees increase your total cost and effective APR. A loan with a lower rate but 3% origination fee may actually cost more than one with a slightly higher rate and no fees. Enter all known fees in this calculator to see the true cost difference.</>,
        schemaAnswer: 'Include origination fees (typically 1-5%), closing costs, documentation fees, and any other upfront charges. These fees increase total cost and effective APR. A lower-rate loan with high fees may cost more than a higher-rate loan with no fees.',
      },
      {
        question: 'How is cost per $1,000 borrowed calculated?',
        answer: <>Cost per $1,000 borrowed equals your total financing cost (total interest plus all fees) divided by the number of thousands in your loan amount. This metric normalizes the comparison when loan amounts differ. For example, if Loan A costs $28,000 in interest and fees on a $100,000 loan, that is $280 per $1,000 borrowed. If Loan B costs $12,000 on $50,000, that is $240 per $1,000. Loan B is cheaper on a per-dollar basis even though Loan A has lower absolute cost.</>,
        schemaAnswer: 'Cost per $1,000 borrowed equals total financing cost (interest plus fees) divided by the loan amount in thousands. This normalizes comparison across different loan amounts, showing which loan is cheapest per dollar borrowed.',
      },
      {
        question: 'Should I always choose the loan with the lowest total cost?',
        answer: <>Not necessarily. The cheapest loan may have higher monthly payments that strain your cash flow. A slightly more expensive loan with lower payments might be the better choice if it keeps your business running smoothly. Speed also matters: an online lender at a higher rate may fund in days while a bank takes weeks. Consider total cost, monthly payment, funding speed, and flexibility when making your decision. Our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> can help you evaluate whether you can comfortably handle the payments.</>,
        schemaAnswer: 'Not necessarily. The cheapest loan may have higher monthly payments that strain cash flow. Consider total cost, monthly payment, funding speed, and flexibility. A slightly more expensive loan with lower payments may be the better choice for your business.',
      },
      {
        question: 'Can I compare different types of loans with this tool?',
        answer: <>Yes. You can compare any combination of <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link>, <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>, SBA loans, or other fixed-payment financing. Enter the amount, rate, and term for each offer. The calculator assumes standard amortization (equal monthly payments), which works for most term loan and SBA products. For revolving credit or variable-rate products, use our <Link href="/tools/line-of-credit-interest-calculator" className="text-theme-primary-light font-medium hover:underline">line of credit calculator</Link> instead.</>,
        schemaAnswer: 'Yes. You can compare term loans, lines of credit, SBA loans, or any fixed-payment financing. Enter the amount, rate, and term for each. The calculator uses standard amortization. For revolving credit, use the line of credit calculator instead.',
      },
    ],
    seo: {
      title: 'Compare Business Loan Offers Side by Side | Quick Lenders',
      description: 'Compare up to 3 business loan offers side by side. See monthly payments, total cost, fees, and which loan wins. Free, instant results.',
    },
    relatedTools: ['loan-payment-calculator', 'factor-rate-to-apr-calculator', 'loan-affordability-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'funding-readiness-assessment': {
    slug: 'funding-readiness-assessment',
    name: 'Funding Readiness Assessment',
    category: 'interactive-tools',
    status: 'live',
    icon: Shield,
    shortDescription: 'Answer a few questions to see how prepared your business is for financing approval.',
    longDescription: 'Take a quick assessment to evaluate your business readiness for loan approval based on common lender criteria like revenue, time in business, and credit profile.',
    features: ['Readiness score with breakdown', 'Category-by-category analysis', 'Loan type match ratings', 'Improvement tips per category', 'Credit and revenue evaluation', 'Dynamic next-step guidance'],
    faqs: [
      {
        question: 'How does the Funding Readiness Assessment score my business?',
        answer: <>The assessment evaluates eight factors that lenders commonly review: credit score range, time in business, monthly revenue, profitability, existing debt load, available collateral, documentation readiness, and loan purpose. Each answer contributes points to a total score, and results are broken into four categories (Credit and History, Revenue and Profitability, Debt and Collateral, Documentation and Purpose) so you can see exactly where your business is strong and where it needs work. The assessment reflects real lender criteria, not arbitrary benchmarks.</>,
        schemaAnswer: 'The assessment evaluates eight factors lenders commonly review: credit score, time in business, monthly revenue, profitability, existing debt, collateral, documentation readiness, and loan purpose. Each answer contributes points to a total score broken into four categories so you can see strengths and areas for improvement.',
      },
      {
        question: 'Does this assessment affect my credit score?',
        answer: <>No. The assessment does not pull your credit report or access any personal financial data. It only asks you to select the range your credit score falls into. Nothing you enter leaves your browser. If you decide to move forward after seeing your results, you can <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> who uses a soft credit check with no impact to your score.</>,
        schemaAnswer: 'No. The assessment does not pull your credit report or access any personal financial data. It only asks you to select your credit score range. Nothing you enter leaves your browser.',
      },
      {
        question: 'What loan types does the assessment recommend?',
        answer: <>Based on your answers, the assessment rates your likelihood of qualifying for seven financing products: SBA loans, bank term loans, online term loans, <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>, <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link>, invoice factoring, and merchant cash advances. Each product is rated as likely, possible, or unlikely based on the typical requirements for that product type.</>,
        schemaAnswer: 'The assessment rates your likelihood of qualifying for seven financing products: SBA loans, bank term loans, online term loans, lines of credit, equipment financing, invoice factoring, and merchant cash advances. Each is rated as likely, possible, or unlikely based on typical requirements.',
      },
      {
        question: 'What should I do if my readiness score is low?',
        answer: <>A low score means there are areas to improve before applying. The results page shows specific tips for each weak category. Common improvements include building credit history, increasing monthly revenue, reducing existing debt, or gathering better documentation. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to check your debt coverage ratio and our <Link href="/tools/working-capital-calculator" className="text-theme-primary-light font-medium hover:underline">working capital calculator</Link> to evaluate your financial health. Even with a lower score, some financing options (like MCAs or invoice factoring) may still be available.</>,
        schemaAnswer: 'A low score means there are areas to improve before applying. The results page shows specific tips for each weak category. Common improvements include building credit, increasing revenue, reducing debt, or gathering documentation. Some financing options may still be available even with a lower score.',
      },
      {
        question: 'How accurate is the readiness assessment?',
        answer: <>The assessment provides a general indicator of how lenders are likely to view your application. It reflects the same criteria most lenders evaluate, but every lender weighs factors differently. A strong score does not guarantee approval, and a weaker score does not mean you will be denied. The goal is to help you understand where you stand before you apply so you can target the right products and address any weaknesses. For a personalized evaluation, <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">get your options</Link> from a funding specialist who can match you with lenders that fit your profile.</>,
        schemaAnswer: 'The assessment provides a general indicator of how lenders are likely to view your application. It reflects common lender criteria but every lender weighs factors differently. A strong score does not guarantee approval and a weaker score does not mean denial. The goal is to help you understand where you stand before applying.',
      },
    ],
    seo: {
      title: 'Funding Readiness Assessment | Free | Quick Lenders',
      description: 'Find out if your business is ready for financing. Answer 8 questions to get a readiness score, improvement tips, and loan type recommendations. Free, instant results.',
    },
    relatedTools: ['loan-finder-quiz', 'dscr-calculator', 'loan-document-checklist'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'loan-finder-quiz': {
    slug: 'loan-finder-quiz',
    name: 'Loan Finder Quiz',
    category: 'interactive-tools',
    status: 'live',
    icon: Search,
    shortDescription: 'Answer 5 quick questions and get a personalized loan recommendation matched to your business needs.',
    longDescription: 'Not sure which type of business financing fits your situation? Answer a few questions about your funding needs, timeline, and business profile, and this quiz recommends the best loan product for you with rates, terms, and next steps.',
    features: ['Personalized recommendation', '5-question guided flow', 'Rates & terms breakdown', 'Alternative option included', 'Instant results', 'No credit pull'],
    faqs: [
      {
        question: 'How does the Loan Finder Quiz determine my recommendation?',
        answer: <>The quiz uses a weighted scoring system that evaluates your answers across seven loan products. Each answer adjusts the score for every product based on how well it fits your stated needs, timeline, funding amount, business stage, and credit profile. The product with the highest total score becomes your primary recommendation, and the runner-up is shown as an alternative. The algorithm reflects how lenders actually evaluate borrowers, so the results map closely to what you would likely qualify for. Learn more about each product on our <Link href="/business-loans" className="text-theme-primary-light font-medium hover:underline">business loans</Link> page.</>,
        schemaAnswer: 'The quiz uses a weighted scoring system that evaluates your answers across seven loan products. Each answer adjusts the score for every product based on how well it fits your stated needs, timeline, funding amount, business stage, and credit profile. The product with the highest total score becomes your primary recommendation.',
      },
      {
        question: 'Does the quiz pull my credit or require personal information?',
        answer: <>No. The quiz does not ask for your name, email, Social Security number, or any identifying information. It does not pull your credit report or affect your credit score in any way. The questions are about your business situation and funding needs, not your personal details. If you decide to move forward with your recommendation, you can <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">get your options</Link> through our simple form, which also uses a soft credit check with no impact to your score.</>,
        schemaAnswer: 'No. The quiz does not ask for your name, email, or any identifying information. It does not pull your credit report or affect your credit score. The questions are about your business situation and funding needs. If you decide to move forward, the application process also uses a soft credit check with no score impact.',
      },
      {
        question: 'What loan types can the quiz recommend?',
        answer: <>The quiz can recommend any of our seven financing products: <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">Term Loans</Link>, <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">Lines of Credit</Link>, <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment Financing</Link>, <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">Asset-Based Lending</Link>, <Link href="/business-loans/esop" className="text-theme-primary-light font-medium hover:underline">ESOP</Link>, <Link href="/business-loans/investment-banking" className="text-theme-primary-light font-medium hover:underline">Investment Banking</Link>, and <Link href="/business-loans/bonds" className="text-theme-primary-light font-medium hover:underline">Bonds</Link>. Each recommendation includes typical rates, term lengths, and funding ranges so you can compare options before taking the next step.</>,
        schemaAnswer: 'The quiz can recommend any of seven financing products: Term Loans, Lines of Credit, Equipment Financing, Asset-Based Lending, ESOP, Investment Banking, and Bonds. Each recommendation includes typical rates, term lengths, and funding ranges.',
      },
      {
        question: 'Can I retake the quiz with different answers?',
        answer: <>Yes. You can retake the quiz as many times as you want. Use the back button during the quiz to change a previous answer, or click "Retake Quiz" on the results page to start fresh. Many business owners take the quiz multiple times to explore how different funding amounts, timelines, or purposes change the recommendation. Each set of results reflects the specific answers you provide.</>,
        schemaAnswer: 'Yes. You can retake the quiz as many times as you want. Use the back button during the quiz to change a previous answer, or click Retake Quiz on the results page to start fresh. Each set of results reflects the specific answers you provide.',
      },
      {
        question: 'What should I do after I get my quiz result?',
        answer: <>Your result page explains why the recommended product fits your situation, along with typical rates, terms, and funding ranges. From there, you have three options: visit the product page to learn more details, use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to estimate monthly payments, or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">get your options</Link> by filling out a short form. A funding specialist will follow up within 24 hours with real offers matched to your business.</>,
        schemaAnswer: 'Your result page explains why the recommended product fits your situation with typical rates, terms, and funding ranges. You can visit the product page for more details, use the loan payment calculator to estimate payments, or fill out a short form to get personalized offers from a funding specialist.',
      },
    ],
    seo: {
      title: 'Which Business Loan Is Right for You? Free Quiz | Quick Lenders',
      description: 'Answer 5 quick questions to find your ideal business loan. Get a personalized recommendation with rates, terms, and next steps. No credit pull required.',
    },
    relatedTools: ['loan-payment-calculator', 'break-even-calculator', 'factor-rate-to-apr-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'invoice-factoring-calculator': {
    slug: 'invoice-factoring-calculator',
    name: 'Invoice Factoring Calculator',
    category: 'calculators',
    status: 'live',
    icon: Receipt,
    shortDescription: 'Calculate how much cash you will receive from factoring invoices, including advance amount, fees, and effective APR.',
    longDescription: 'See exactly what it costs to factor your invoices. Enter your invoice amount, advance rate, and factoring fee to get a full breakdown of your Day 1 advance, reserve release, total cost, and equivalent APR. Includes a worth-it analysis and comparison to alternative financing.',
    features: ['Day 1 advance amount', 'Reserve release breakdown', 'Effective APR calculation', 'Monthly volume projection', 'Worth-it analysis', 'Alternative financing comparison'],
    faqs: [
      {
        question: 'How does invoice factoring work?',
        answer: <>Invoice factoring is the sale of your unpaid invoices to a factoring company for immediate cash. The factor advances you 80% to 90% of the invoice value upfront (usually within 24 to 48 hours). When your customer pays the invoice, the factor releases the remaining reserve minus their fee. For example, factoring a $100,000 invoice at 85% advance with a 3% fee: you receive $85,000 on Day 1, then $12,000 when the customer pays. Total cost: $3,000. Learn more about receivables-based options on our <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-backed lending</Link> page.</>,
        schemaAnswer: 'Invoice factoring is the sale of unpaid invoices to a factoring company for immediate cash. The factor advances 80-90% upfront, usually within 24-48 hours. When the customer pays, the factor releases the remaining reserve minus their fee.',
      },
      {
        question: 'What is a typical factoring fee?',
        answer: <>Factoring fees typically range from 1% to 5% of the invoice value per 30-day period. The exact rate depends on your industry, invoice volume, customer creditworthiness, and how quickly customers pay. Some factors charge a flat fee regardless of payment timing, while others use tiered rates that increase the longer an invoice stays unpaid. High-volume businesses and those with creditworthy customers (like government contracts) often get lower rates.</>,
        schemaAnswer: 'Factoring fees typically range from 1-5% of invoice value per 30-day period. Rates depend on industry, volume, customer creditworthiness, and payment speed. Some factors charge flat fees while others use tiered rates.',
      },
      {
        question: 'What is the difference between factoring and invoice financing?',
        answer: <>Invoice factoring involves selling your invoices to a third party who collects payment directly from your customers. Your customers know a factor is involved. Invoice financing uses your invoices as collateral for a loan, but you keep control of collections and customer relationships. Factoring is often easier to qualify for since approval is based on your customers&apos; credit, not yours. Financing typically offers lower rates but requires stronger business credit. Both convert receivables into working capital.</>,
        schemaAnswer: 'Invoice factoring involves selling invoices to a third party who collects from customers directly. Invoice financing uses invoices as collateral for a loan while you keep control of collections. Factoring is easier to qualify for since approval is based on customer credit.',
      },
      {
        question: 'Is the effective APR on factoring really that high?',
        answer: <>The annualized rate on factoring often looks high (20% to 60%+) because you are paying 1% to 5% for a short period, typically 30 to 60 days. Annualizing that rate makes it seem expensive. However, factoring is not a loan, so APR is not a perfect comparison. Most businesses use factoring for specific cash flow needs, not as ongoing debt. The real question is whether the cost of waiting for payment is higher than the factoring fee. If you need consistent working capital, a <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> may be more cost-effective long term.</>,
        schemaAnswer: 'The annualized rate on factoring often looks high (20-60%+) because fees of 1-5% are charged over short periods. However, factoring is not a loan. The real question is whether the cost of waiting exceeds the factoring fee. For ongoing needs, a line of credit may be more cost-effective.',
      },
      {
        question: 'Which industries use invoice factoring most?',
        answer: <>Industries with long payment cycles and B2B customers are the biggest users of invoice factoring. Trucking and transportation, staffing and temp agencies, manufacturing, construction, wholesale distribution, and oil and gas services all rely heavily on factoring to bridge the gap between completing work and getting paid. If your customers are creditworthy businesses or government agencies that pay on Net 30 to Net 90 terms, factoring could work well for you. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Check your options</Link> to see what fits.</>,
        schemaAnswer: 'Trucking, staffing, manufacturing, construction, wholesale distribution, and oil and gas are the biggest users of invoice factoring. These industries have long payment cycles and B2B customers, making factoring a practical cash flow solution.',
      },
    ],
    seo: {
      title: 'Invoice Factoring Calculator | See Your Advance & Fees | Quick Lenders',
      description: 'Calculate how much cash you will receive from factoring invoices. See advance amount, fees, reserve release, and effective APR. Free, instant results.',
    },
    relatedTools: ['line-of-credit-interest-calculator', 'loan-affordability-calculator', 'factor-rate-to-apr-calculator'],
    relatedLoanProducts: ['asset-backed-loans', 'lines-of-credit', 'term-loans'],
  },
  'mca-payback-calculator': {
    slug: 'mca-payback-calculator',
    name: 'MCA Payback Calculator',
    category: 'calculators',
    status: 'live',
    icon: CreditCard,
    shortDescription: 'Estimate daily or weekly MCA payments based on your revenue and holdback percentage.',
    longDescription: 'Calculate your merchant cash advance payments, payback timeline, and true cost. Enter your advance amount, factor rate, holdback percentage, and daily revenue to see what you will actually pay and how it compares to a traditional loan.',
    features: ['Daily or weekly payment estimate', 'Holdback cash flow analysis', 'Payback timeline chart', 'Estimated APR equivalent', 'Term loan cost comparison', 'Cost per dollar breakdown'],
    faqs: [
      {
        question: 'How are MCA payments calculated?',
        answer: <>MCA payments are based on the holdback percentage of your daily revenue. If your daily revenue is $5,000 and the holdback is 15%, the provider deducts $750 per day (or $3,750 per week for weekly remittance). These payments continue until the total repayment amount (advance x factor rate) is fully collected. The payback speed depends on your revenue volume. Higher revenue means faster payback. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR converter</Link> to see what the factor rate translates to in annual percentage terms.</>,
        schemaAnswer: 'MCA payments are based on a holdback percentage of daily revenue. If daily revenue is $5,000 and holdback is 15%, the provider deducts $750 per day. Payments continue until the total repayment (advance times factor rate) is fully collected.',
      },
      {
        question: 'What is a factor rate and how does it work?',
        answer: <>A factor rate is a multiplier that determines the total amount you repay. If you receive a $100,000 advance with a 1.30 factor rate, you repay $130,000 total, regardless of how long repayment takes. This is different from interest on a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link>, where paying faster reduces total interest. With an MCA, the total cost is fixed from day one. Factor rates typically range from 1.10 to 1.50, with 1.20 to 1.40 being the most common range.</>,
        schemaAnswer: 'A factor rate is a multiplier determining total repayment. A $100,000 advance at 1.30 means you repay $130,000 total. Unlike loan interest, the total cost is fixed regardless of payback speed. Factor rates typically range from 1.10 to 1.50.',
      },
      {
        question: 'What is a typical holdback percentage?',
        answer: <>Holdback percentages typically range from 10% to 20% of daily revenue. A lower holdback means smaller daily payments but a longer payback period. A higher holdback repays the advance faster but takes more cash out of your daily operations. MCA providers set the holdback based on your revenue, the advance size, and your risk profile. If you have seasonal revenue swings, some providers adjust the holdback or switch to weekly payments. Make sure the holdback still leaves enough cash to cover <Link href="/tools/working-capital-calculator" className="text-theme-primary-light font-medium hover:underline">working capital</Link> needs like payroll and rent.</>,
        schemaAnswer: 'Holdback percentages typically range from 10% to 20% of daily revenue. Lower holdback means smaller payments but longer payback. Higher holdback repays faster but reduces daily cash flow. Providers set holdback based on revenue, advance size, and risk profile.',
      },
      {
        question: 'How does an MCA compare to a business loan?',
        answer: <>MCAs are faster to obtain but significantly more expensive. A typical MCA with a 1.30 factor rate on a 6-month payback has an estimated APR of 60% or higher. A <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> for the same amount might cost 8% to 20% APR. MCAs also take money every day from your revenue, while term loans have fixed monthly payments. If you qualify for a traditional loan or <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link>, you will almost always pay less. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Check your options</Link> to see if lower-cost financing is available.</>,
        schemaAnswer: 'MCAs are faster but significantly more expensive than traditional loans. A typical MCA at 1.30 factor rate on 6-month payback has an estimated APR of 60%+, while term loans cost 8-20% APR. MCAs also debit revenue daily, while term loans have fixed monthly payments.',
      },
      {
        question: 'Can I pay off an MCA early to save money?',
        answer: <>Usually not. Unlike a traditional loan where early payoff reduces total interest, an MCA has a fixed total repayment amount determined by the factor rate. Paying faster does not change the total cost. Some MCA providers offer a small discount for early payoff, but it is not standard. The only way to reduce MCA costs is to negotiate a lower factor rate before signing, or to qualify for alternative financing with lower total costs. Our <Link href="/tools/loan-offer-analyzer" className="text-theme-primary-light font-medium hover:underline">loan offer analyzer</Link> can help you evaluate MCA terms for red flags.</>,
        schemaAnswer: 'Usually not. Unlike loans where early payoff reduces interest, MCA total repayment is fixed by the factor rate. Paying faster does not change total cost. Some providers offer small early payoff discounts, but it is not standard.',
      },
    ],
    seo: {
      title: 'MCA Payback Calculator | Cash Advance | Quick Lenders',
      description: 'Calculate MCA daily payments, payback timeline, and true cost. See holdback impact on cash flow, estimated APR equivalent, and how it compares to a business term loan.',
    },
    relatedTools: ['factor-rate-to-apr-calculator', 'total-cost-of-capital-calculator', 'loan-offer-analyzer'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit'],
  },
  'sba-loan-payment-calculator': {
    slug: 'sba-loan-payment-calculator',
    name: 'SBA Loan Payment Calculator',
    category: 'calculators',
    status: 'live',
    icon: Landmark,
    shortDescription: 'Estimate monthly payments, guarantee fees, and total cost for SBA 7(a) and 504 loans.',
    longDescription: 'Calculate your estimated monthly payment for SBA 7(a) or 504 loans. Includes the SBA upfront guarantee fee, annual servicing fee, down payment, net proceeds, and a side-by-side comparison with conventional loan terms. Select your loan purpose, amount, and rate to see the full cost breakdown.',
    features: ['SBA 7(a) & 504 programs', 'Guarantee fee breakdown', 'Total cost with all fees', 'Down payment calculation', 'SBA vs conventional comparison', 'Qualification overview'],
    faqs: [
      {
        question: 'What is the difference between SBA 7(a) and SBA 504 loans?',
        answer: <>SBA 7(a) is the most flexible program: up to $5 million for almost any business purpose, with terms up to 10 years (25 for real estate). SBA 504 is specifically for fixed assets like commercial real estate or major equipment, with up to $5.5 million and terms of 10 to 25 years. The 504 structure splits the financing: a bank covers about 50%, the SBA-backed CDC covers 40%, and you put 10% down. The 504 often has lower rates on the CDC portion but is less flexible in how the funds can be used.</>,
        schemaAnswer: 'SBA 7(a) loans offer up to $5 million for almost any business purpose with terms up to 10 years (25 for real estate). SBA 504 loans are for fixed assets like real estate or major equipment, up to $5.5 million, with a structure where a bank covers 50%, the SBA-backed CDC covers 40%, and the borrower puts 10% down.',
      },
      {
        question: 'How are SBA guarantee fees calculated?',
        answer: <>SBA guarantee fees are based on the guaranteed portion of the loan, not the full loan amount. For 7(a) loans up to $150,000, the SBA guarantees 85% and the fee is 2.0% of that guaranteed portion. For loans above $150,000, the guarantee drops to 75% and the fee ranges from 3.0% to 3.75% depending on loan size. There is also an annual servicing fee of 0.55% on the outstanding guaranteed balance. These fees are typically financed into the loan or paid at closing. This calculator includes all fees in the total cost.</>,
        schemaAnswer: 'SBA guarantee fees are based on the guaranteed portion of the loan. For 7(a) loans up to $150,000, the SBA guarantees 85% at a 2.0% fee. Above $150,000, the guarantee is 75% with fees from 3.0% to 3.75%. An annual servicing fee of 0.55% also applies.',
      },
      {
        question: 'What credit score do I need for an SBA loan?',
        answer: <>Most SBA lenders look for a personal credit score of 680 or higher, though some will work with scores as low as 650. A score of 720+ puts you in the strongest position for approval and the best rates. Credit score is only one factor. Lenders also evaluate time in business (2+ years preferred), annual revenue, debt service coverage ratio, and collateral. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to check your debt capacity before applying.</>,
        schemaAnswer: 'Most SBA lenders require a personal credit score of 680 or higher, though some accept 650. A score of 720+ provides the best rates. Lenders also evaluate time in business, revenue, DSCR, and collateral.',
      },
      {
        question: 'How long does it take to get an SBA loan?',
        answer: <>SBA loan processing typically takes 30 to 90 days from application to funding. SBA 7(a) loans through preferred lenders can sometimes close in 2 to 3 weeks. SBA 504 loans take longer, often 60 to 90 days, because they involve both a bank and a Certified Development Company (CDC). If you need funds faster, a conventional <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">business term loan</Link> can often fund in 1 to 7 days with slightly higher rates. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to explore your timeline options.</>,
        schemaAnswer: 'SBA loans typically take 30 to 90 days from application to funding. SBA 7(a) through preferred lenders can close in 2-3 weeks. SBA 504 loans take 60-90 days. Conventional business term loans can fund in 1-7 days with higher rates.',
      },
      {
        question: 'Are SBA loan rates lower than conventional business loans?',
        answer: <>Yes, SBA loans generally offer lower rates than conventional business loans because the government guarantee reduces lender risk. SBA 7(a) rates are typically tied to the Prime Rate plus a spread of 2.25% to 2.75%, putting current rates roughly in the 7% to 10% range. SBA 504 CDC debenture rates are often even lower. By comparison, conventional <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> from online lenders typically range from 10% to 25%. The tradeoff is that SBA loans require more documentation and take longer to close. Use this calculator to compare the payment difference.</>,
        schemaAnswer: 'Yes, SBA loans generally offer lower rates. SBA 7(a) rates are typically Prime plus 2.25-2.75%, roughly 7-10%. SBA 504 rates can be even lower. Conventional online lender term loans typically range from 10-25%. The tradeoff is more documentation and longer closing times.',
      },
    ],
    seo: {
      title: 'SBA Loan Payment Calculator | 7(a) & 504 | Quick Lenders',
      description: 'Calculate SBA 7(a) and 504 loan payments, guarantee fees, and total cost. Compare with conventional loans. Free, instant results.',
    },
    relatedTools: ['loan-payment-calculator', 'dscr-calculator', 'business-loan-comparison-tool'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'business-valuation-calculator': {
    slug: 'business-valuation-calculator',
    name: 'Business Valuation Calculator',
    category: 'calculators',
    status: 'live',
    icon: Building2,
    shortDescription: 'Estimate what your business is worth using revenue multiples, SDE, EBITDA, and asset-based methods.',
    longDescription: 'Enter your revenue, profitability, and assets to see your estimated business value across four valuation methods. Includes industry-specific multiples for 12 industries, adjustment factors for business age, growth, owner dependency, and customer concentration, plus a side-by-side comparison of all methods with the most relevant one highlighted.',
    features: ['4 valuation methods', 'Industry-specific multiples', 'SDE & EBITDA calculations', 'Value factor adjustments', 'Method comparison table', 'Actionable value tips'],
    faqs: [
      {
        question: 'What is the most accurate way to value a small business?',
        answer: <>For most small businesses under $5 million in value, the SDE (Seller&apos;s Discretionary Earnings) multiple is the standard method. SDE represents the total financial benefit to an owner-operator: net profit plus the owner&apos;s salary, benefits, and personal expenses run through the business. Buyers use SDE to understand what they would actually earn running the company. For larger businesses with professional management, the EBITDA multiple is more common because it separates operational performance from owner compensation. This calculator shows both methods along with revenue multiples and asset-based valuation so you can compare. A certified business appraiser is recommended for major transactions like selling to outside buyers or setting up an <Link href="/business-loans/esop" className="text-theme-primary-light font-medium hover:underline">ESOP</Link>.</>,
        schemaAnswer: 'For most small businesses under $5M, the SDE (Seller\'s Discretionary Earnings) multiple is the standard method. SDE is net profit plus owner salary, benefits, and personal expenses. For larger businesses, EBITDA multiples are more common.',
      },
      {
        question: 'What are typical valuation multiples by industry?',
        answer: <>Multiples vary significantly by industry. Technology and SaaS businesses typically command 3x to 6x SDE or 8x to 15x EBITDA because of recurring revenue and scalability. Professional services firms range from 2x to 3x SDE. Restaurants and retail are lower at 1.5x to 2.5x SDE because of higher risk and owner dependency. Manufacturing falls in the 2x to 4x SDE range. These are broad ranges, and your specific multiple depends on factors like growth rate, customer concentration, owner involvement, and recurring revenue. This calculator uses industry benchmarks and adjusts the multiple based on your business characteristics.</>,
        schemaAnswer: 'Multiples vary by industry. Technology businesses typically command 3-6x SDE or 8-15x EBITDA. Professional services: 2-3x SDE. Restaurants and retail: 1.5-2.5x SDE. Manufacturing: 2-4x SDE. Specific multiples depend on growth, customer concentration, and other factors.',
      },
      {
        question: 'What is the difference between SDE and EBITDA?',
        answer: <>SDE (Seller&apos;s Discretionary Earnings) includes the owner&apos;s salary and personal benefits on top of net profit. It answers: "What would I earn as the owner-operator?" EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) does not include owner compensation. It answers: "How profitable is this business operationally?" SDE is used for businesses where the owner actively works in the company. EBITDA is used for businesses with professional management where an owner&apos;s salary would be replaced by a market-rate manager salary. If you are a hands-on owner, SDE is your primary metric. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to evaluate whether you can service acquisition debt.</>,
        schemaAnswer: 'SDE includes the owner\'s salary and benefits on top of net profit, representing total owner benefit. EBITDA does not include owner compensation and measures operational profitability. SDE is used for owner-operated businesses; EBITDA for businesses with professional management.',
      },
      {
        question: 'How do I increase my business value before selling?',
        answer: <>The most impactful changes are reducing owner dependency (document processes, train managers), diversifying your customer base (no single customer should be more than 15% to 20% of revenue), securing recurring revenue through contracts or subscriptions, and cleaning up your financials by removing personal expenses. Growth rate also matters: a business growing 20% per year commands a higher multiple than one that is flat. Most of these changes take 1 to 3 years to show results, so start early. The investment often pays for itself many times over in a higher sale price. <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">Term loan financing</Link> can fund growth initiatives that increase your valuation before a sale.</>,
        schemaAnswer: 'Reduce owner dependency, diversify your customer base, secure recurring revenue through contracts, clean up financials, and grow revenue. Most changes take 1-3 years to show results. Start early for maximum impact on sale price.',
      },
      {
        question: 'Can I use this calculator for buying a business?',
        answer: <>Yes. Enter the target business&apos;s financials to see a fair value range across multiple methods. The valuation gives you a starting point for negotiations and helps you determine how much acquisition financing you will need. Most business acquisitions use a combination of an SBA 7(a) loan (up to $5 million), seller financing (where the seller carries 10% to 30% of the price), and a buyer down payment (typically 10% to 20%). Use our <Link href="/tools/sba-loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">SBA loan calculator</Link> to estimate monthly payments on the acquisition loan, then check your <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR</Link> to make sure the business cash flow covers the debt.</>,
        schemaAnswer: 'Yes. Enter the target business financials to see a fair value range. Most acquisitions use SBA 7(a) loans (up to $5M), seller financing (10-30% of price), and buyer down payment (10-20%). Use the SBA loan calculator to estimate acquisition payments.',
      },
    ],
    seo: {
      title: 'Business Valuation Calculator | 4 Methods | Quick Lenders',
      description: 'Estimate your business value using SDE, EBITDA, revenue multiples, and asset-based methods. Industry-specific multiples for 12 industries. Free calculator.',
    },
    relatedTools: ['dscr-calculator', 'sba-loan-payment-calculator', 'roi-calculator'],
    relatedLoanProducts: ['esop', 'term-loans', 'investment-banking'],
  },
  'working-capital-calculator': {
    slug: 'working-capital-calculator',
    name: 'Working Capital Calculator',
    category: 'calculators',
    status: 'live',
    icon: Wallet,
    shortDescription: 'Calculate your working capital ratio, cash runway, and how much additional capital your business needs.',
    longDescription: 'Enter your current assets and liabilities to see your working capital position, ratio health, and cash runway. Includes a cash conversion cycle analysis, recommended financing amount at three tiers, and a dynamic product recommendation based on your numbers.',
    features: ['Working capital ratio', 'Cash runway analysis', 'Cash conversion cycle', 'Financing recommendation', 'Ratio health indicator', 'Assets vs liabilities breakdown'],
    faqs: [
      {
        question: 'What is working capital and why does it matter?',
        answer: <>Working capital is the difference between your current assets (cash, receivables, inventory) and current liabilities (payables, short-term debt, accrued expenses). Positive working capital means you can pay suppliers, cover payroll, and handle unexpected costs. Negative working capital means your short-term debts exceed your liquid assets, which puts your business at risk. Most lenders evaluate working capital as part of the approval process for <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link> and <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link>.</>,
        schemaAnswer: 'Working capital is the difference between current assets (cash, receivables, inventory) and current liabilities (payables, short-term debt). Positive working capital means you can cover short-term obligations. Negative working capital means debts exceed liquid assets, putting the business at risk.',
      },
      {
        question: 'What is a healthy working capital ratio?',
        answer: <>A working capital ratio of 1.5 to 2.0 is generally considered healthy for most industries. Below 1.0 means your liabilities exceed your assets, which is a red flag. Between 1.0 and 1.2 is tight but functional. Above 2.0 is strong, though it may indicate excess capital that could be put to productive use. The right ratio depends on your industry: manufacturing and construction businesses typically need higher ratios (1.5 to 2.5) because of longer cash cycles, while service businesses can operate well at 1.2 to 1.5. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to evaluate your debt capacity alongside working capital.</>,
        schemaAnswer: 'A working capital ratio of 1.5 to 2.0 is generally healthy. Below 1.0 means liabilities exceed assets. Between 1.0 and 1.2 is tight. Above 2.0 is strong but may indicate underutilized capital. The right ratio varies by industry.',
      },
      {
        question: 'What is the cash conversion cycle?',
        answer: <>The cash conversion cycle (CCC) measures how many days it takes your business to turn inventory and receivables into cash after paying suppliers. The formula is: Days Inventory Outstanding + Days Sales Outstanding - Days Payable Outstanding. A shorter cycle means cash flows back faster. A longer cycle means you need more working capital to bridge the gap. If your CCC is 60 days, you need roughly 2 months of operating expenses in working capital. Speeding up collections or negotiating longer payment terms with suppliers can shorten your cycle.</>,
        schemaAnswer: 'The cash conversion cycle measures how many days it takes to turn inventory and receivables into cash after paying suppliers. Formula: Days Inventory Outstanding + Days Sales Outstanding - Days Payable Outstanding. A shorter cycle means faster cash flow and less working capital needed.',
      },
      {
        question: 'How much working capital financing should I get?',
        answer: <>A common guideline is to maintain at least 3 months of operating expenses in accessible working capital. If your monthly expenses are $30,000, that means $90,000 minimum. Add a 20% buffer for unexpected costs and you get roughly $108,000. For seasonal businesses or those in growth mode, 6 months of expenses is safer. This calculator provides three recommendations: minimum (3-month runway), comfortable (with buffer), and growth (6-month runway). A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> is usually the best fit because you only pay interest on what you draw.</>,
        schemaAnswer: 'Maintain at least 3 months of operating expenses in working capital. Add a 20% buffer for unexpected costs. Seasonal or growing businesses should target 6 months. A business line of credit is usually the best fit because you only pay interest on what you draw.',
      },
      {
        question: 'What financing options are best for working capital?',
        answer: <>A <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business line of credit</Link> is the most common choice for working capital because you can draw and repay as needed, paying interest only on what you use. For one-time needs with a clear payback plan, a short-term <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> works well. If slow-paying customers are the problem, <Link href="/tools/invoice-factoring-calculator" className="text-theme-primary-light font-medium hover:underline">invoice factoring</Link> converts receivables into immediate cash. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to find the right option for your situation.</>,
        schemaAnswer: 'A business line of credit is the most common choice because you draw and repay as needed. For one-time needs, a short-term term loan works. If slow-paying customers are the issue, invoice factoring converts receivables into immediate cash.',
      },
    ],
    seo: {
      title: 'Working Capital Calculator | How Much Do You Need? | Quick Lenders',
      description: 'Calculate your working capital ratio, cash runway, and financing needs. See your position and get a recommendation. Free, instant results.',
    },
    relatedTools: ['dscr-calculator', 'line-of-credit-interest-calculator', 'invoice-factoring-calculator'],
    relatedLoanProducts: ['lines-of-credit', 'term-loans', 'asset-backed-loans'],
  },
  'loan-affordability-calculator': {
    slug: 'loan-affordability-calculator',
    name: 'Loan Affordability Calculator',
    category: 'calculators',
    status: 'live',
    icon: Banknote,
    shortDescription: 'Find out the maximum loan amount your business can borrow based on what you can comfortably pay each month.',
    longDescription: 'This calculator works backward from your monthly payment budget to show your maximum borrowing power. Enter what you can afford to pay, your expected rate, and desired term to see how much you could borrow. Includes term and rate comparisons plus an optional cash flow check.',
    features: ['Max loan amount', 'Term comparison table', 'Rate impact analysis', 'Cash flow check', 'Total cost breakdown', 'Dynamic product match'],
    faqs: [
      {
        question: 'How is the maximum loan amount calculated?',
        answer: <>The calculator uses a reverse amortization formula. Instead of calculating the payment from a loan amount, it works backward: given your monthly payment budget, interest rate, and loan term, it solves for the largest principal amount that would produce that payment. The formula is P = M x [(1+r)^n - 1] / [r(1+r)^n], where M is your monthly payment, r is the monthly rate, and n is total payments. Our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> does the opposite: enter an amount and see the payment.</>,
        schemaAnswer: 'The calculator uses reverse amortization. Given your monthly payment budget, interest rate, and loan term, it solves for the largest principal that would produce that payment. The formula is P = M x [(1+r)^n - 1] / [r(1+r)^n].',
      },
      {
        question: 'What percentage of revenue should go toward loan payments?',
        answer: <>A common guideline is to keep loan payments under 10% to 15% of monthly revenue. This leaves room for operating expenses, unexpected costs, and profit. A business with $30,000 per month in revenue might comfortably afford $3,000 to $4,500 per month in loan payments. This is not a hard rule. Businesses with high margins may handle more, while seasonal businesses may need a lower ratio. Our calculator includes an optional cash flow check if you enter your monthly revenue.</>,
        schemaAnswer: 'A common guideline is keeping loan payments under 10-15% of monthly revenue. This leaves room for operating expenses, unexpected costs, and profit. The ratio varies by business type, margins, and seasonality.',
      },
      {
        question: 'How does the interest rate affect how much I can borrow?',
        answer: <>Lower rates significantly increase borrowing power at the same monthly payment. For example, at $5,000 per month over 3 years, a 10% rate lets you borrow roughly $156,000, while 20% limits you to about $136,500. That is a $19,500 difference from rate alone. This is why improving your credit score before applying can expand your options. Better credit typically qualifies you for lower rates on <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>.</>,
        schemaAnswer: 'Lower rates significantly increase borrowing power. At $5,000/month over 3 years, 10% lets you borrow roughly $156,000 while 20% limits you to about $136,500. Better credit qualifies you for lower rates, expanding your options.',
      },
      {
        question: 'How does loan term affect my borrowing capacity?',
        answer: <>Longer terms increase your maximum loan amount because the same monthly payment is spread over more months. However, you pay more total interest. For instance, a $3,000 monthly payment at 12% could support about $60,000 over 2 years or about $125,000 over 5 years. The tradeoff: the 5-year loan costs significantly more in interest. Use the term comparison in our calculator to see the exact numbers for your situation.</>,
        schemaAnswer: 'Longer terms increase maximum loan amount because payments are spread over more months. However, total interest paid is higher. A $3,000 monthly payment at 12% supports about $60,000 over 2 years or $125,000 over 5 years, but the longer term costs more in interest.',
      },
      {
        question: 'What should I do if I need more than I can afford?',
        answer: <>If the calculator shows a smaller amount than you need, you have several options. Extend the term to increase capacity, though you will pay more interest. Work on improving your credit to qualify for a lower rate, which increases borrowing power. Phase your financing by borrowing what you can now and adding more later. Or explore <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link> (where the asset serves as collateral) or <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based lending</Link> for larger amounts. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to explore all your options.</>,
        schemaAnswer: 'Options include extending the term, improving credit for better rates, phasing financing over time, or exploring equipment financing or asset-based lending. A funding specialist can help identify the best approach for your situation.',
      },
    ],
    seo: {
      title: 'Business Loan Affordability Calculator | Quick Lenders',
      description: 'Find out the maximum business loan you can afford based on your monthly budget. Compare terms and rates. Free, no signup required.',
    },
    relatedTools: ['loan-payment-calculator', 'dscr-calculator', 'loan-finder-quiz'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'line-of-credit-interest-calculator': {
    slug: 'line-of-credit-interest-calculator',
    name: 'Line of Credit Interest Calculator',
    category: 'calculators',
    status: 'live',
    icon: CreditCard,
    shortDescription: 'Calculate the true cost of drawing from a business line of credit, including interest, fees, and effective APR.',
    longDescription: 'See exactly what a draw from your business line of credit will cost. Enter your credit limit, draw amount, rate, and repayment type to get a full cost breakdown. Compare interest-only versus principal-plus-interest repayment, and see how your draw stacks up against an equivalent term loan.',
    features: ['Monthly interest cost', 'Total cost with fees', 'Interest-only vs P+I comparison', 'Term loan cost comparison', 'Available credit tracker', 'Month-by-month schedule'],
    faqs: [
      {
        question: 'How is interest calculated on a business line of credit?',
        answer: <>Most business lines of credit charge interest only on the amount you draw, not the full credit limit. If you have a $200,000 line and draw $50,000, you pay interest on $50,000. Interest is typically calculated on the outstanding balance, which decreases as you make principal payments. This makes a LOC more flexible and often cheaper than a <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> if you only need part of the funds.</>,
        schemaAnswer: 'Most business lines of credit charge interest only on the amount you draw, not the full credit limit. If you have a $200,000 line and draw $50,000, you pay interest on $50,000. Interest is calculated on the outstanding balance, which decreases as you make principal payments.',
      },
      {
        question: 'What is the difference between interest-only and principal-plus-interest payments?',
        answer: <>With interest-only payments, you pay just the interest each month and repay the full principal at the end of the draw period (or whenever you choose). Monthly payments are lower, but you owe the entire draw amount at maturity. With principal-plus-interest, each payment includes a portion of principal, so your balance decreases over time and the draw is fully repaid by the end of the term. P+I costs less in total interest but requires higher monthly payments.</>,
        schemaAnswer: 'Interest-only payments cover just interest each month, with the full principal due at the end. Monthly costs are lower but total interest is higher. Principal-plus-interest payments reduce the balance over time, costing less in total interest but requiring higher monthly payments.',
      },
      {
        question: 'What are typical draw fees on a line of credit?',
        answer: <>Some lenders charge a draw fee each time you access funds, typically 0.5% to 2% of the draw amount. Not all lines of credit have draw fees. Some charge maintenance fees, annual fees, or inactivity fees instead. Draw fees add to your total cost and increase the effective APR, especially on short-term draws. Ask your lender about all fees before signing. See our <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link> page for more on typical terms.</>,
        schemaAnswer: 'Some lenders charge a draw fee of 0.5-2% each time you access funds. Not all lines of credit have draw fees. Some charge maintenance, annual, or inactivity fees instead. Draw fees increase the effective APR, especially on short-term draws.',
      },
      {
        question: 'How does a line of credit compare to a term loan?',
        answer: <>A line of credit gives you flexible, revolving access to funds. You draw what you need and pay interest only on what you use. A term loan gives you a lump sum with fixed payments over a set schedule. LOCs are better for ongoing cash flow needs, seasonal gaps, or unpredictable expenses. Term loans work better for one-time investments with a known cost. Use the comparison feature in this calculator to see the cost difference, or try our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> for full term loan analysis.</>,
        schemaAnswer: 'A line of credit provides flexible, revolving access to funds where you pay interest only on what you draw. A term loan gives a lump sum with fixed payments. LOCs suit ongoing cash flow needs while term loans work better for one-time investments.',
      },
      {
        question: 'What credit limit can my business qualify for?',
        answer: <>Business line of credit limits typically range from $30,000 to $10 million, depending on revenue, credit history, time in business, and the lender. Online lenders often approve $30,000 to $500,000 based primarily on revenue, while banks and SBA lenders may go higher with stricter requirements. Revenue-based lenders may offer 10% to 30% of annual revenue as a credit limit. Use our <Link href="/tools/loan-finder-quiz" className="text-theme-primary-light font-medium hover:underline">loan finder quiz</Link> to see what products fit your profile, or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">check your options</Link> with no credit impact.</>,
        schemaAnswer: 'Business LOC limits typically range from $30,000 to $10 million, depending on revenue, credit, time in business, and lender type. Online lenders often approve $30,000 to $500,000 based on revenue. Banks and SBA lenders may go higher with stricter requirements.',
      },
    ],
    seo: {
      title: 'Business Line of Credit Cost Calculator | Quick Lenders',
      description: 'Calculate the true cost of drawing from your business line of credit. Compare interest-only vs P+I, see fees, and compare to term loans. Free.',
    },
    relatedTools: ['loan-payment-calculator', 'loan-affordability-calculator', 'dscr-calculator'],
    relatedLoanProducts: ['lines-of-credit', 'term-loans', 'asset-backed-loans'],
  },
  'startup-cost-calculator': {
    slug: 'startup-cost-calculator',
    name: 'Startup Cost Calculator',
    category: 'calculators',
    status: 'live',
    icon: Target,
    shortDescription: 'Estimate total startup costs across 8 expense categories with industry templates and a funding plan.',
    longDescription: 'Walk through 8 common expense categories to build a complete startup cost estimate. Choose an industry template for realistic defaults, see a breakdown by category, compare lean vs comfortable scenarios, and calculate how much financing you need after personal savings.',
    features: ['8 expense categories', 'Industry templates', 'Category breakdown chart', 'Funding plan calculator', 'Lean vs comfortable scenarios', 'Recommended buffer'],
    faqs: [
      {
        question: 'What costs should I include in my startup budget?',
        answer: <>Startup costs fall into two groups: one-time expenses you pay before opening and initial operating expenses you need to cover until revenue kicks in. Common categories include legal and administrative (registration, licenses, legal fees), location and facilities (lease deposit, renovations, furniture), equipment and technology (computers, software, industry-specific tools), initial inventory, marketing and branding (website, logo, launch campaign), staffing (first 3 months of payroll), insurance, and a working capital reserve to cover 3 to 6 months of operating expenses. This calculator walks you through all 8 categories so you do not miss anything. Use our <Link href="/tools/working-capital-calculator" className="text-theme-primary-light font-medium hover:underline">working capital calculator</Link> for a deeper analysis of your ongoing cash needs.</>,
        schemaAnswer: 'Startup costs include legal fees, location expenses, equipment, inventory, marketing, staffing, insurance, and working capital reserves. This calculator covers 8 categories to ensure nothing is missed.',
      },
      {
        question: 'How much does it cost to start a business?',
        answer: <>Costs vary widely by business type. A home-based business might cost $2,000 to $10,000. An online or e-commerce business typically runs $5,000 to $25,000. Professional services firms usually need $10,000 to $50,000. Retail stores range from $50,000 to $150,000. Restaurants can cost $100,000 to $500,000 or more. The biggest variables are location costs (lease, renovations), equipment needs, and initial inventory. Use the industry templates in this calculator for realistic starting estimates, then adjust based on your specific plans.</>,
        schemaAnswer: 'Costs vary by business type: home-based ($2,000-$10,000), e-commerce ($5,000-$25,000), professional services ($10,000-$50,000), retail ($50,000-$150,000), restaurant ($100,000-$500,000+). Location, equipment, and inventory are the biggest variables.',
      },
      {
        question: 'How much of my startup costs should I finance?',
        answer: <>Lenders typically want to see you invest 10% to 30% of the total startup cost from personal savings or equity. The rest can come from financing. SBA loans are common for startups because they offer longer terms and lower rates, but require strong personal credit (680+), a solid business plan, and usually some collateral. A <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loan</Link> can fund a specific purchase like equipment, while a <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">line of credit</Link> covers ongoing working capital needs. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> to explore what you qualify for.</>,
        schemaAnswer: 'Lenders typically want 10-30% from personal savings. The rest can come from SBA loans, term loans, or lines of credit. SBA loans require 680+ credit, a business plan, and usually collateral.',
      },
      {
        question: 'What is a working capital reserve and why do I need one?',
        answer: <>A working capital reserve is cash set aside to cover operating expenses until your business generates enough revenue to be self-sustaining. Most new businesses do not turn a profit immediately, so you need enough cash to pay rent, payroll, utilities, and other bills during the ramp-up period. Financial advisors typically recommend 3 to 6 months of operating expenses as a minimum reserve. Running out of cash is the number one reason startups fail, so building this cushion into your startup budget is critical. The "comfortable launch" scenario in this calculator automatically increases your reserve.</>,
        schemaAnswer: 'A working capital reserve is cash to cover operating expenses until the business generates enough revenue. Most advisors recommend 3-6 months of expenses. Running out of cash is the top reason startups fail.',
      },
      {
        question: 'Should I add a buffer to my startup cost estimate?',
        answer: <>Yes. Experienced entrepreneurs recommend adding 10% to 20% on top of your estimate for unexpected costs. Something always comes up: permits take longer, equipment costs more than quoted, or you need to hire sooner than planned. This calculator shows your base estimate plus a recommended total with a 20% buffer. The "comfortable launch" scenario builds in both a larger working capital reserve and the 20% contingency. It is better to secure slightly more financing upfront than to run short 3 months in.</>,
        schemaAnswer: 'Yes, add 10-20% for unexpected costs. Permits, equipment, and hiring often cost more than planned. This calculator shows your estimate plus a 20% buffer recommendation. It is better to over-prepare than run short.',
      },
    ],
    seo: {
      title: 'Startup Cost Calculator | Estimate Your Business Costs | Quick Lenders',
      description: 'Estimate startup costs across 8 expense categories. Use industry templates, build a funding plan, and see how much financing you need. Free, instant results.',
    },
    relatedTools: ['roi-calculator', 'loan-payment-calculator', 'sba-loan-payment-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'loan-offer-analyzer': {
    slug: 'loan-offer-analyzer',
    name: 'Loan Offer Analyzer',
    category: 'interactive-tools',
    status: 'live',
    icon: Shield,
    shortDescription: 'Check your loan offer for predatory terms, hidden fees, and red flags before you sign.',
    longDescription: 'Enter the key terms from a business loan or MCA offer and get an instant risk assessment. This tool checks for confession of judgment clauses, disguised factor rates, daily payment traps, excessive fees, and other predatory practices. You get a color-coded report card, detailed findings for each issue, true cost calculations, and a comparison to fair market rates.',
    features: ['Red flag detection', 'Effective APR calculation', 'True cost breakdown', 'Market rate comparison', 'Detailed findings cards', 'Risk-based recommendations'],
    faqs: [
      {
        question: 'How do I know if my business loan offer is predatory?',
        answer: <>Look for these warning signs: costs expressed as a "factor rate" instead of APR, daily payment withdrawals from your bank account, a confession of judgment clause that waives your legal rights, terms shorter than 6 months, pressure to sign immediately, blanket liens on all business assets, and no clear disclosure of total cost. Any single one of these is a concern. Multiple flags together suggest a predatory offer. This tool checks for all of them and explains why each matters. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR calculator</Link> to see the true annual cost of any factor-rate offer.</>,
        schemaAnswer: 'Warning signs include factor rates instead of APR, daily payments, confession of judgment clauses, terms shorter than 6 months, high-pressure sales tactics, blanket liens, and no clear cost disclosure. Multiple flags together suggest a predatory offer.',
      },
      {
        question: 'What is a confession of judgment and why is it dangerous?',
        answer: <>A confession of judgment (also called a "cognovit note") is a clause where you agree in advance to let the lender win any lawsuit against you without going to court. If you miss a payment, the lender can immediately seize your bank accounts and business assets without notifying you and without you having a chance to respond. These clauses are banned in many states including California, New York, and New Jersey. Even if legal in your state, it is a major red flag. No legitimate lender needs this protection. Walk away from any offer that includes one.</>,
        schemaAnswer: 'A confession of judgment lets the lender win any lawsuit without going to court. They can seize bank accounts and assets without notice if you miss a payment. Banned in many states including CA, NY, and NJ. No legitimate lender needs this clause.',
      },
      {
        question: 'What is the difference between a factor rate and APR?',
        answer: <>A factor rate (like 1.35) is a simple multiplier: borrow $50,000 and repay $67,500. It looks low, but the true annual cost depends on the term. A 1.35 factor on a 6-month advance works out to roughly 70% to 85% APR. Merchant cash advances use factor rates because they make costs seem lower than APR would. APR accounts for the time value of money and payment frequency, giving you the real annualized cost. Always convert factor rates to APR before comparing offers. Our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate converter</Link> does this calculation instantly.</>,
        schemaAnswer: 'A factor rate (like 1.35) is a simple multiplier on the borrowed amount. A 1.35 factor on a 6-month advance equals roughly 70-85% APR. MCAs use factor rates because they seem lower than APR. Always convert to APR for accurate comparison.',
      },
      {
        question: 'Are daily payment business loans bad?',
        answer: <>Daily payments are not automatically bad, but they create two problems. First, they strain cash flow because money leaves your account every business day before you collect from customers. Second, daily payment structures are common with merchant cash advances that carry very high effective APRs. Monthly payments are standard for <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> and <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">lines of credit</Link>. If an offer requires daily payments, make sure you understand the effective APR and total cost before signing. Use our <Link href="/tools/cash-flow-forecast-tool" className="text-theme-primary-light font-medium hover:underline">cash flow forecast tool</Link> to see how daily withdrawals would affect your cash position.</>,
        schemaAnswer: 'Daily payments strain cash flow because money leaves your account every business day. They are common with high-APR merchant cash advances. Monthly payments are standard for term loans and lines of credit. If daily payments are required, understand the effective APR first.',
      },
      {
        question: 'What should I do if I already signed a bad loan?',
        answer: <>First, review the agreement for illegal clauses. Confession of judgment is banned in many states, so that clause may be unenforceable. Calculate the true APR because you may have grounds for a regulatory complaint if costs were misrepresented. Look into refinancing to a better loan with lower rates and monthly payments. If you find illegal terms, consult a business attorney. You can also report predatory lenders to your state attorney general. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> about refinancing options that could lower your cost and switch you to monthly payments.</>,
        schemaAnswer: 'Review for illegal clauses (confession of judgment is banned in many states). Calculate the true APR for potential complaints. Look into refinancing to a better loan. Consult a business attorney if you find illegal terms. Report predatory lenders to your state attorney general.',
      },
    ],
    seo: {
      title: 'Loan Offer Analyzer | Spot Red Flags Before You Sign | Quick Lenders',
      description: 'Check your business loan or MCA offer for predatory terms, hidden fees, and red flags. Free analysis with true cost calculations and market rate comparisons.',
    },
    relatedTools: ['factor-rate-to-apr-calculator', 'business-loan-comparison-tool', 'loan-finder-quiz'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit'],
  },
  'loan-rejection-decoder': {
    slug: 'loan-rejection-decoder',
    name: 'Loan Rejection Decoder',
    category: 'interactive-tools',
    status: 'live',
    icon: Search,
    shortDescription: 'Find out why your business loan was denied and get a plan to fix it.',
    longDescription: 'Select your rejection reason and enter your business profile to get a personalized improvement roadmap. See exactly what to fix, how long it takes, what alternatives are available right now, and a timeline to requalification. Covers credit score, time in business, revenue, cash flow, debt load, industry restrictions, and more.',
    features: ['Rejection analysis', 'Improvement roadmap', 'Alternative financing match', 'Requalification timeline', 'Credit score guidance', 'Lender requirement benchmarks'],
    faqs: [
      {
        question: 'Why was my business loan denied?',
        answer: <>The most common reasons are credit score below the lender&apos;s minimum, not enough time in business, revenue too low, insufficient cash flow to cover payments, too much existing debt, or industry restrictions. Many lenders do not explain their reasons clearly, which is why this tool exists. Enter what you know about the rejection and your business profile, and we will decode what likely happened and what you can do about it. Use our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> to check whether your cash flow meets lender requirements.</>,
        schemaAnswer: 'Common reasons include credit score below minimums, insufficient time in business, low revenue, inadequate cash flow or DSCR, too much existing debt, and industry restrictions. Many lenders do not clearly explain rejections.',
      },
      {
        question: 'How long does it take to fix a loan rejection?',
        answer: <>It depends on the reason. Credit score improvements typically take 3 to 6 months with focused effort (paying down balances, disputing errors, consistent on-time payments). Time in business is fixed: you simply need to wait until you meet the minimum. Revenue and cash flow can improve in 3 to 12 months depending on your business trajectory. Some issues like industry restrictions cannot be "fixed" but alternative lenders may serve your industry. This tool gives specific timelines for each issue based on your profile.</>,
        schemaAnswer: 'It depends on the reason. Credit score improvements take 3-6 months. Time in business requires waiting. Revenue and cash flow can improve in 3-12 months. Some issues like industry restrictions require finding alternative lenders instead.',
      },
      {
        question: 'Can I get a business loan after being denied?',
        answer: <>Yes. A rejection from one lender does not mean every lender will say no. Different lenders have different requirements. An SBA loan requires a 650+ credit score and 2+ years in business, but online lenders may approve with 550+ credit and 6 months in business. <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> uses the equipment as collateral, making credit less important. Invoice factoring depends on your customers&apos; credit, not yours. This tool matches your profile to financing types you may qualify for right now.</>,
        schemaAnswer: 'Yes. Different lenders have different requirements. SBA loans need 650+ credit and 2+ years, but online lenders may approve with 550+ and 6 months. Equipment financing and invoice factoring have different qualification criteria.',
      },
      {
        question: 'Does a loan denial hurt my credit score?',
        answer: <>The denial itself does not affect your credit score, but the hard inquiry from the application can lower your score by 5 to 10 points. Multiple applications in a short period can compound this effect. If you were denied, avoid applying to several more lenders immediately. Instead, use this tool to understand what to fix, improve your profile, and then apply strategically. When you are ready, <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> who can match you with lenders likely to approve, reducing unnecessary inquiries.</>,
        schemaAnswer: 'The denial itself does not affect your score, but the hard inquiry from the application can lower it by 5-10 points. Multiple applications compound this. Fix your profile first, then apply strategically to lenders likely to approve.',
      },
      {
        question: 'What is the easiest business loan to get approved for?',
        answer: <>Revenue-based financing and merchant cash advances have the lowest barriers: often just 3 to 6 months in business and $5,000+ monthly revenue, with minimal credit requirements. However, they are also the most expensive (effective APRs of 40% to 100%+). For better rates, online <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">term loans</Link> require 6 to 12 months in business and 550+ credit. <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">Equipment financing</Link> is easier to qualify for because the equipment serves as collateral. Business credit cards are another accessible option for building credit history. Use our <Link href="/tools/loan-offer-analyzer" className="text-theme-primary-light font-medium hover:underline">loan offer analyzer</Link> to check any offer for red flags before signing.</>,
        schemaAnswer: 'Revenue-based financing and MCAs have the lowest barriers (3-6 months in business, $5k+ monthly revenue) but the highest costs. Online term loans need 6-12 months and 550+ credit. Equipment financing is easier because the equipment is collateral.',
      },
    ],
    seo: {
      title: 'Loan Rejection Decoder | Fix It & Get Approved | Quick Lenders',
      description: 'Denied for a business loan? Find out why, get a step-by-step improvement plan, see alternative financing available now, and learn when you can reapply.',
    },
    relatedTools: ['dscr-calculator', 'loan-finder-quiz', 'loan-offer-analyzer'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'loan-document-checklist': {
    slug: 'loan-document-checklist',
    name: 'Loan Document Checklist',
    category: 'content-assets',
    status: 'live',
    icon: FileText,
    shortDescription: 'Get a personalized checklist of documents you need to prepare for your loan application.',
    longDescription: 'Select your loan type and get a customized list of required and recommended documents, organized by category with progress tracking so you know exactly what to gather before applying.',
    features: ['Loan-type-specific checklist', 'Required vs recommended labels', 'Progress tracking bar', 'Organized by document category', 'Document descriptions and tips', '7 loan types covered'],
    faqs: [
      {
        question: 'What documents do I need for a business loan application?',
        answer: <>Most lenders require business bank statements (at least 3 months), a government-issued ID, proof of business registration, and tax returns. Beyond that, requirements vary by loan type. <Link href="/business-loans/term-loans" className="text-theme-primary-light font-medium hover:underline">Term loans</Link> and SBA loans typically need the most documentation (financial statements, business plan, personal financial statement), while MCAs and online lenders need the least. Select your loan type in the checklist above to see exactly what you need.</>,
        schemaAnswer: 'Most lenders require business bank statements (at least 3 months), government-issued ID, proof of business registration, and tax returns. Requirements vary by loan type. Term loans and SBA loans need the most documentation while MCAs and online lenders need the least.',
      },
      {
        question: 'How many months of bank statements do lenders need?',
        answer: <>Most lenders want 3 to 6 months of business bank statements. Some SBA lenders and banks ask for 12 months. Download statements directly from your bank portal as PDFs rather than screenshots. Lenders look at average daily balance, monthly deposits, overdrafts, and cash flow consistency. If your statements show irregular deposits or frequent low balances, be prepared to explain those patterns.</>,
        schemaAnswer: 'Most lenders want 3 to 6 months of business bank statements. Some SBA lenders and banks ask for 12 months. Download statements directly from your bank portal as PDFs. Lenders look at average daily balance, monthly deposits, overdrafts, and cash flow consistency.',
      },
      {
        question: 'Do I need a business plan for a loan application?',
        answer: <>It depends on the loan type and how long you have been in business. SBA loans for newer businesses (under 2 years) typically require a business plan. Most bank term loans do not require one if you have 2+ years of operating history and strong financials. Online lenders and MCAs rarely ask for a business plan. Even when not required, having one can strengthen your application, especially for larger loan amounts.</>,
        schemaAnswer: 'It depends on the loan type and business age. SBA loans for newer businesses typically require a business plan. Most bank term loans do not if you have 2+ years of history. Online lenders and MCAs rarely ask for one. Having a plan can strengthen your application even when not required.',
      },
      {
        question: 'What is a personal financial statement and do I need one?',
        answer: <>A personal financial statement (PFS) lists your personal assets (home, investments, savings) and liabilities (mortgage, car loans, credit card debt). SBA lenders and most banks require one from every owner with 20% or more ownership. Online lenders typically do not. The SBA has a standard form (SBA Form 413) that most lenders accept. Check our <Link href="/tools/funding-readiness-assessment" className="text-theme-primary-light font-medium hover:underline">funding readiness assessment</Link> to see what documentation your situation is likely to require.</>,
        schemaAnswer: 'A personal financial statement lists your personal assets and liabilities. SBA lenders and most banks require one from every owner with 20%+ ownership. Online lenders typically do not. The SBA has a standard form (SBA Form 413) that most lenders accept.',
      },
      {
        question: 'How should I organize my loan documents?',
        answer: <>Create a dedicated folder (digital or physical) for your application. Name files clearly: "2024_Business_Tax_Return.pdf" is better than "scan_001.pdf." Group documents by category: financial statements, bank records, business documents, and personal items. Download bank statements and tax transcripts as PDFs directly from source portals. If your financials are managed by an accountant, ask them to prepare a current P&L and balance sheet. Being organized can cut days off your approval timeline. <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">Talk to a funding specialist</Link> who can walk you through exactly what your specific application will need.</>,
        schemaAnswer: 'Create a dedicated folder and name files clearly. Group documents by category: financial statements, bank records, business documents, and personal items. Download statements as PDFs directly from source portals. Being organized can cut days off your approval timeline.',
      },
    ],
    seo: {
      title: 'Loan Document Checklist | Free Tool | Quick Lenders',
      description: 'Get a personalized document checklist for your business loan application. Select your loan type and check off required items as you gather them. Free and instant.',
    },
    relatedTools: ['funding-readiness-assessment', 'loan-finder-quiz', 'sba-loan-payment-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
  'business-loan-glossary': {
    slug: 'business-loan-glossary',
    name: 'Business Loan Glossary',
    category: 'content-assets',
    status: 'live',
    icon: BookOpen,
    shortDescription: 'Look up definitions for common business financing terms, acronyms, and concepts.',
    longDescription: 'A searchable glossary of 40+ business lending terms explained in plain language. Browse by category, search by keyword, and click related terms to build your understanding of financing concepts.',
    features: ['40+ terms defined', 'Keyword search', 'Category filtering', 'Related term links', 'Alphabetical browsing', 'Plain-language definitions'],
    faqs: [
      {
        question: 'What terms are included in the Business Loan Glossary?',
        answer: <>The glossary covers 40+ terms across six categories: loan types, financial metrics, costs and fees, application and process terms, collateral and security, and repayment. You will find definitions for common terms like APR, DSCR, factor rate, amortization, UCC filing, personal guarantee, and more. Each definition is written in plain language and links to related terms so you can build a full picture of how business financing works.</>,
        schemaAnswer: 'The glossary covers 40+ terms across six categories: loan types, financial metrics, costs and fees, application and process terms, collateral and security, and repayment. Terms include APR, DSCR, factor rate, amortization, UCC filing, personal guarantee, and more.',
      },
      {
        question: 'What is the difference between APR and interest rate?',
        answer: <>An interest rate is the cost of borrowing the principal amount, expressed as a percentage. APR (Annual Percentage Rate) includes the interest rate plus any fees, closing costs, and other charges, giving you a more complete picture of what you are paying. Two loans with the same interest rate can have very different APRs if one has higher fees. Always compare APR, not just the stated rate. Use our <Link href="/tools/total-cost-of-capital-calculator" className="text-theme-primary-light font-medium hover:underline">total cost of capital calculator</Link> to see the full cost of a loan including all fees.</>,
        schemaAnswer: 'An interest rate is the cost of borrowing the principal. APR includes the interest rate plus fees, closing costs, and other charges, giving a more complete cost picture. Two loans with the same interest rate can have different APRs if one has higher fees. Always compare APR, not just the stated rate.',
      },
      {
        question: 'What is a factor rate and how does it differ from APR?',
        answer: <>A factor rate is a multiplier (typically 1.1 to 1.5) used by merchant cash advance providers and some short-term lenders. Multiply your advance amount by the factor rate to get total repayment. A $100,000 advance at a 1.3 factor rate costs $130,000 total. Factor rates look lower than APR because they do not account for the short repayment period. A 1.3 factor over 6 months equals roughly 60% APR. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate to APR converter</Link> to compare these costs on equal terms.</>,
        schemaAnswer: 'A factor rate is a multiplier (typically 1.1 to 1.5) used by MCA providers. Multiply the advance by the factor rate to get total repayment. Factor rates look lower than APR because they do not account for the short repayment period. A 1.3 factor over 6 months equals roughly 60% APR.',
      },
      {
        question: 'What is DSCR and why do lenders care about it?',
        answer: <>DSCR stands for Debt Service Coverage Ratio. It measures whether your business generates enough income to cover its debt payments. The formula is Net Operating Income divided by Total Debt Payments. A DSCR of 1.25 means you earn $1.25 for every $1 of debt, giving lenders a 25% cushion. Most lenders require a minimum DSCR of 1.15 to 1.25 for approval. Below 1.0 means you cannot cover your debt from operations. Calculate yours with our <Link href="/tools/dscr-calculator" className="text-theme-primary-light font-medium hover:underline">DSCR calculator</Link> before applying.</>,
        schemaAnswer: 'DSCR (Debt Service Coverage Ratio) measures whether your business generates enough income to cover debt payments. The formula is Net Operating Income divided by Total Debt Payments. Most lenders require a minimum DSCR of 1.15 to 1.25. Below 1.0 means you cannot cover debt from operations.',
      },
      {
        question: 'What is a UCC filing?',
        answer: <>A UCC (Uniform Commercial Code) filing is a legal notice that a lender has a security interest in your business assets. When you take out a secured loan, the lender files a UCC-1 form with your state to publicly claim their collateral rights. If you default, the UCC filing gives them priority to seize those assets. UCC filings are common with <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based lending</Link>, equipment financing, and lines of credit. They appear on your business credit report and can affect your ability to get additional financing until they are released.</>,
        schemaAnswer: 'A UCC filing is a legal notice that a lender has a security interest in your business assets. The lender files a UCC-1 form with your state to publicly claim collateral rights. UCC filings are common with asset-based lending, equipment financing, and lines of credit. They appear on your business credit report.',
      },
    ],
    seo: {
      title: 'Business Loan Glossary | 40+ Terms | Quick Lenders',
      description: 'Look up 40+ business financing terms explained in plain language. Search by keyword, browse by category, and click related terms to understand lending concepts.',
    },
    relatedTools: ['loan-finder-quiz', 'factor-rate-to-apr-calculator', 'dscr-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'asset-backed-loans'],
  },
  'interest-rate-comparison-chart': {
    slug: 'interest-rate-comparison-chart',
    name: 'Interest Rate Comparison Chart',
    category: 'content-assets',
    status: 'live',
    icon: Clock,
    shortDescription: 'Compare typical interest rates across different business loan types and lender categories.',
    longDescription: 'An interactive chart comparing average interest rates, terms, amounts, and approval timelines for 9 business financing products from SBA loans to merchant cash advances.',
    features: ['9 products compared', 'Visual rate range bars', 'Sortable comparison table', 'Approval speed estimates', 'Credit score minimums', 'Loan amount ranges'],
    faqs: [
      {
        question: 'What business loan types are included in the rate comparison?',
        answer: <>The chart compares 9 financing products: SBA 7(a) loans, SBA 504 loans, bank term loans, online term loans, <Link href="/business-loans/lines-of-credit" className="text-theme-primary-light font-medium hover:underline">business lines of credit</Link>, <Link href="/business-loans/equipment-financing" className="text-theme-primary-light font-medium hover:underline">equipment financing</Link>, invoice factoring, merchant cash advances, and <Link href="/business-loans/asset-backed-loans" className="text-theme-primary-light font-medium hover:underline">asset-based lending</Link>. Each product shows its typical rate range, term length, loan amount, approval speed, and minimum credit score.</>,
        schemaAnswer: 'The chart compares 9 financing products: SBA 7(a) loans, SBA 504 loans, bank term loans, online term loans, business lines of credit, equipment financing, invoice factoring, merchant cash advances, and asset-based lending. Each shows typical rate range, term, amount, approval speed, and credit minimum.',
      },
      {
        question: 'Why do business loan rates vary so much?',
        answer: <>Lenders price based on risk. SBA loans carry government guarantees and typically offer rates from 5% to 13%. Equipment loans use the equipment as collateral, keeping rates between 7% and 20%. Unsecured online loans carry more risk for the lender, so rates range from 10% to 30%. MCAs are the most expensive because repayment comes from future revenue with no fixed collateral. Your actual rate within each range depends on your credit score, time in business, revenue, industry, and the loan amount. Use our <Link href="/tools/loan-payment-calculator" className="text-theme-primary-light font-medium hover:underline">loan payment calculator</Link> to see how different rates affect your monthly payment.</>,
        schemaAnswer: 'Lenders price based on risk. SBA loans have government guarantees and offer 5-13%. Equipment loans use collateral for 7-20%. Unsecured online loans carry more risk at 10-30%. MCAs are most expensive. Your actual rate depends on credit score, time in business, revenue, industry, and loan amount.',
      },
      {
        question: 'What is the cheapest type of business loan?',
        answer: <>SBA 504 loans typically offer the lowest rates, starting around 5% to 7%, but they are limited to real estate and major equipment purchases. SBA 7(a) loans are the next most affordable at 6% to 13% and can be used for more purposes. Bank term loans fall in the 7% to 15% range. The tradeoff is that lower-rate products have stricter requirements and longer approval timelines. If you need funding quickly and have a weaker profile, online lenders or lines of credit may be more realistic options even though rates are higher.</>,
        schemaAnswer: 'SBA 504 loans typically offer the lowest rates at 5-7% but are limited to real estate and equipment. SBA 7(a) loans are next at 6-13%. Bank term loans range 7-15%. Lower-rate products have stricter requirements and longer approval timelines.',
      },
      {
        question: 'How do I get the lowest rate for my business?',
        answer: <>The strongest profiles get the best rates. That means a credit score above 700, at least 2 years in business, consistent revenue, low existing debt, and organized financial documentation. Then compare offers from multiple lenders, since rates for the same loan can vary by 5 to 10 percentage points between providers. Our <Link href="/tools/business-loan-comparison-tool" className="text-theme-primary-light font-medium hover:underline">loan comparison tool</Link> lets you put offers side by side. Or <Link href="/get-started" className="text-theme-primary-light font-medium hover:underline">talk to a funding specialist</Link> who can match you with competitive lenders for your profile, with no impact to your credit score.</>,
        schemaAnswer: 'The strongest profiles get the best rates: credit score above 700, 2+ years in business, consistent revenue, low existing debt, and organized documentation. Then compare offers from multiple lenders since rates can vary by 5-10 percentage points between providers.',
      },
      {
        question: 'Are the rates shown guaranteed?',
        answer: <>No. The rates shown are industry averages based on typical ranges for each product type. Your actual rate depends on your specific business profile, the lender you work with, current market conditions, and the loan amount. Rates can be higher or lower than the ranges shown. Factor rates for MCAs are displayed as APR equivalents for easier comparison. Use our <Link href="/tools/total-cost-of-capital-calculator" className="text-theme-primary-light font-medium hover:underline">total cost of capital calculator</Link> to see the full cost of a specific loan offer, or our <Link href="/tools/factor-rate-to-apr-calculator" className="text-theme-primary-light font-medium hover:underline">factor rate converter</Link> to translate MCA costs to APR.</>,
        schemaAnswer: 'No. Rates shown are industry averages based on typical ranges for each product type. Your actual rate depends on your business profile, lender, market conditions, and loan amount. Rates can be higher or lower than shown. Factor rates for MCAs are displayed as APR equivalents.',
      },
    ],
    seo: {
      title: 'Interest Rate Comparison Chart | Free | Quick Lenders',
      description: 'Compare typical interest rates for 9 business loan types side by side. See rate ranges, terms, amounts, and credit requirements in one sortable chart.',
    },
    relatedTools: ['loan-payment-calculator', 'total-cost-of-capital-calculator', 'factor-rate-to-apr-calculator'],
    relatedLoanProducts: ['term-loans', 'lines-of-credit', 'equipment-financing'],
  },
}

export function getToolBySlug(slug: string): ToolData | undefined {
  return toolsData[slug]
}

export function getToolsByCategory(category: ToolCategory): ToolData[] {
  return Object.values(toolsData).filter((t) => t.category === category)
}

export function getLiveTools(): ToolData[] {
  return Object.values(toolsData).filter((t) => t.status === 'live')
}

export function getAllTools(): ToolData[] {
  return Object.values(toolsData)
}
