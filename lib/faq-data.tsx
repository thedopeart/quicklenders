import Link from 'next/link'
import { ReactNode } from 'react'

export interface ArticleFAQ {
  question: string
  answer: ReactNode
  schemaAnswer: string
}

const faqsBySlug: Record<string, ArticleFAQ[]> = {
  'bootstrapping-finance': [
    {
      question: 'What is bootstrapping and how does it work?',
      answer: <>Bootstrapping means funding your business using personal savings, revenue from early sales, and careful cost management rather than outside investors or loans. Founders retain full ownership and control, reinvesting profits back into the company to fuel growth. While slower than venture-backed growth, bootstrapping builds a sustainable foundation. If you need supplemental capital at any point, a <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">business line of credit</Link> can bridge short-term gaps without giving up equity.</>,
      schemaAnswer: 'Bootstrapping means funding your business using personal savings, revenue from early sales, and careful cost management rather than outside investors or loans. Founders retain full ownership and control, reinvesting profits back into the company to fuel growth. While slower than venture-backed growth, bootstrapping builds a sustainable foundation that does not require giving up equity.',
    },
    {
      question: 'How much money do I need to bootstrap a business?',
      answer: <>The amount varies significantly by industry and business model. Service businesses can often launch with under $5,000, while product-based businesses may need $10,000 to $50,000 or more for initial inventory and equipment. The key is minimizing upfront costs by starting small, validating your concept with real customers, and scaling with revenue. For larger purchases like equipment, <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment financing</Link> lets you preserve cash while acquiring what you need.</>,
      schemaAnswer: 'The amount varies significantly by industry and business model. Service businesses can often launch with under $5,000, while product-based businesses may need $10,000 to $50,000 or more for initial inventory and equipment. The key is minimizing upfront costs by starting small, validating your concept with real customers, and scaling with revenue.',
    },
    {
      question: 'What are the biggest challenges of bootstrapping?',
      answer: <>The primary challenges are limited cash flow, slower growth compared to funded competitors, and the personal financial risk of using your own savings. Cash flow management becomes critical because every dollar must be earned before it can be reinvested. Many bootstrapped founders also struggle with wearing multiple hats and having limited resources for marketing or hiring. Reading about <Link href="/financial-insights/short-term-business-financing" className="text-quicklend-600 font-medium hover:underline">short-term business financing</Link> options can help you understand when outside capital makes sense to supplement bootstrapping.</>,
      schemaAnswer: 'The primary challenges are limited cash flow, slower growth compared to funded competitors, and the personal financial risk of using your own savings. Cash flow management becomes critical because every dollar must be earned before it can be reinvested. Many bootstrapped founders also struggle with wearing multiple hats and having limited resources for marketing or hiring.',
    },
    {
      question: 'When should I stop bootstrapping and seek funding?',
      answer: <>Consider outside funding when you have validated product-market fit and need capital to scale faster than revenue allows, when a time-sensitive market opportunity requires rapid investment, or when lack of capital is causing you to lose customers to better-funded competitors. The transition does not have to mean giving up equity. <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">Business term loans</Link> and lines of credit provide growth capital while letting you maintain full ownership of your company.</>,
      schemaAnswer: 'Consider outside funding when you have validated product-market fit and need capital to scale faster than revenue allows, when a time-sensitive market opportunity requires rapid investment, or when lack of capital is causing you to lose customers to better-funded competitors. Business term loans and lines of credit provide growth capital while letting you maintain full ownership.',
    },
    {
      question: 'Can I combine bootstrapping with debt financing?',
      answer: <>Yes, many successful businesses use a hybrid approach. You might bootstrap the initial launch and validation phase, then use debt financing to accelerate growth once you have proven revenue. This preserves equity while providing capital for expansion, inventory, or <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment purchases</Link>. The key is borrowing only when you have a clear plan for how the capital will generate returns that exceed the cost of borrowing. <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">Check your financing options</Link> to see what you may qualify for.</>,
      schemaAnswer: 'Yes, many successful businesses use a hybrid approach. You might bootstrap the initial launch and validation phase, then use debt financing to accelerate growth once you have proven revenue. This preserves equity while providing capital for expansion, inventory, or equipment purchases. The key is borrowing only when the capital will generate returns that exceed the cost of borrowing.',
    },
  ],

  'cash-loans-direct': [
    {
      question: 'What are direct cash loans for businesses?',
      answer: <>Direct cash loans provide a lump sum of capital deposited directly into your business bank account, typically from an online lender or alternative financing provider rather than a traditional bank. These loans are characterized by fast approval, minimal paperwork, and quick funding, often within 24 to 48 hours. The trade-off is generally higher interest rates compared to <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">traditional term loans</Link>. They are best suited for businesses that need capital quickly and have a clear plan for generating returns.</>,
      schemaAnswer: 'Direct cash loans provide a lump sum of capital deposited directly into your business bank account, typically from an online or alternative financing provider rather than a traditional bank. These loans feature fast approval, minimal paperwork, and quick funding, often within 24 to 48 hours. The trade-off is generally higher interest rates compared to traditional term loans.',
    },
    {
      question: 'How do I qualify for a direct cash loan?',
      answer: <>Most direct cash lenders require a minimum of 6 months in business, at least $10,000 in monthly revenue, and a credit score of 500 or higher. Requirements are generally less strict than traditional banks, making these loans accessible to businesses with imperfect credit or limited operating history. You will typically need to provide 3 to 6 months of bank statements. For better rates and terms, improving your credit score before applying can make a significant difference. Learn more about <Link href="/financial-insights/how-to-improve-credit-fast" className="text-quicklend-600 font-medium hover:underline">improving your credit score</Link>.</>,
      schemaAnswer: 'Most direct cash lenders require a minimum of 6 months in business, at least $10,000 in monthly revenue, and a credit score of 500 or higher. Requirements are generally less strict than traditional banks, making these loans accessible to businesses with imperfect credit or limited operating history. You will typically need to provide 3 to 6 months of bank statements.',
    },
    {
      question: 'What is the difference between a cash advance and a cash loan?',
      answer: <>A business cash advance (merchant cash advance) is not technically a loan. It is a purchase of your future sales at a discount, repaid through a percentage of daily credit card receipts or bank deposits. A direct cash loan is a traditional lending arrangement with a fixed repayment schedule, principal, and interest rate. Cash advances are faster to obtain but typically more expensive. For most businesses, a <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">business line of credit</Link> offers similar speed with lower overall costs.</>,
      schemaAnswer: 'A business cash advance is a purchase of your future sales at a discount, repaid through a percentage of daily receipts. A direct cash loan is a traditional lending arrangement with a fixed repayment schedule, principal, and interest rate. Cash advances are faster to obtain but typically more expensive. For most businesses, a business line of credit offers similar speed with lower overall costs.',
    },
    {
      question: 'What are typical interest rates on direct cash loans?',
      answer: <>Interest rates on direct cash loans range from 10% to 50% or higher when annualized, depending on your credit profile, revenue, and the lender. Factor rates, commonly used for cash advances, typically range from 1.1 to 1.5, meaning you repay $1.10 to $1.50 for every dollar borrowed. Always calculate the true APR before committing, as quoted rates can be misleading. Businesses with stronger credit and revenue may qualify for much lower rates through <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">traditional term loans</Link>.</>,
      schemaAnswer: 'Interest rates on direct cash loans range from 10% to 50% or higher when annualized, depending on your credit profile, revenue, and the lender. Factor rates commonly range from 1.1 to 1.5, meaning you repay $1.10 to $1.50 for every dollar borrowed. Always calculate the true APR before committing, as quoted rates can be misleading.',
    },
    {
      question: 'How fast can I get funded with a direct cash loan?',
      answer: <>Many direct lenders can approve and fund within 24 to 48 hours once you submit a complete application with required documents. Some same-day funding options exist for straightforward applications with established revenue. The speed comes from automated underwriting that relies heavily on bank statement analysis rather than extensive documentation. If your need is less urgent, you may benefit from exploring <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">multiple financing options</Link> to compare rates and terms before committing.</>,
      schemaAnswer: 'Many direct lenders can approve and fund within 24 to 48 hours once you submit a complete application with required documents. Some same-day funding options exist for straightforward applications with established revenue. The speed comes from automated underwriting that relies heavily on bank statement analysis rather than extensive documentation.',
    },
  ],

  'direct-lender-loans-online': [
    {
      question: 'What is a direct lender and how is it different from a broker?',
      answer: <>A direct lender funds loans using its own capital and makes the final lending decision. A broker connects you with multiple lenders but does not fund the loan itself. Direct lenders offer a single application process and often faster decisions, while brokers provide access to more options. Quick Lenders helps you compare offers from multiple lending partners so you can find the best fit. <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">Start your comparison</Link> to see available options.</>,
      schemaAnswer: 'A direct lender funds loans using its own capital and makes the final lending decision. A broker connects you with multiple lenders but does not fund the loan itself. Direct lenders offer a single application process and often faster decisions, while brokers provide access to more options.',
    },
    {
      question: 'Are online direct lenders legitimate?',
      answer: <>Yes, many online direct lenders are reputable, licensed financial institutions. However, the online lending space also includes predatory operators. To verify legitimacy, check that the lender is registered with your state's financial regulatory agency, look for reviews on the BBB and Trustpilot, verify they disclose all fees and terms upfront, and confirm they perform proper underwriting rather than guaranteeing approval to anyone. <Link href="/financial-insights/first-time-business-loans" className="text-quicklend-600 font-medium hover:underline">First-time borrowers</Link> should be especially careful about reading all terms before signing.</>,
      schemaAnswer: 'Yes, many online direct lenders are reputable, licensed financial institutions. However, the online lending space also includes predatory operators. To verify legitimacy, check that the lender is registered with your state financial regulatory agency, look for BBB and Trustpilot reviews, verify they disclose all fees and terms upfront, and confirm they perform proper underwriting.',
    },
    {
      question: 'What types of loans do online direct lenders offer?',
      answer: <>Online direct lenders offer a wide range of products including <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">term loans</Link>, <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link>, <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment financing</Link>, invoice factoring, and merchant cash advances. Many specialize in specific products or borrower profiles, such as startups, businesses with lower credit scores, or specific industries. Comparing multiple lenders helps you find the best product and rate for your situation.</>,
      schemaAnswer: 'Online direct lenders offer a wide range of products including term loans, lines of credit, equipment financing, invoice factoring, and merchant cash advances. Many specialize in specific products or borrower profiles, such as startups, businesses with lower credit scores, or specific industries. Comparing multiple lenders helps you find the best product and rate for your situation.',
    },
    {
      question: 'What are the advantages of borrowing from an online lender?',
      answer: <>Online lenders typically offer faster application processes, quicker funding (often 1 to 3 business days), more flexible qualification requirements, and less paperwork than traditional banks. Many use technology-driven underwriting that can analyze your financial data more quickly. The trade-off is that online lenders often charge higher interest rates than banks or <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">asset-based lending</Link> programs, particularly for borrowers with lower credit scores.</>,
      schemaAnswer: 'Online lenders typically offer faster application processes, quicker funding (often 1 to 3 business days), more flexible qualification requirements, and less paperwork than traditional banks. Many use technology-driven underwriting that can analyze your financial data more quickly. The trade-off is that online lenders often charge higher interest rates than banks, particularly for borrowers with lower credit scores.',
    },
    {
      question: 'How do I compare offers from different online lenders?',
      answer: <>Focus on the total cost of borrowing, not just the quoted interest rate. Compare the APR (which includes fees), total repayment amount, payment frequency and amount, prepayment penalties, and any origination or ongoing fees. Get at least three offers before committing. Be cautious of lenders that pressure you to sign quickly or do not clearly disclose all costs. Visit our <Link href="/financial-insights" className="text-quicklend-600 font-medium hover:underline">Financial Insights</Link> for more guidance on evaluating loan offers.</>,
      schemaAnswer: 'Focus on the total cost of borrowing, not just the quoted interest rate. Compare the APR which includes fees, total repayment amount, payment frequency and amount, prepayment penalties, and any origination or ongoing fees. Get at least three offers before committing and be cautious of lenders that pressure you to sign quickly.',
    },
  ],

  'first-time-personal-loans-with-no-credit-history': [
    {
      question: 'Can I get a personal loan with no credit history at all?',
      answer: <>Yes, but your options are limited and rates will be higher than for borrowers with established credit. Credit unions and online lenders are typically more willing to work with thin-file borrowers than traditional banks. Some lenders use alternative data such as rent payments, utility bills, and bank account history to evaluate applicants without traditional credit scores. Secured loans backed by a savings account deposit are another accessible option for first-time borrowers.</>,
      schemaAnswer: 'Yes, but options are limited and rates will be higher than for borrowers with established credit. Credit unions and online lenders are typically more willing to work with thin-file borrowers than traditional banks. Some lenders use alternative data such as rent payments, utility bills, and bank account history to evaluate applicants without traditional credit scores.',
    },
    {
      question: 'What is the easiest type of loan to get with no credit?',
      answer: <>Secured personal loans and credit-builder loans are the most accessible for borrowers with no credit history. Secured loans require a cash deposit as collateral, which reduces lender risk. Credit-builder loans hold the loan amount in a savings account while you make payments, releasing the funds once you complete the term. Both report to credit bureaus, helping you build a credit profile for future borrowing including <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">business term loans</Link> or <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link>.</>,
      schemaAnswer: 'Secured personal loans and credit-builder loans are the most accessible for borrowers with no credit history. Secured loans require a cash deposit as collateral, which reduces lender risk. Credit-builder loans hold the loan amount in a savings account while you make payments, releasing the funds once you complete the term. Both report to credit bureaus, helping you establish a credit profile.',
    },
    {
      question: 'How do I start building credit from scratch?',
      answer: <>Start with a secured credit card or credit-builder loan, both of which report to credit bureaus and help establish your payment history. Use the card for small purchases and pay the balance in full each month. After 6 to 12 months of consistent on-time payments, you should have enough history to qualify for unsecured products. You can also ask to be added as an authorized user on a family member's credit card to benefit from their positive payment history. See our guide on <Link href="/financial-insights/how-to-improve-credit-fast" className="text-quicklend-600 font-medium hover:underline">improving your credit score</Link> for more strategies.</>,
      schemaAnswer: 'Start with a secured credit card or credit-builder loan that reports to credit bureaus. Use the card for small purchases and pay the balance in full each month. After 6 to 12 months of consistent on-time payments, you should have enough history to qualify for unsecured products. You can also be added as an authorized user on a family member\'s credit card.',
    },
    {
      question: 'What interest rates should I expect with no credit history?',
      answer: <>First-time borrowers with no credit history typically see interest rates ranging from 15% to 36% on personal loans, depending on the lender and loan type. Secured loans and credit union products tend to offer rates on the lower end. As you build your credit history through consistent payments, you can refinance into lower-rate products. Avoid payday loans and high-cost lenders that charge APRs exceeding 100%, as these create debt cycles that are difficult to escape.</>,
      schemaAnswer: 'First-time borrowers with no credit history typically see interest rates ranging from 15% to 36% on personal loans, depending on the lender and loan type. Secured loans and credit union products tend to offer lower rates. As you build credit through consistent payments, you can refinance into lower-rate products. Avoid payday loans that charge APRs exceeding 100%.',
    },
    {
      question: 'Should I use a personal loan or a business loan for my startup?',
      answer: <>If you have a registered business, a business loan is generally the better choice because it builds business credit separately from personal credit, and business loan interest may be tax-deductible. However, if your business is pre-revenue or very early stage, personal loans may be easier to obtain. Keep the two separate when possible. Once your business has 6 or more months of revenue, explore <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">business financing options</Link> that do not rely on your personal credit history.</>,
      schemaAnswer: 'If you have a registered business, a business loan is generally the better choice because it builds business credit separately from personal credit, and business loan interest may be tax-deductible. However, if your business is pre-revenue, personal loans may be easier to obtain. Once your business has 6 or more months of revenue, explore dedicated business financing options.',
    },
  ],

  'how-to-get-a-startup-business-loan-with-bad-credit': [
    {
      question: 'Can I really get a startup loan with bad credit?',
      answer: <>Yes, though your options are more limited and costs will be higher. Alternative lenders, <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment financing</Link> (where the equipment serves as collateral), and microloans from nonprofits are the most accessible options for startups with poor credit. Having a strong business plan, collateral, or a creditworthy co-signer can significantly improve your chances. Revenue-based lending is another path if your startup is already generating income.</>,
      schemaAnswer: 'Yes, though options are more limited and costs will be higher. Alternative lenders, equipment financing where the equipment serves as collateral, and microloans from nonprofits are the most accessible options for startups with poor credit. Having a strong business plan, collateral, or a creditworthy co-signer can significantly improve your chances.',
    },
    {
      question: 'What credit score is considered bad for business lending?',
      answer: <>In business lending, a credit score below 600 is generally considered poor, and below 500 is very poor. Most traditional lenders require 650 or higher, while some online lenders work with scores as low as 500. Keep in mind that business lenders also consider your business revenue, time in operation, and industry when making decisions. <Link href="/financial-insights/how-to-improve-credit-fast" className="text-quicklend-600 font-medium hover:underline">Improving your credit score</Link> even by 50 to 100 points can open significantly better loan options.</>,
      schemaAnswer: 'In business lending, a credit score below 600 is generally considered poor, and below 500 is very poor. Most traditional lenders require 650 or higher, while some online lenders work with scores as low as 500. Business lenders also consider your revenue, time in operation, and industry. Improving your score by even 50 to 100 points can open significantly better options.',
    },
    {
      question: 'What types of financing are available for bad credit startups?',
      answer: <>Several options exist: microloans from nonprofit lenders (up to $50,000 with flexible requirements), equipment financing (the equipment acts as collateral), invoice factoring (based on your customers' credit, not yours), merchant cash advances (based on sales volume), and <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">asset-based lending</Link> if you have collateral. Each has different costs and terms, so compare carefully. Revenue-based lending is growing in popularity for startups with existing sales.</>,
      schemaAnswer: 'Several options exist: microloans from nonprofit lenders up to $50,000, equipment financing where the equipment acts as collateral, invoice factoring based on your customers\' credit rather than yours, merchant cash advances based on sales volume, and asset-based lending if you have collateral. Each has different costs and terms, so compare carefully.',
    },
    {
      question: 'How can I improve my chances of approval with bad credit?',
      answer: <>Focus on factors you can control: offer collateral to reduce lender risk, find a creditworthy co-signer, demonstrate strong and consistent business revenue, prepare a detailed business plan showing how the loan will generate returns, and reduce existing debt to improve your debt-to-income ratio. Starting with a smaller loan amount and repaying it successfully can also build credibility for larger future borrowing through products like <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">term loans</Link>.</>,
      schemaAnswer: 'Focus on factors you can control: offer collateral to reduce lender risk, find a creditworthy co-signer, demonstrate strong and consistent business revenue, prepare a detailed business plan, and reduce existing debt to improve your debt-to-income ratio. Starting with a smaller loan amount and repaying it successfully can build credibility for larger future borrowing.',
    },
    {
      question: 'Should I wait to improve my credit before applying?',
      answer: <>It depends on how urgently you need capital. If you can wait 3 to 6 months, focused credit improvement efforts like paying down balances, disputing errors, and making all payments on time can raise your score enough to qualify for better rates. However, if a business opportunity requires immediate capital, applying now with a plan to refinance later at better terms is a valid strategy. <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">Check your options</Link> with a soft credit pull that will not affect your score.</>,
      schemaAnswer: 'It depends on how urgently you need capital. If you can wait 3 to 6 months, focused credit improvement like paying down balances, disputing errors, and making all payments on time can raise your score enough for better rates. If a business opportunity requires immediate capital, applying now with a plan to refinance later at better terms is a valid strategy.',
    },
  ],

  'how-to-get-vc-financing': [
    {
      question: 'What do venture capitalists look for in a startup?',
      answer: <>VCs primarily evaluate the size of the market opportunity, the strength and experience of the founding team, evidence of product-market fit or early traction, a defensible competitive advantage, and the potential for a 10x or greater return on investment. Most VCs focus on technology-enabled businesses that can scale rapidly. If your business does not fit the VC model, <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">business term loans</Link> or <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link> may be better alternatives for growth capital.</>,
      schemaAnswer: 'VCs primarily evaluate the size of the market opportunity, the strength of the founding team, evidence of product-market fit or early traction, a defensible competitive advantage, and the potential for a 10x or greater return on investment. Most VCs focus on technology-enabled businesses that can scale rapidly.',
    },
    {
      question: 'How long does the VC fundraising process take?',
      answer: <>Expect the full process to take 3 to 6 months from initial outreach to closing. This includes building a target list and making introductions (2 to 4 weeks), initial meetings and follow-ups (4 to 8 weeks), due diligence (2 to 4 weeks), and legal documentation and closing (2 to 4 weeks). Some rounds close faster with strong momentum, while others take longer in challenging markets. During this period, you still need to run your business, so plan your cash runway accordingly.</>,
      schemaAnswer: 'Expect the full VC fundraising process to take 3 to 6 months from initial outreach to closing. This includes building a target list and introductions, initial meetings and follow-ups, due diligence, and legal documentation and closing. Some rounds close faster with strong momentum, while others take longer in challenging markets.',
    },
    {
      question: 'How much equity do VCs typically take?',
      answer: <>VCs typically acquire 15% to 30% ownership per funding round, depending on the stage, valuation, and amount raised. Seed rounds often give up 15% to 25%, Series A rounds 20% to 30%. Founders should plan for multiple rounds of dilution and aim to retain at least 50% ownership through Series A. Negotiating a fair valuation is critical to preserving your stake. For founders who want to avoid dilution entirely, <Link href="/financial-insights/bootstrapping-finance" className="text-quicklend-600 font-medium hover:underline">bootstrapping</Link> or debt financing are alternatives worth considering.</>,
      schemaAnswer: 'VCs typically acquire 15% to 30% ownership per funding round, depending on the stage, valuation, and amount raised. Seed rounds often give up 15% to 25%, while Series A rounds range from 20% to 30%. Founders should plan for multiple rounds of dilution and aim to retain at least 50% ownership through Series A.',
    },
    {
      question: 'What should be in my pitch deck?',
      answer: <>A strong pitch deck covers 10 to 15 slides: the problem you solve, your solution, market size, business model, traction and metrics, competitive landscape, team background, financial projections, your funding ask and use of funds, and a clear vision for the future. Keep slides visual and concise. Investors see hundreds of decks, so yours needs to communicate your story quickly and compellingly. Practice your delivery until you can present naturally without reading slides.</>,
      schemaAnswer: 'A strong pitch deck covers 10 to 15 slides: the problem you solve, your solution, market size, business model, traction and metrics, competitive landscape, team background, financial projections, your funding ask and use of funds, and a clear vision for the future. Keep slides visual and concise, and practice your delivery until you can present naturally.',
    },
    {
      question: 'What are the alternatives to venture capital?',
      answer: <>Alternatives include angel investors (smaller checks, earlier stage), <Link href="/financial-insights/pre-seed-funding" className="text-quicklend-600 font-medium hover:underline">pre-seed funding</Link> from accelerators, revenue-based financing, <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">business term loans</Link>, <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link>, crowdfunding, and bootstrapping from revenue. The right choice depends on your growth rate, capital needs, and how much control you want to retain. Debt financing is particularly attractive for profitable businesses that do not need to give up equity to grow. <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">Explore your debt financing options</Link> to see what fits.</>,
      schemaAnswer: 'Alternatives to VC include angel investors, pre-seed funding from accelerators, revenue-based financing, business term loans, lines of credit, crowdfunding, and bootstrapping from revenue. The right choice depends on your growth rate, capital needs, and how much control you want to retain. Debt financing is particularly attractive for profitable businesses.',
    },
  ],

  'invoice-factoring-loans': [
    {
      question: 'How does invoice factoring work?',
      answer: <>You sell your outstanding invoices to a factoring company at a discount. The factor advances you 80% to 90% of the invoice value upfront, then collects payment directly from your customer. Once the customer pays in full, the factor releases the remaining balance minus their fee (typically 1% to 5% per month). The process can be set up within a few days, and funding on individual invoices typically happens within 24 hours. For businesses that prefer to maintain direct customer relationships, <Link href="/financial-insights/invoice-financing" className="text-quicklend-600 font-medium hover:underline">invoice financing</Link> is an alternative where you retain collection responsibilities.</>,
      schemaAnswer: 'You sell your outstanding invoices to a factoring company at a discount. The factor advances you 80% to 90% of the invoice value upfront, then collects payment directly from your customer. Once the customer pays, the factor releases the remaining balance minus their fee, typically 1% to 5% per month. Funding on individual invoices typically happens within 24 hours.',
    },
    {
      question: 'What types of businesses benefit most from factoring?',
      answer: <>Factoring works best for B2B companies that invoice creditworthy customers on 30, 60, or 90-day payment terms. Industries that commonly use factoring include trucking and transportation, staffing agencies, manufacturing, wholesale distribution, and construction. The key requirement is that your customers are businesses (not consumers) with reliable payment histories. If your business model does not involve invoicing, a <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">business line of credit</Link> may better serve your cash flow needs.</>,
      schemaAnswer: 'Factoring works best for B2B companies that invoice creditworthy customers on 30, 60, or 90-day payment terms. Industries that commonly use factoring include trucking, staffing agencies, manufacturing, wholesale distribution, and construction. The key requirement is that your customers are businesses with reliable payment histories.',
    },
    {
      question: 'How much does invoice factoring cost?',
      answer: <>Factoring fees typically range from 1% to 5% of the invoice value per month, depending on your invoice volume, customer creditworthiness, and the factoring company. For example, a $10,000 invoice with a 3% monthly fee that takes 30 days to collect would cost $300. If the customer pays in 60 days, the cost doubles to $600. Always understand how fees accrue over time and ask about any additional charges such as setup fees, minimum volume requirements, or early termination penalties.</>,
      schemaAnswer: 'Factoring fees typically range from 1% to 5% of the invoice value per month, depending on your invoice volume, customer creditworthiness, and the factoring company. A $10,000 invoice with a 3% monthly fee collected in 30 days would cost $300. Always understand how fees accrue over time and ask about additional charges like setup fees or minimum volume requirements.',
    },
    {
      question: 'What is the difference between recourse and non-recourse factoring?',
      answer: <>With recourse factoring, you are responsible for buying back invoices that your customer fails to pay. This is the more common and less expensive option. With non-recourse factoring, the factoring company absorbs the loss if your customer does not pay, but fees are higher to compensate for this added risk. Non-recourse protection typically only covers customer insolvency, not payment disputes. Evaluate your customers' payment reliability when choosing between the two options.</>,
      schemaAnswer: 'With recourse factoring, you are responsible for buying back invoices your customer fails to pay. This is more common and less expensive. With non-recourse factoring, the factoring company absorbs the loss if your customer does not pay, but fees are higher. Non-recourse protection typically only covers customer insolvency, not payment disputes.',
    },
    {
      question: 'Will my customers know I am using factoring?',
      answer: <>Yes, in most cases your customers will know because the factoring company collects payment directly from them. The factor will send a notice of assignment directing your customer to pay them instead of you. Some businesses worry this signals financial weakness, but factoring is standard practice in many industries. If discretion is important, consider confidential factoring arrangements or <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">business lines of credit</Link> as alternatives that keep your financing private.</>,
      schemaAnswer: 'Yes, in most cases your customers will know because the factoring company collects payment directly from them. The factor sends a notice of assignment directing your customer to pay them instead of you. Factoring is standard practice in many industries. If discretion is important, consider confidential factoring arrangements or business lines of credit as alternatives.',
    },
  ],

  'large-business-loans': [
    {
      question: 'What qualifies as a large business loan?',
      answer: <>Large business loans generally refer to financing of $500,000 or more, with some exceeding $50 million for major projects. These loans are used for significant investments such as acquisitions, commercial real estate purchases, large-scale equipment procurement, or major expansion projects. Qualification requirements are more stringent than smaller loans, typically requiring strong financials, established business history, and often collateral. Quick Lenders offers <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">asset-based lending</Link> up to $100 million for qualified businesses.</>,
      schemaAnswer: 'Large business loans generally refer to financing of $500,000 or more, with some exceeding $50 million for major projects. These loans are used for significant investments such as acquisitions, commercial real estate, large-scale equipment, or major expansion. Qualification requirements are more stringent, typically requiring strong financials, established business history, and often collateral.',
    },
    {
      question: 'What types of large business loans are available?',
      answer: <>Common types include SBA 504 loans for real estate and equipment (up to $5.5 million), conventional <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">term loans</Link> from banks, <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">asset-based lending</Link> facilities, commercial real estate loans, <Link href="/business-loans/bonds" className="text-quicklend-600 font-medium hover:underline">bond financing</Link>, and <Link href="/business-loans/investment-banking" className="text-quicklend-600 font-medium hover:underline">investment banking</Link> advisory for complex capital raises. The right type depends on your purpose, timeline, and available collateral.</>,
      schemaAnswer: 'Common types include SBA 504 loans for real estate and equipment up to $5.5 million, conventional term loans from banks, asset-based lending facilities, commercial real estate loans, bond financing, and investment banking advisory for complex capital raises. The right type depends on your purpose, timeline, and available collateral.',
    },
    {
      question: 'What are the requirements for a large business loan?',
      answer: <>Lenders evaluating large loan requests typically require annual revenue of $1 million or more, 2 or more years in business with a proven track record, strong personal and business credit scores (usually 680+), detailed financial statements including audited financials for larger amounts, a clear business plan for the funds, and collateral for secured loans. The underwriting process is more thorough than for smaller loans and may take 2 to 8 weeks depending on complexity.</>,
      schemaAnswer: 'Lenders evaluating large loan requests typically require annual revenue of $1 million or more, 2 or more years in business, strong credit scores usually 680 or higher, detailed financial statements, a clear business plan for the funds, and collateral for secured loans. The underwriting process may take 2 to 8 weeks depending on complexity.',
    },
    {
      question: 'How do interest rates work for large business loans?',
      answer: <>Interest rates on large business loans are often lower than smaller loan rates because the larger amounts justify more competitive pricing and thorough underwriting reduces risk. Rates typically range from 5% to 15% depending on the loan type, collateral, and borrower profile. SBA loans offer some of the best rates. Variable rates tied to the prime rate are common for larger facilities. <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">Request a consultation</Link> to discuss rates specific to your situation.</>,
      schemaAnswer: 'Interest rates on large business loans are often lower than smaller loan rates because the larger amounts justify more competitive pricing and thorough underwriting reduces risk. Rates typically range from 5% to 15% depending on loan type, collateral, and borrower profile. SBA loans offer some of the best rates, and variable rates tied to the prime rate are common.',
    },
    {
      question: 'Can I get a large loan without collateral?',
      answer: <>Unsecured large business loans exist but are rare and require exceptional financial strength. Most lenders want collateral for loans above $250,000 to $500,000. If you lack traditional collateral, <Link href="/financial-insights/no-collateral-business-loan" className="text-quicklend-600 font-medium hover:underline">unsecured financing options</Link> are available at smaller amounts, or you can explore whether accounts receivable, inventory, or intellectual property might qualify as collateral through an <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">asset-based lending</Link> arrangement.</>,
      schemaAnswer: 'Unsecured large business loans exist but are rare and require exceptional financial strength. Most lenders want collateral for loans above $250,000 to $500,000. If you lack traditional collateral, unsecured financing options are available at smaller amounts, or you can explore whether accounts receivable, inventory, or intellectual property might qualify through asset-based lending.',
    },
  ],

  'long-term-business-loans': [
    {
      question: 'What is a long-term business loan?',
      answer: <>A long-term business loan has a repayment period of 3 years or more, with some extending to 25 years for real estate. These loans provide larger amounts with lower monthly payments compared to short-term financing, making them suitable for major investments like property, heavy equipment, or business acquisitions. The trade-off is stricter qualification requirements and a longer approval process. <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">Quick Lenders term loans</Link> offer terms from 1 to 3 years with competitive rates.</>,
      schemaAnswer: 'A long-term business loan has a repayment period of 3 years or more, with some extending to 25 years for real estate. These loans provide larger amounts with lower monthly payments compared to short-term financing, making them suitable for major investments like property, heavy equipment, or business acquisitions. The trade-off is stricter qualification requirements.',
    },
    {
      question: 'What can I use a long-term business loan for?',
      answer: <>Common uses include purchasing commercial real estate, buying or expanding a business, large <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment purchases</Link>, significant renovation or construction projects, and refinancing existing high-cost debt into lower monthly payments. Long-term loans work best when the investment will generate returns over many years, justifying the extended repayment timeline. For shorter-term needs like working capital or seasonal expenses, a <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">line of credit</Link> is typically more appropriate.</>,
      schemaAnswer: 'Common uses include purchasing commercial real estate, buying or expanding a business, large equipment purchases, significant renovation or construction projects, and refinancing existing high-cost debt. Long-term loans work best when the investment will generate returns over many years, justifying the extended repayment timeline.',
    },
    {
      question: 'What interest rates are typical for long-term business loans?',
      answer: <>Rates on long-term business loans typically range from 5% to 15%, depending on the loan type, your credit profile, and whether the loan is secured. SBA loans offer some of the lowest rates at 6% to 10% for qualified borrowers. Bank term loans range from 7% to 12%, while online lenders charge 10% to 25%. Secured loans with strong collateral like real estate generally qualify for the best rates. Fixed rates provide payment predictability, while variable rates may start lower but carry risk of increases.</>,
      schemaAnswer: 'Rates on long-term business loans typically range from 5% to 15%, depending on the loan type, credit profile, and collateral. SBA loans offer some of the lowest rates at 6% to 10% for qualified borrowers. Secured loans with strong collateral like real estate generally qualify for the best rates. Fixed rates provide payment predictability while variable rates may start lower.',
    },
    {
      question: 'How do I qualify for a long-term business loan?',
      answer: <>Most lenders require a credit score of 680 or higher, at least 2 years in business, annual revenue typically above $100,000, and detailed financial documentation including tax returns, profit and loss statements, and cash flow projections. Collateral is often required, especially for larger amounts. The stronger your financial profile, the better your rates and terms. Start by <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">checking your eligibility</Link> to see what options are available based on your current qualifications.</>,
      schemaAnswer: 'Most lenders require a credit score of 680 or higher, at least 2 years in business, annual revenue typically above $100,000, and detailed financial documentation including tax returns and profit and loss statements. Collateral is often required for larger amounts. The stronger your financial profile, the better your rates and terms.',
    },
    {
      question: 'What is the difference between fixed and variable rate loans?',
      answer: <>A fixed rate stays the same throughout the loan term, making your monthly payment predictable and budgeting straightforward. A variable rate fluctuates based on a benchmark like the prime rate, meaning payments can increase or decrease over time. Fixed rates are typically slightly higher initially but protect against rate increases. For long-term loans of 5 years or more, many borrowers prefer fixed rates for the stability, especially in rising rate environments.</>,
      schemaAnswer: 'A fixed rate stays the same throughout the loan term, making monthly payments predictable. A variable rate fluctuates based on a benchmark like the prime rate, meaning payments can change over time. Fixed rates are typically slightly higher initially but protect against rate increases. For long-term loans of 5 years or more, many borrowers prefer fixed rates for stability.',
    },
  ],

  'no-collateral-business-loan': [
    {
      question: 'Can I get a business loan without any collateral?',
      answer: <>Yes, unsecured business loans are available from many online lenders, credit unions, and some traditional banks. Instead of collateral, lenders rely on your credit score, business revenue, time in business, and overall financial health to make lending decisions. Most unsecured loans require a personal guarantee, which means you are personally liable if the business cannot repay. For larger amounts or better rates, consider whether you have assets that could secure a <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">term loan</Link> or <Link href="/business-loans/asset-backed-loans" className="text-quicklend-600 font-medium hover:underline">asset-based lending</Link> arrangement.</>,
      schemaAnswer: 'Yes, unsecured business loans are available from many online lenders, credit unions, and some traditional banks. Instead of collateral, lenders rely on your credit score, business revenue, time in business, and overall financial health. Most unsecured loans require a personal guarantee, meaning you are personally liable if the business cannot repay.',
    },
    {
      question: 'What are the requirements for unsecured business loans?',
      answer: <>Most unsecured business lenders require a personal credit score of 650 or higher (some accept 600+), at least 1 to 2 years in business, annual revenue of $50,000 or more, and clean financial records with no recent bankruptcies or tax liens. Stronger applicants with higher credit, more revenue, and longer business history qualify for larger amounts and better rates. Having your financial documents organized before applying speeds up the process significantly.</>,
      schemaAnswer: 'Most unsecured business lenders require a personal credit score of 650 or higher, at least 1 to 2 years in business, annual revenue of $50,000 or more, and clean financial records with no recent bankruptcies or tax liens. Stronger applicants with higher credit, more revenue, and longer business history qualify for larger amounts and better rates.',
    },
    {
      question: 'Are unsecured loans more expensive than secured loans?',
      answer: <>Yes, unsecured loans typically carry higher interest rates than secured loans because the lender takes on more risk without collateral. Unsecured rates generally range from 7% to 30% or more, compared to 4% to 15% for secured financing. The rate difference narrows for borrowers with excellent credit and strong revenue. Compare your total cost of borrowing across both options. Sometimes the security of keeping assets unencumbered is worth the premium, especially if you need those assets for <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment financing</Link> or other purposes later.</>,
      schemaAnswer: 'Yes, unsecured loans typically carry higher interest rates because the lender takes on more risk without collateral. Unsecured rates generally range from 7% to 30% or more, compared to 4% to 15% for secured financing. The rate difference narrows for borrowers with excellent credit and strong revenue. Sometimes the security of keeping assets unencumbered is worth the premium.',
    },
    {
      question: 'What is a personal guarantee and do all unsecured loans require one?',
      answer: <>A personal guarantee is your legal commitment to repay the loan from your personal assets if your business cannot. Most small business loans, both secured and unsecured, require one. This means your home, savings, and other personal property could be at risk if you default. Some lenders offer loans without personal guarantees, but these typically require stronger business financials, longer operating history, and higher credit scores. Expect to pay higher rates for the reduced personal risk.</>,
      schemaAnswer: 'A personal guarantee is your legal commitment to repay the loan from personal assets if your business cannot. Most small business loans, both secured and unsecured, require one. Some lenders offer loans without personal guarantees, but these require stronger business financials, longer operating history, and higher credit scores, often at higher rates.',
    },
    {
      question: 'How much can I borrow without collateral?',
      answer: <>Unsecured business loan amounts typically range from $10,000 to $500,000, though some lenders offer up to $1 million for well-qualified borrowers. The amount you qualify for depends primarily on your annual revenue, credit score, and time in business. As a general guideline, expect to qualify for 10% to 15% of your annual revenue without collateral. For larger amounts, <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">explore options</Link> that accept accounts receivable, inventory, or equipment as security to access higher loan limits.</>,
      schemaAnswer: 'Unsecured business loan amounts typically range from $10,000 to $500,000, though some lenders offer up to $1 million for well-qualified borrowers. The amount depends on your annual revenue, credit score, and time in business. As a general guideline, expect to qualify for 10% to 15% of your annual revenue without collateral.',
    },
  ],

  'online-loans-for-poor-credit-score': [
    {
      question: 'What credit score is considered poor for business loans?',
      answer: <>In business lending, a personal credit score below 600 is generally considered poor, while 600 to 649 is fair. Most traditional lenders require 650 or higher, but many online lenders work with scores as low as 500 to 550. Your business credit score (Dun & Bradstreet, Experian Business) is evaluated separately and can help offset a weaker personal score. Focus on <Link href="/financial-insights/how-to-improve-credit-fast" className="text-quicklend-600 font-medium hover:underline">improving your credit</Link> while exploring available options.</>,
      schemaAnswer: 'In business lending, a personal credit score below 600 is generally considered poor, while 600 to 649 is fair. Most traditional lenders require 650 or higher, but many online lenders work with scores as low as 500 to 550. Your business credit score is evaluated separately and can help offset a weaker personal score.',
    },
    {
      question: 'What online loan options exist for bad credit businesses?',
      answer: <>Options include short-term loans from alternative lenders, merchant cash advances based on sales volume, <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment financing</Link> where the equipment serves as collateral, invoice factoring based on your customers' credit, and microloans from nonprofit lenders. Each option has different costs and requirements. Equipment financing and invoice factoring are often the most accessible because they rely on asset value or customer credit rather than your personal score.</>,
      schemaAnswer: 'Options include short-term loans from alternative lenders, merchant cash advances based on sales volume, equipment financing where the equipment serves as collateral, invoice factoring based on your customers\' credit, and microloans from nonprofit lenders. Equipment financing and invoice factoring are often the most accessible because they rely on asset value or customer credit.',
    },
    {
      question: 'How much more will I pay with a poor credit score?',
      answer: <>Borrowers with poor credit typically pay 15% to 50% APR or higher, compared to 6% to 15% for borrowers with good credit. On a $100,000 loan over 2 years, the difference between a 10% and 30% rate amounts to roughly $20,000 in additional interest. This is why improving your credit, even modestly, before borrowing can save significant money. If you need capital now, plan to refinance into a lower-rate product once your credit improves through consistent repayment.</>,
      schemaAnswer: 'Borrowers with poor credit typically pay 15% to 50% APR or higher, compared to 6% to 15% for borrowers with good credit. On a $100,000 loan over 2 years, the difference between 10% and 30% amounts to roughly $20,000 in additional interest. Improving your credit before borrowing can save significant money.',
    },
    {
      question: 'How can I avoid predatory lenders when I have bad credit?',
      answer: <>Watch for these red flags: guaranteed approval regardless of credit, pressure to sign immediately without reviewing terms, fees that are not clearly disclosed, rates that seem unusually high even for bad credit products (above 100% APR), and requirements to provide access to your bank account for daily withdrawals. Always verify the lender is licensed in your state, check BBB and consumer reviews, and compare at least three offers before accepting. <Link href="/get-started" className="text-quicklend-600 font-medium hover:underline">Quick Lenders</Link> connects you with vetted lending partners.</>,
      schemaAnswer: 'Watch for red flags like guaranteed approval regardless of credit, pressure to sign immediately, undisclosed fees, rates above 100% APR, and requirements for daily bank account access. Always verify the lender is licensed in your state, check BBB and consumer reviews, and compare at least three offers before accepting any terms.',
    },
    {
      question: 'Will getting a business loan with bad credit help improve my score?',
      answer: <>Yes, if the lender reports to credit bureaus and you make all payments on time. Consistent repayment is one of the most effective ways to rebuild credit. Some online lenders report to business credit bureaus only, while others report to personal bureaus as well. Ask your lender which bureaus they report to before signing. After 6 to 12 months of on-time payments, you may qualify to refinance into a lower-rate <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">term loan</Link> or <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">line of credit</Link>.</>,
      schemaAnswer: 'Yes, if the lender reports to credit bureaus and you make all payments on time. Consistent repayment is one of the most effective ways to rebuild credit. Ask your lender which bureaus they report to before signing. After 6 to 12 months of on-time payments, you may qualify to refinance into a lower-rate product.',
    },
  ],

  'venture-capital-funding-from-investors': [
    {
      question: 'How do venture capital firms work?',
      answer: <>VC firms raise money from institutional investors (limited partners) and invest it in startups and high-growth companies in exchange for equity. They make money by exiting their investments, typically through an acquisition or IPO, at a value much higher than their initial investment. Most VC funds operate on a 10-year lifecycle and target returns of 3x to 10x on their overall portfolio. Because most startups fail, VCs need their successful investments to produce outsized returns to make the fund profitable.</>,
      schemaAnswer: 'VC firms raise money from institutional investors and invest in startups in exchange for equity. They profit by exiting investments through acquisitions or IPOs at much higher valuations. Most funds operate on a 10-year lifecycle and target returns of 3x to 10x on their portfolio. Because most startups fail, VCs need successful investments to produce outsized returns.',
    },
    {
      question: 'What stage should my startup be at to attract VC funding?',
      answer: <>Most VC firms invest at the seed stage or later, which typically means you have a working product, some early customers or revenue, and evidence of growth potential. <Link href="/financial-insights/pre-seed-funding" className="text-quicklend-600 font-medium hover:underline">Pre-seed investors</Link> and angel investors fund earlier stages when you may only have an idea and a team. The stage that attracts VC interest varies by sector and firm specialization. Enterprise software might get funded at the prototype stage, while consumer products usually need demonstrated traction.</>,
      schemaAnswer: 'Most VC firms invest at the seed stage or later, which means you have a working product, some early customers or revenue, and evidence of growth potential. Pre-seed investors and angel investors fund earlier stages. The stage that attracts VC interest varies by sector, with enterprise software sometimes funded at the prototype stage while consumer products usually need demonstrated traction.',
    },
    {
      question: 'How do I find the right VC investors for my startup?',
      answer: <>Research firms that invest in your industry, stage, and geography. Look at their portfolio companies to confirm alignment. Warm introductions from founders in their portfolio, advisors, or mutual connections are significantly more effective than cold outreach. Attend industry events, join startup communities, and build relationships before you need to raise. Many founders use databases like Crunchbase or PitchBook to identify potential investors and track their investment patterns.</>,
      schemaAnswer: 'Research firms that invest in your industry, stage, and geography, and review their portfolio companies. Warm introductions from founders in their portfolio, advisors, or mutual connections are significantly more effective than cold outreach. Attend industry events, join startup communities, and build relationships before you need to raise.',
    },
    {
      question: 'What terms should I expect in a VC term sheet?',
      answer: <>Key term sheet provisions include pre-money valuation (company value before investment), liquidation preference (order of payout in a sale), anti-dilution protection, board seats, pro-rata rights (ability to invest in future rounds), information rights, and vesting schedules for founders. Liquidation preference and anti-dilution clauses have the most impact on founder economics. Hire an experienced startup attorney to review any term sheet before signing. For businesses that prefer simpler capital structures, <Link href="/business-loans/term-loans" className="text-quicklend-600 font-medium hover:underline">business loans</Link> avoid these complexities entirely.</>,
      schemaAnswer: 'Key term sheet provisions include pre-money valuation, liquidation preference, anti-dilution protection, board seats, pro-rata rights, information rights, and vesting schedules for founders. Liquidation preference and anti-dilution clauses have the most impact on founder economics. Hire an experienced startup attorney to review any term sheet before signing.',
    },
    {
      question: 'Is venture capital right for every business?',
      answer: <>No. VC is designed for businesses that can achieve rapid, exponential growth, typically technology companies targeting large markets. If your business grows steadily but not explosively, if you want to maintain full control, or if your industry does not support VC-scale returns, other funding paths are better fits. <Link href="/financial-insights/bootstrapping-finance" className="text-quicklend-600 font-medium hover:underline">Bootstrapping</Link>, bank loans, <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link>, and revenue-based financing all provide growth capital without giving up ownership. Consider your long-term goals before pursuing venture capital.</>,
      schemaAnswer: 'No. VC is designed for businesses that can achieve rapid, exponential growth, typically technology companies targeting large markets. If your business grows steadily but not explosively, if you want full control, or if your industry does not support VC-scale returns, other funding paths are better fits. Bootstrapping, bank loans, and lines of credit provide capital without giving up ownership.',
    },
  ],
}

export function getArticleFaqs(slug: string): ArticleFAQ[] | undefined {
  return faqsBySlug[slug]
}
