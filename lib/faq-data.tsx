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

  'true-cost-of-merchant-cash-advance': [
    {
      question: 'What is the average cost of a merchant cash advance?',
      answer: <>Most MCAs use factor rates between 1.2 and 1.5, meaning you repay 120% to 150% of the advance amount. On a $50,000 advance, total repayment ranges from $60,000 to $75,000. The effective APR equivalent ranges from 40% to over 150%, depending on how quickly you repay. Use our <Link href="/tools/mca-payback-calculator" className="text-quicklend-600 font-medium hover:underline">MCA payback calculator</Link> to see your specific numbers.</>,
      schemaAnswer: 'Most MCAs use factor rates between 1.2 and 1.5, meaning you repay 120% to 150% of the advance amount. On a $50,000 advance, total repayment ranges from $60,000 to $75,000. The effective APR equivalent ranges from 40% to over 150%, depending on how quickly you repay.',
    },
    {
      question: 'How is a factor rate different from an interest rate?',
      answer: <>An interest rate is charged on your remaining balance and decreases as you pay down the loan. A factor rate is multiplied by the original advance amount, and the total cost is fixed from day one. With a factor rate, paying early does not reduce what you owe. Convert any factor rate to APR with our <Link href="/tools/factor-rate-to-apr-calculator" className="text-quicklend-600 font-medium hover:underline">factor rate to APR calculator</Link>.</>,
      schemaAnswer: 'An interest rate is charged on your remaining balance and decreases as you pay down the loan. A factor rate is multiplied by the original advance amount, and the total cost is fixed from day one. With a factor rate, paying early does not reduce what you owe.',
    },
    {
      question: 'Can you pay off a merchant cash advance early?',
      answer: <>Technically yes, but most MCAs do not offer a discount for early repayment. You owe the full amount (advance times factor rate) regardless of when you pay it off. Early repayment actually increases your effective APR because you are paying the same total cost over a shorter period.</>,
      schemaAnswer: 'Technically yes, but most MCAs do not offer a discount for early repayment. You owe the full amount regardless of when you pay it off. Early repayment actually increases your effective APR because you are paying the same total cost over a shorter period.',
    },
    {
      question: 'What is the APR equivalent of a factor rate?',
      answer: <>It depends on the repayment period. A factor rate of 1.3 is roughly 60% APR if repaid over 12 months, 120% APR over 6 months, or 180% APR over 4 months. The faster you repay, the higher the effective annual rate. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-quicklend-600 font-medium hover:underline">factor rate to APR calculator</Link> to convert your specific factor rate.</>,
      schemaAnswer: 'It depends on the repayment period. A factor rate of 1.3 is roughly 60% APR if repaid over 12 months, 120% APR over 6 months, or 180% APR over 4 months. The faster you repay, the higher the effective annual rate.',
    },
    {
      question: 'Are merchant cash advances predatory?',
      answer: <>Not all MCAs are predatory, but the structure makes them easy to abuse. Legitimate concerns include lack of APR disclosure, daily holdbacks that strain cash flow, no early payoff benefit, and confessions of judgment in some contracts. Check any MCA offer with our <Link href="/tools/loan-offer-analyzer" className="text-quicklend-600 font-medium hover:underline">loan offer analyzer</Link> before signing.</>,
      schemaAnswer: 'Not all MCAs are predatory, but the structure makes them easy to abuse. Legitimate concerns include lack of APR disclosure, daily holdbacks that strain cash flow, no early payoff benefit, and confessions of judgment in some contracts.',
    },
  ],

  'documents-needed-for-business-loan': [
    {
      question: 'How many months of bank statements do I need for a business loan?',
      answer: <>Most lenders require 3 to 6 months of business bank statements. SBA lenders and banks tend to ask for 6 months or more. Online lenders often accept 3 months. Always provide the most recent statements available. Use our <Link href="/tools/loan-document-checklist" className="text-quicklend-600 font-medium hover:underline">loan document checklist</Link> for a complete list by loan type.</>,
      schemaAnswer: 'Most lenders require 3 to 6 months of business bank statements. SBA lenders and banks tend to ask for 6 months or more. Online lenders often accept 3 months. Always provide the most recent statements available.',
    },
    {
      question: 'Do I need a business plan to get a business loan?',
      answer: <>Not always. Most online lenders and equipment financing companies do not require one. SBA lenders typically require a business plan for startups or businesses with less than 2 years of operating history. Even when not required, a business plan can strengthen your application for larger loan requests.</>,
      schemaAnswer: 'Not always. Most online lenders and equipment financing companies do not require one. SBA lenders typically require a business plan for startups or businesses with less than 2 years of operating history. Even when not required, a business plan can strengthen your application for larger loan requests.',
    },
    {
      question: 'What if my business is too new to have tax returns?',
      answer: <>You can still get funded. Online lenders often approve businesses with as little as 6 months of bank statement history. Invoice factoring is based on your customers' credit, not your business age. SBA microloans and CDFI lenders specialize in working with newer businesses that have limited documentation. Take our <Link href="/tools/funding-readiness-assessment" className="text-quicklend-600 font-medium hover:underline">funding readiness assessment</Link> to see your options.</>,
      schemaAnswer: 'You can still get funded. Online lenders often approve businesses with as little as 6 months of bank statement history. Invoice factoring is based on your customers\' credit, not your business age. SBA microloans and CDFI lenders specialize in working with newer businesses.',
    },
    {
      question: 'Do online lenders require the same documents as banks?',
      answer: <>No. Online lenders have significantly streamlined requirements. Many approve loans based primarily on bank statements and a basic application. Banks and SBA lenders require far more documentation including tax returns, financial statements, collateral records, and specialized forms. The reduced paperwork is one reason online lenders can fund faster.</>,
      schemaAnswer: 'No. Online lenders have significantly streamlined requirements. Many approve loans based primarily on bank statements and a basic application. Banks and SBA lenders require far more documentation including tax returns, financial statements, collateral records, and specialized forms.',
    },
    {
      question: 'How long does it take to gather loan documents?',
      answer: <>If your bookkeeping is current and organized, you can gather everything in 1 to 2 days. If you need to create financial statements, order tax transcripts, or update business registrations, expect 1 to 3 weeks. The biggest time saver is maintaining organized financial records year-round.</>,
      schemaAnswer: 'If your bookkeeping is current and organized, you can gather everything in 1 to 2 days. If you need to create financial statements, order tax transcripts, or update business registrations, expect 1 to 3 weeks. Maintaining organized financial records year-round is the biggest time saver.',
    },
  ],

  'how-much-business-loan-can-you-afford': [
    {
      question: 'How much of a business loan can I get with a 650 credit score?',
      answer: <>With a 650 credit score, you can typically qualify for online term loans up to $250,000 and some SBA loans if your other financials are strong. Interest rates will be in the 15% to 25% range for online lenders. Your revenue, time in business, and existing debt matter as much as the credit score. Use our <Link href="/tools/loan-affordability-calculator" className="text-quicklend-600 font-medium hover:underline">loan affordability calculator</Link> to see your specific numbers.</>,
      schemaAnswer: 'With a 650 credit score, you can typically qualify for online term loans up to $250,000 and some SBA loans if your other financials are strong. Interest rates will be in the 15% to 25% range for online lenders. Your revenue, time in business, and existing debt matter as much as the credit score.',
    },
    {
      question: 'What percentage of revenue can I borrow as a business loan?',
      answer: <>Most lenders cap loan amounts at 10% to 33% of annual revenue. Online lenders and MCAs tend to offer up to 100% to 150% of monthly revenue for shorter-term products. SBA and bank lenders typically allow higher total amounts but look more carefully at your ability to service the debt through DSCR analysis. Check your ratio with our <Link href="/tools/dscr-calculator" className="text-quicklend-600 font-medium hover:underline">DSCR calculator</Link>.</>,
      schemaAnswer: 'Most lenders cap loan amounts at 10% to 33% of annual revenue. Online lenders and MCAs tend to offer up to 100% to 150% of monthly revenue for shorter-term products. SBA and bank lenders typically allow higher total amounts but evaluate your debt service coverage ratio more carefully.',
    },
    {
      question: 'Does my personal income affect business loan approval?',
      answer: <>Yes, for small businesses. Most lenders check personal income through personal tax returns, especially for sole proprietors and businesses under $1 million in revenue. Your personal income contributes to the overall picture of repayment ability. Some SBA and bank loans include personal income in their DSCR calculation.</>,
      schemaAnswer: 'Yes, for small businesses. Most lenders check personal income through personal tax returns, especially for sole proprietors and businesses under $1 million in revenue. Your personal income contributes to the overall picture of repayment ability.',
    },
    {
      question: 'Can I get a business loan with existing debt?',
      answer: <>Yes, as long as your total debt service remains within acceptable DSCR ratios. Existing debt reduces how much new debt you can take on. If your DSCR with existing payments is 1.5, you have room for more. If it is already 1.1, you may need to pay down current debt or increase revenue before adding a new loan.</>,
      schemaAnswer: 'Yes, as long as your total debt service remains within acceptable DSCR ratios. Existing debt reduces how much new debt you can take on. If your DSCR with existing payments is 1.5, you have room. If it is already 1.1, you may need to pay down current debt first.',
    },
    {
      question: 'How do I know if I am borrowing too much?',
      answer: <>Two warning signs: the monthly payment would exceed 25% to 30% of your gross revenue, and you do not have a clear plan for how the borrowed funds will generate enough return to cover the repayment plus profit. If both are true, you are borrowing too much or borrowing for the wrong reason. Use our <Link href="/tools/loan-payment-calculator" className="text-quicklend-600 font-medium hover:underline">loan payment calculator</Link> to see the monthly impact.</>,
      schemaAnswer: 'Two warning signs: the monthly payment would exceed 25% to 30% of your gross revenue, and you do not have a clear plan for how the funds will generate enough return to cover repayment plus profit. If both are true, you are borrowing too much or borrowing for the wrong reason.',
    },
  ],

  'how-to-spot-predatory-business-loan': [
    {
      question: 'How do I know if a business loan is predatory?',
      answer: <>Look for these signs: the lender will not disclose the total repayment amount or APR, the contract includes a confession of judgment, there is no early payoff benefit, daily ACH withdrawals with no flexibility, the lender pressures you to sign immediately, or the effective APR exceeds 50% to 60%. Run any offer through our <Link href="/tools/loan-offer-analyzer" className="text-quicklend-600 font-medium hover:underline">loan offer analyzer</Link> for an instant red flag check.</>,
      schemaAnswer: 'Look for these signs: the lender will not disclose total repayment or APR, the contract includes a confession of judgment, there is no early payoff benefit, daily ACH withdrawals with no flexibility, the lender pressures you to sign immediately, or the effective APR exceeds 50% to 60%.',
    },
    {
      question: 'Are merchant cash advances predatory?',
      answer: <>Not all MCAs are predatory, but the structure makes them easy to abuse. MCAs lack APR disclosure requirements, charge fixed costs regardless of early repayment, use daily holdbacks that strain cash flow, and some include confession of judgment clauses. A well-priced MCA from a transparent provider for a short-term need can be legitimate. An MCA with a 1.5 factor rate stacked on an existing advance is a different story.</>,
      schemaAnswer: 'Not all MCAs are predatory, but the structure makes them easy to abuse. MCAs lack APR disclosure requirements, charge fixed costs regardless of early repayment, use daily holdbacks that strain cash flow, and some include confession of judgment clauses.',
    },
    {
      question: 'What is a confession of judgment in a loan?',
      answer: <>A confession of judgment is a clause where the borrower agrees in advance that the lender can obtain a court judgment without a trial if the borrower defaults. The lender can freeze bank accounts and seize assets without giving you a chance to present your side. Several states have banned or restricted them, but they remain common in business lending contracts in many jurisdictions.</>,
      schemaAnswer: 'A confession of judgment is a clause where the borrower agrees in advance that the lender can obtain a court judgment without a trial if the borrower defaults. The lender can freeze bank accounts and seize assets without giving you a chance to present your side.',
    },
    {
      question: 'Can I report a predatory business lender?',
      answer: <>Yes. File complaints with your state attorney general's office, the Federal Trade Commission, and your state's Department of Financial Institutions or banking regulator. Document everything: keep copies of the contract, communications, and any evidence of deceptive practices.</>,
      schemaAnswer: 'Yes. File complaints with your state attorney general\'s office, the Federal Trade Commission, and your state\'s Department of Financial Institutions or banking regulator. Document everything including copies of the contract and communications.',
    },
    {
      question: 'What APR is considered predatory for a business loan?',
      answer: <>There is no official legal threshold, but industry context helps. SBA and bank loans run 5% to 15% APR. Online term loans run 10% to 30%. Above 36% APR (a threshold several states use for consumer lending), the loan is expensive by any standard. Above 50% to 60%, it is extremely expensive. Anything over 100% should be scrutinized carefully. Use our <Link href="/tools/total-cost-of-capital-calculator" className="text-quicklend-600 font-medium hover:underline">total cost of capital calculator</Link> to check any offer.</>,
      schemaAnswer: 'There is no official legal threshold. SBA and bank loans run 5% to 15% APR. Online term loans run 10% to 30%. Above 36% APR is expensive by any standard. Above 50% to 60% is extremely expensive. Anything over 100% APR equivalent should be scrutinized carefully.',
    },
  ],

  'business-loan-denied-what-to-do-next': [
    {
      question: 'How long should I wait to reapply after a business loan denial?',
      answer: <>It depends on the reason. If it was a documentation issue, fix it and reapply within days. For credit improvements, 30 to 60 days of paying down debt can make a difference. For time-in-business requirements, wait until you cross the threshold. As a general rule, do not reapply to the same lender within 90 days unless something material has changed. Use our <Link href="/tools/loan-rejection-decoder" className="text-quicklend-600 font-medium hover:underline">loan rejection decoder</Link> for a personalized plan.</>,
      schemaAnswer: 'It depends on the reason. Documentation issues can be fixed and reapplied within days. Credit improvements take 30 to 60 days. Time-in-business requirements require waiting until you cross the threshold. As a general rule, do not reapply to the same lender within 90 days unless something material has changed.',
    },
    {
      question: 'Does a loan denial affect my credit score?',
      answer: <>The denial itself does not affect your score, but the hard inquiry from the application does. Each hard inquiry typically reduces your score by 2 to 5 points temporarily. The impact fades over 12 months and drops off entirely after 24 months. Multiple applications in a short period create multiple inquiries, which is why strategic, targeted applications are better than mass applying.</>,
      schemaAnswer: 'The denial itself does not affect your score, but the hard inquiry from the application does. Each hard inquiry typically reduces your score by 2 to 5 points temporarily. The impact fades over 12 months and drops off after 24 months.',
    },
    {
      question: 'Can I get a business loan with a 500 credit score?',
      answer: <>Yes, but your options are limited and expensive. MCAs, revenue-based financing, and some factoring products approve at 500 or above. Equipment financing may be possible if the equipment provides strong collateral. Expect rates above 30% for most products at this credit level. Spending 60 to 90 days improving your score above 580 opens access to online term loans at much better rates.</>,
      schemaAnswer: 'Yes, but options are limited and expensive. MCAs, revenue-based financing, and some factoring products approve at 500 or above. Equipment financing may be possible with strong collateral. Expect rates above 30%. Improving your score above 580 opens access to online term loans at much better rates.',
    },
    {
      question: 'What is the easiest business loan to get approved for?',
      answer: <>MCAs have the lowest qualification requirements: typically 500 or higher credit score, 4 or more months in business, and $10,000 or more in monthly revenue. Invoice factoring is also accessible since it is based on your customers' credit. <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">Equipment financing</Link> is easier than unsecured products because the equipment serves as collateral. "Easiest" and "cheapest" are rarely the same thing.</>,
      schemaAnswer: 'MCAs have the lowest qualification requirements: typically 500 or higher credit score, 4 or more months in business, and $10,000 or more monthly revenue. Invoice factoring is also accessible since it is based on your customers\' credit. Equipment financing is easier because the equipment serves as collateral.',
    },
    {
      question: 'Should I apply to multiple lenders at once?',
      answer: <>Apply to 2 to 3 lenders, not 10. Each application generates a hard credit inquiry. Some credit scoring models consolidate multiple loan inquiries within a 14-day window into one. Research each lender's minimum requirements first and only apply where you clearly qualify. Take our <Link href="/tools/loan-finder-quiz" className="text-quicklend-600 font-medium hover:underline">loan finder quiz</Link> to see which loan types match your profile.</>,
      schemaAnswer: 'Apply to 2 to 3 lenders, not 10. Each application generates a hard credit inquiry. Some scoring models consolidate multiple inquiries within a 14-day window. Research each lender\'s minimum requirements first and only apply where you clearly qualify.',
    },
  ],

  'what-is-a-factor-rate': [
    {
      question: 'Is a factor rate the same as an interest rate?',
      answer: <>No. An interest rate is charged on your remaining balance and decreases as you pay down the loan. A factor rate is multiplied by the original advance amount, and the total cost is fixed from day one regardless of how fast you repay. A 1.3 factor rate is not the same as 30% interest. The effective annual cost is typically 55% to 200% depending on the repayment period. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-quicklend-600 font-medium hover:underline">factor rate to APR calculator</Link> to convert.</>,
      schemaAnswer: 'No. An interest rate is charged on your remaining balance and decreases as you pay. A factor rate is multiplied by the original advance amount, and the total cost is fixed from day one. A 1.3 factor rate is not the same as 30% interest. The effective annual cost is typically 55% to 200% depending on repayment period.',
    },
    {
      question: 'How do I convert a factor rate to APR?',
      answer: <>You need the factor rate and the estimated repayment period. The approximate formula involves dividing the cost percentage by the repayment period in years. For example, a 1.3 factor rate repaid over 6 months is roughly 100% APR when accounting for daily payments. Our <Link href="/tools/factor-rate-to-apr-calculator" className="text-quicklend-600 font-medium hover:underline">factor rate to APR calculator</Link> handles the precise calculation automatically.</>,
      schemaAnswer: 'You need the factor rate and the estimated repayment period. The approximate formula divides the cost percentage by the repayment period in years. A 1.3 factor rate repaid over 6 months is roughly 100% APR when accounting for daily payments.',
    },
    {
      question: 'What is a good factor rate for a merchant cash advance?',
      answer: <>For most borrowers, a factor rate below 1.25 is competitive. Rates between 1.2 and 1.3 are average. Above 1.35 is expensive and should only be considered if you have a clear, short-term use for the funds with a strong return on investment. The factor rate alone does not tell the full story. A 1.2 rate repaid in 3 months costs more annually than a 1.3 rate repaid in 12 months.</>,
      schemaAnswer: 'For most borrowers, a factor rate below 1.25 is competitive. Rates between 1.2 and 1.3 are average. Above 1.35 is expensive and should only be considered with clear short-term use and strong ROI. The factor rate alone does not tell the full story.',
    },
    {
      question: 'Why do MCAs not use APR?',
      answer: <>MCA providers are not legally required to disclose APR because they structure products as purchases of future receivables rather than loans. This classification exempts them from Truth in Lending Act disclosure requirements. Some states are introducing legislation to require APR-equivalent disclosure for commercial financing, but as of 2026 this varies by state.</>,
      schemaAnswer: 'MCA providers are not legally required to disclose APR because they structure products as purchases of future receivables rather than loans. This exempts them from Truth in Lending Act disclosure requirements. Some states are introducing APR-equivalent disclosure legislation, but requirements vary by state.',
    },
    {
      question: 'Can I negotiate a lower factor rate?',
      answer: <>Sometimes. If you have strong monthly revenue, good credit, a history of on-time payments with the same provider, or competing offers from other lenders, you have negotiating leverage. Ask the provider directly. Some lenders have tiered pricing and can adjust based on your profile. Having a competing offer in hand gives you the strongest position.</>,
      schemaAnswer: 'Sometimes. Strong monthly revenue, good credit, on-time payment history, or competing offers give you leverage. Ask the provider directly. Some lenders have tiered pricing and can adjust based on your profile. A competing offer gives you the strongest negotiating position.',
    },
  ],

  'is-your-business-ready-for-a-loan': [
    {
      question: 'What credit score do I need for a business loan?',
      answer: <>It depends on the loan type. SBA and bank loans typically require 680 or higher. Online term loans generally need 580 to 620 or higher. Equipment financing starts around 550 to 600. MCAs and factoring may approve scores as low as 500. The higher your score, the lower your interest rate and the more options you have. Take our <Link href="/tools/funding-readiness-assessment" className="text-quicklend-600 font-medium hover:underline">funding readiness assessment</Link> to see where you stand.</>,
      schemaAnswer: 'It depends on the loan type. SBA and bank loans typically require 680 or higher. Online term loans need 580 to 620 or higher. Equipment financing starts around 550 to 600. MCAs and factoring may approve scores as low as 500. Higher scores mean lower rates and more options.',
    },
    {
      question: 'How long does my business need to be open to get a loan?',
      answer: <>Most online lenders require 6 to 12 months of operating history. Banks and SBA lenders prefer 2 or more years. Some MCAs approve businesses as young as 4 months. Invoice factoring has minimal time requirements since it is based on your customers' creditworthiness, not your business age.</>,
      schemaAnswer: 'Most online lenders require 6 to 12 months. Banks and SBA lenders prefer 2 or more years. Some MCAs approve businesses as young as 4 months. Invoice factoring has minimal time requirements since it is based on your customers\' creditworthiness.',
    },
    {
      question: 'How much revenue do I need for a business loan?',
      answer: <>Most lenders look for at least $10,000 to $15,000 in monthly revenue. Banks and SBA lenders often require higher amounts. Revenue-based lenders and MCAs may approve with lower revenue if it is consistent. The key metric is not just revenue but the ratio of revenue to expenses (cash flow). Check your ratio with our <Link href="/tools/dscr-calculator" className="text-quicklend-600 font-medium hover:underline">DSCR calculator</Link>.</>,
      schemaAnswer: 'Most lenders look for at least $10,000 to $15,000 in monthly revenue. Banks and SBA lenders often require higher amounts. The key metric is not just revenue but the ratio of revenue to expenses, which is your cash flow.',
    },
    {
      question: 'Can I get a business loan with no collateral?',
      answer: <>Yes. Many loan products are unsecured: online term loans, business lines of credit, MCAs, and invoice factoring do not require traditional collateral. However, most unsecured lenders do require a personal guarantee. Unsecured loans typically carry higher interest rates than secured products. Read more about <Link href="/financial-insights/no-collateral-business-loan" className="text-quicklend-600 font-medium hover:underline">no-collateral business loan options</Link>.</>,
      schemaAnswer: 'Yes. Online term loans, business lines of credit, MCAs, and invoice factoring do not require traditional collateral. However, most unsecured lenders require a personal guarantee. Unsecured loans typically carry higher interest rates than secured products.',
    },
    {
      question: 'When is the right time to take on business debt?',
      answer: <>When you have a specific purpose with a clear return on investment. Good reasons: equipment that increases production capacity, inventory for a confirmed large order, bridging a seasonal cash flow gap. Bad reasons: covering operating losses with no plan to become profitable, speculative expansion without market validation.</>,
      schemaAnswer: 'When you have a specific purpose with a clear return on investment. Good reasons include equipment that increases capacity, inventory for a confirmed order, or bridging a seasonal cash flow gap. Bad reasons include covering operating losses or speculative expansion without market validation.',
    },
  ],

  'prepayment-penalties-business-loans': [
    {
      question: 'Do all business loans have prepayment penalties?',
      answer: <>No. Many business <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">lines of credit</Link>, SBA microloans, and some online term loans have no prepayment penalty. SBA 7(a) loans only have penalties on loans with 15 or more year terms. MCAs typically do not have a formal penalty, but the fixed total repayment means you do not save anything by paying early. Always ask about prepayment terms before signing.</>,
      schemaAnswer: 'No. Many business lines of credit, SBA microloans, and some online term loans have no prepayment penalty. SBA 7(a) loans only have penalties on loans with 15 or more year terms. MCAs do not have a formal penalty but fixed total repayment means no savings from paying early.',
    },
    {
      question: 'Do SBA loans have prepayment penalties?',
      answer: <>SBA 7(a) loans have a penalty only for loans with terms of 15 years or longer, and only during the first 3 years: 5% in year 1, 3% in year 2, and 1% in year 3. After year 3, there is no penalty. SBA 504 loans may have a prepayment premium during the first 10 years of the CDC portion. SBA microloans (up to $50,000) have no prepayment penalty.</>,
      schemaAnswer: 'SBA 7(a) loans have a penalty only for loans with 15 or more year terms, only during the first 3 years: 5% in year 1, 3% in year 2, 1% in year 3. After year 3, no penalty. SBA 504 loans may have a premium during the first 10 years of the CDC portion. SBA microloans have no penalty.',
    },
    {
      question: 'How much is a typical prepayment penalty?',
      answer: <>Most business loan prepayment penalties range from 1% to 5% of the remaining balance. Online lenders vary widely: some charge 0%, others charge remaining interest regardless of timing. Commercial real estate loans with yield maintenance provisions can have penalties equivalent to several percentage points. Calculate yours with our <Link href="/tools/prepayment-penalty-calculator" className="text-quicklend-600 font-medium hover:underline">prepayment penalty calculator</Link>.</>,
      schemaAnswer: 'Most business loan prepayment penalties range from 1% to 5% of the remaining balance. Online lenders vary: some charge 0%, others charge remaining interest regardless of timing. Commercial real estate loans with yield maintenance can have higher penalties.',
    },
    {
      question: 'Can I negotiate to remove a prepayment penalty?',
      answer: <>Yes, in many cases. Lenders have flexibility on terms, especially if you have a strong credit profile. Ask during the application process, not after signing. Having competing offers without penalties gives you leverage. Some lenders will offer a slightly higher interest rate in exchange for removing the prepayment penalty, which can be worthwhile if you plan to pay off early.</>,
      schemaAnswer: 'Yes, in many cases. Lenders have flexibility, especially for strong credit profiles. Ask during the application process. Having competing offers without penalties gives leverage. Some lenders offer a slightly higher rate in exchange for removing the penalty.',
    },
    {
      question: 'Is it worth paying off a business loan early?',
      answer: <>It depends on three factors: how much interest you would save, how much the penalty costs, and what else you could do with the money. If interest savings exceed the penalty, early payoff makes sense. But also consider whether that cash could generate a higher return invested back in the business. Compare your options with our <Link href="/tools/refinance-savings-calculator" className="text-quicklend-600 font-medium hover:underline">refinance savings calculator</Link>.</>,
      schemaAnswer: 'It depends on three factors: how much interest you would save, how much the penalty costs, and what else you could do with the money. If interest savings exceed the penalty, early payoff makes sense. Also consider whether that cash could generate higher returns reinvested in the business.',
    },
  ],

  'what-is-dscr-debt-service-coverage-ratio': [
    {
      question: 'What is a good DSCR for a business loan?',
      answer: <>A DSCR of 1.25 or higher is considered good for most business loans. SBA lenders and banks prefer 1.25 to 1.35. Online lenders may accept 1.0 to 1.15. The higher your DSCR, the better your rates and the more you can borrow. Calculate yours with our <Link href="/tools/dscr-calculator" className="text-quicklend-600 font-medium hover:underline">DSCR calculator</Link>.</>,
      schemaAnswer: 'A DSCR of 1.25 or higher is considered good for most business loans. SBA lenders and banks prefer 1.25 to 1.35. Online lenders may accept 1.0 to 1.15. The higher your DSCR, the better your rates and the more you can borrow.',
    },
    {
      question: 'How do I calculate my debt service coverage ratio?',
      answer: <>Divide your monthly net operating income (revenue minus operating expenses, before debt payments) by your total monthly debt payments. If your NOI is $30,000 and your total debt payments are $20,000, your DSCR is 1.5. Our <Link href="/tools/dscr-calculator" className="text-quicklend-600 font-medium hover:underline">DSCR calculator</Link> does this automatically.</>,
      schemaAnswer: 'Divide your monthly net operating income (revenue minus operating expenses, before debt payments) by your total monthly debt payments. If your NOI is $30,000 and your total debt payments are $20,000, your DSCR is 1.5.',
    },
    {
      question: 'Can I get a loan with a DSCR below 1.0?',
      answer: <>It is very difficult. A DSCR below 1.0 means your business cannot cover its current debt from operating income. Most lenders will decline. Exceptions include loans with strong collateral, a co-signer with excellent finances, or MCA providers that focus on daily revenue rather than DSCR. Your best move is to improve cash flow before applying.</>,
      schemaAnswer: 'It is very difficult. A DSCR below 1.0 means your business cannot cover current debt from operating income. Most lenders will decline. Exceptions include loans with strong collateral or MCA providers that focus on daily revenue. Improving cash flow before applying is the best move.',
    },
    {
      question: 'Does DSCR include personal income?',
      answer: <>It depends on the lender and business structure. Sole proprietors and single-member LLCs often have personal income included. For corporations and multi-member LLCs, lenders typically focus on business income only. SBA lenders may consider personal income as a supplementary factor for borderline cases.</>,
      schemaAnswer: 'It depends on the lender and business structure. Sole proprietors and single-member LLCs often have personal income included. For corporations and multi-member LLCs, lenders typically focus on business income only.',
    },
    {
      question: 'How is DSCR different from debt-to-income ratio?',
      answer: <>DSCR uses net operating income (after operating expenses) and is standard for business lending. DTI uses gross income and is standard for personal lending. DSCR is more conservative because it accounts for operating costs before evaluating debt capacity. Use our <Link href="/tools/loan-affordability-calculator" className="text-quicklend-600 font-medium hover:underline">loan affordability calculator</Link> to see how much you can borrow.</>,
      schemaAnswer: 'DSCR uses net operating income after operating expenses and is standard for business lending. DTI uses gross income and is standard for personal lending. DSCR is more conservative because it accounts for operating costs before evaluating debt capacity.',
    },
  ],

  'how-to-compare-business-loan-offers': [
    {
      question: 'What is the most important number when comparing business loans?',
      answer: <>Total cost of borrowing: the total amount you will repay minus the principal. This single number captures interest, fees, and the impact of term length. Calculate it for any offer with our <Link href="/tools/total-cost-of-capital-calculator" className="text-quicklend-600 font-medium hover:underline">total cost of capital calculator</Link>.</>,
      schemaAnswer: 'Total cost of borrowing: the total amount you will repay minus the principal. This single number captures interest, fees, and the impact of term length.',
    },
    {
      question: 'Should I choose the loan with the lowest monthly payment?',
      answer: <>Not necessarily. The lowest monthly payment usually comes with the longest term, which means more total interest paid. Choose the lowest total cost that fits your monthly cash flow budget. Use our <Link href="/tools/business-loan-comparison-tool" className="text-quicklend-600 font-medium hover:underline">loan comparison tool</Link> to see the full picture.</>,
      schemaAnswer: 'Not necessarily. The lowest monthly payment usually comes with the longest term, which means more total interest. Choose the lowest total cost that fits your monthly cash flow budget.',
    },
    {
      question: 'How do I compare an MCA to a term loan?',
      answer: <>Convert the MCA's factor rate to an APR equivalent based on the estimated repayment period, then compare the effective APR, total repayment amount, and monthly cash flow impact. The MCA will almost always have a higher effective APR. Use our <Link href="/tools/factor-rate-to-apr-calculator" className="text-quicklend-600 font-medium hover:underline">factor rate to APR calculator</Link> to convert.</>,
      schemaAnswer: 'Convert the MCA\'s factor rate to an APR equivalent based on the estimated repayment period. Then compare the effective APR, total repayment amount, and monthly cash flow impact. The MCA will almost always have a higher effective APR.',
    },
    {
      question: 'Can I negotiate business loan terms?',
      answer: <>Yes. Interest rates, origination fees, prepayment penalties, and collateral requirements can all be negotiated with many lenders. Having competing offers strengthens your position. The best time to negotiate is after you receive a formal offer but before you sign.</>,
      schemaAnswer: 'Yes. Interest rates, origination fees, prepayment penalties, and collateral requirements can all be negotiated. Having competing offers strengthens your position. The best time to negotiate is after receiving a formal offer but before signing.',
    },
    {
      question: 'How many loan offers should I get before deciding?',
      answer: <>Three offers is the sweet spot. It gives you enough data to identify outliers and negotiate effectively without creating excessive hard inquiries on your credit. Research each lender's minimum requirements before applying to avoid unnecessary denials.</>,
      schemaAnswer: 'Three offers is the sweet spot. It gives you enough data to identify outliers and negotiate without excessive hard inquiries. Research each lender\'s minimum requirements before applying.',
    },
  ],

  'how-much-working-capital-do-you-need': [
    {
      question: 'What is a good working capital ratio?',
      answer: <>A ratio between 1.5 and 2.0 is considered healthy for most small businesses. Below 1.0 means more short-term liabilities than assets, which is a warning sign. Above 2.0 suggests excess cash that could be deployed for growth. Use our <Link href="/tools/working-capital-calculator" className="text-quicklend-600 font-medium hover:underline">working capital calculator</Link> to check yours.</>,
      schemaAnswer: 'A ratio between 1.5 and 2.0 is considered healthy for most small businesses. Below 1.0 means more liabilities than assets. Above 2.0 suggests excess cash that could be deployed for growth.',
    },
    {
      question: 'How is working capital different from cash flow?',
      answer: <>Working capital is a snapshot of your financial position at a point in time (assets minus liabilities). Cash flow is the movement of money over a period of time (cash in minus cash out during a month or quarter). A business can have positive working capital but negative cash flow if receivables grow faster than collections.</>,
      schemaAnswer: 'Working capital is a snapshot of financial position at a point in time (assets minus liabilities). Cash flow is the movement of money over a period (cash in minus cash out). A business can have positive working capital but negative cash flow.',
    },
    {
      question: 'What is the best way to finance working capital?',
      answer: <>A business <Link href="/business-loans/lines-of-credit" className="text-quicklend-600 font-medium hover:underline">line of credit</Link> is the most efficient option because you only pay interest on what you draw and can reuse the credit as you repay. Other options include invoice factoring for B2B businesses, short-term loans for time-limited needs, and business credit cards for smaller amounts.</>,
      schemaAnswer: 'A business line of credit is the most efficient option because you only pay interest on what you draw. Other options include invoice factoring for B2B businesses, short-term loans for time-limited needs, and business credit cards for smaller amounts.',
    },
    {
      question: 'How much cash reserve should a small business have?',
      answer: <>Three to six months of operating expenses is the standard recommendation. Businesses with stable, recurring revenue can operate closer to 3 months. Seasonal businesses or those with variable income should aim for 6 months. Use our <Link href="/tools/cash-flow-forecast-tool" className="text-quicklend-600 font-medium hover:underline">cash flow forecast tool</Link> to project your needs.</>,
      schemaAnswer: 'Three to six months of operating expenses is the standard recommendation. Businesses with stable revenue can operate closer to 3 months. Seasonal businesses should aim for 6 months.',
    },
    {
      question: 'Does working capital include inventory?',
      answer: <>Yes. Inventory is classified as a current asset because it is expected to be converted to cash within 12 months. However, inventory is less liquid than cash or receivables. A business with $100,000 in working capital mostly in inventory is weaker than one with $100,000 mostly in cash and receivables.</>,
      schemaAnswer: 'Yes. Inventory is a current asset expected to convert to cash within 12 months. However, inventory is less liquid than cash or receivables. Working capital heavy in inventory is weaker than working capital mostly in cash.',
    },
  ],

  'equipment-financing-vs-leasing': [
    {
      question: 'Is it better to lease or finance equipment for a small business?',
      answer: <>It depends on how long you will use the equipment, whether you can benefit from Section 179 tax deductions, and your cash position. Financing is better for long-term equipment that holds value. Leasing is better for technology that becomes obsolete or when you need to preserve cash. Use our <Link href="/tools/equipment-financing-calculator" className="text-quicklend-600 font-medium hover:underline">equipment financing calculator</Link> to compare.</>,
      schemaAnswer: 'It depends on how long you will use the equipment, Section 179 benefits, and your cash position. Financing is better for long-term equipment that holds value. Leasing is better for technology that becomes obsolete or when preserving cash.',
    },
    {
      question: 'What is Section 179 and how does it affect equipment financing?',
      answer: <>Section 179 is an IRS deduction that lets businesses deduct the full purchase price of qualifying equipment in the year of purchase, up to $1.16 million. This only applies to purchased (financed) equipment, not operating leases. For a business in the 32% tax bracket, purchasing $100,000 of equipment saves $32,000 in first-year taxes.</>,
      schemaAnswer: 'Section 179 lets businesses deduct the full purchase price of qualifying equipment in the year of purchase, up to $1.16 million. This applies to purchased equipment, not operating leases. For a business in the 32% bracket, a $100,000 purchase saves $32,000 in first-year taxes.',
    },
    {
      question: 'Can I buy equipment at the end of a lease?',
      answer: <>Yes, most leases include a purchase option. Capital leases often have a $1 buyout. Operating leases typically offer a fair market value purchase option. Some set the buyout at a predetermined residual value. Check buyout terms before signing, as an unfavorable buyout can make leasing more expensive than financing.</>,
      schemaAnswer: 'Yes, most leases include a purchase option. Capital leases often have a $1 buyout. Operating leases offer fair market value purchase options. Check buyout terms before signing.',
    },
    {
      question: 'Do I need good credit to finance equipment?',
      answer: <><Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">Equipment financing</Link> is more accessible than unsecured loans because the equipment serves as collateral. Most lenders require a credit score of 550 to 600 or higher. Businesses with credit above 680 get the best rates (7-12%). Some lenders offer financing with as little as 3 months of business history.</>,
      schemaAnswer: 'Equipment financing is more accessible than unsecured loans because the equipment serves as collateral. Most lenders require credit of 550 to 600 or higher. Credit above 680 gets the best rates. Some lenders finance with as little as 3 months of business history.',
    },
    {
      question: 'How long are typical equipment financing terms?',
      answer: <>Terms range from 2 to 7 years, matched to the equipment's useful life. Computers and software are financed over 2 to 3 years. Vehicles get 3 to 5 year terms. Heavy machinery and commercial equipment can be financed for 5 to 7 years. Longer terms mean lower payments but more total interest. Use our <Link href="/tools/loan-payment-calculator" className="text-quicklend-600 font-medium hover:underline">loan payment calculator</Link> to compare.</>,
      schemaAnswer: 'Terms range from 2 to 7 years, matched to the equipment\'s useful life. Computers get 2 to 3 years. Vehicles get 3 to 5 years. Heavy machinery gets 5 to 7 years. Longer terms mean lower payments but more total interest.',
    },
  ],

  'business-loan-interest-rates-by-type': [
    {
      question: 'What is the average interest rate for a small business loan?',
      answer: <>The average varies by loan type. SBA loans average 8-10% APR. Bank term loans average 9-12%. Online lenders average 15-25%. Equipment financing averages 10-15%. The overall average across all small business lending is roughly 12-18% APR. See the full breakdown in our <Link href="/tools/interest-rate-comparison-chart" className="text-quicklend-600 font-medium hover:underline">interest rate comparison chart</Link>.</>,
      schemaAnswer: 'The average varies by loan type. SBA loans average 8-10% APR. Bank term loans average 9-12%. Online lenders average 15-25%. Equipment financing averages 10-15%. The overall average is roughly 12-18% APR.',
    },
    {
      question: 'What credit score gets the best business loan rates?',
      answer: <>A personal credit score of 720 or higher qualifies for the best rates across all loan types. Between 680 and 719, options are strong but rates may be 1-3 points higher. Below 680, online lenders become the primary option with rates starting around 15% or more.</>,
      schemaAnswer: 'A personal credit score of 720 or higher qualifies for the best rates across all loan types. Between 680 and 719, rates may be 1-3 points higher. Below 680, online lenders become the primary option at 15% or more.',
    },
    {
      question: 'Are SBA loan rates lower than bank rates?',
      answer: <>Generally yes. SBA 504 loans (5.5-7%) are the lowest available. SBA 7(a) loans (8-11%) overlap with bank rates but often come in lower, especially for larger amounts and longer terms. The government guarantee reduces lender risk, which translates to lower rates. The trade-off is more paperwork and longer approval times.</>,
      schemaAnswer: 'Generally yes. SBA 504 loans at 5.5-7% are the lowest available. SBA 7(a) loans at 8-11% overlap with bank rates but often come in lower. The government guarantee reduces lender risk, translating to lower rates for borrowers.',
    },
    {
      question: 'How do I lower my business loan interest rate?',
      answer: <>Five strategies: improve your credit score before applying, offer collateral to secure the loan, show strong and consistent revenue, compare offers from at least 3 lenders, and consider SBA products if you have time. Use our <Link href="/tools/loan-payment-calculator" className="text-quicklend-600 font-medium hover:underline">loan payment calculator</Link> to see how rate changes affect your payment.</>,
      schemaAnswer: 'Five strategies: improve your credit score, offer collateral, show strong revenue, compare offers from at least 3 lenders, and consider SBA products if you have time. You can also negotiate directly with competing offers in hand.',
    },
    {
      question: 'Is a fixed or variable rate better for a business loan?',
      answer: <>Fixed rates provide payment predictability. Variable rates start lower but can increase. For loans under 3 years, variable rates are generally safe. For loans 5+ years, fixed rates protect against rising rates. In a declining rate environment, variable rates work in your favor. Consider your risk tolerance and the loan term when choosing.</>,
      schemaAnswer: 'Fixed rates provide payment predictability. Variable rates start lower but can increase. For loans under 3 years, variable rates are generally safe. For 5+ year loans, fixed rates protect against rising rates.',
    },
  ],

  'sba-loans-7a-vs-504-how-to-qualify': [
    {
      question: 'What is the minimum credit score for an SBA loan?',
      answer: <>There is no official SBA minimum, but most SBA lenders require 680 or higher. Some will consider 650+ with strong compensating factors like high revenue, significant collateral, or long business history. Below 650, improve your credit first and consider online lenders or <Link href="/business-loans/equipment-financing" className="text-quicklend-600 font-medium hover:underline">equipment financing</Link> in the meantime.</>,
      schemaAnswer: 'There is no official SBA minimum, but most lenders require 680 or higher. Some consider 650+ with strong compensating factors. Below 650, improve your credit first and consider online lenders or equipment financing.',
    },
    {
      question: 'How long does it take to get an SBA loan?',
      answer: <>SBA 7(a) loans take 4 to 9 weeks from application to funding. SBA 504 loans take 6 to 13 weeks due to the three-party structure. Working with an SBA Preferred Lender shortens the timeline by 1 to 2 weeks. The most common delay is incomplete documentation. Use our <Link href="/tools/loan-document-checklist" className="text-quicklend-600 font-medium hover:underline">loan document checklist</Link> to prepare.</>,
      schemaAnswer: 'SBA 7(a) loans take 4 to 9 weeks. SBA 504 loans take 6 to 13 weeks. Working with a Preferred Lender shortens the timeline. The most common delay is incomplete documentation.',
    },
    {
      question: 'Can a startup get an SBA loan?',
      answer: <>Yes, but it is harder. Startups need a detailed business plan, financial projections, industry experience in the ownership team, and often a larger down payment (20-30%). SBA microloans (up to $50,000) through nonprofit intermediaries are the most accessible SBA product for startups. Take our <Link href="/tools/funding-readiness-assessment" className="text-quicklend-600 font-medium hover:underline">funding readiness assessment</Link> to check your eligibility.</>,
      schemaAnswer: 'Yes, but it is harder. Startups need a detailed business plan, projections, industry experience, and often a larger down payment. SBA microloans up to $50,000 through nonprofits are the most accessible SBA product for startups.',
    },
    {
      question: 'What is the interest rate on an SBA 7(a) loan?',
      answer: <>SBA 7(a) rates are typically prime rate plus 2.25% to 2.75%, resulting in a current range of roughly 8-11%. Rates can be variable or fixed. The guarantee fee (2-3.75%) is a one-time charge typically rolled into the loan. Calculate payments with our <Link href="/tools/sba-loan-payment-calculator" className="text-quicklend-600 font-medium hover:underline">SBA loan payment calculator</Link>.</>,
      schemaAnswer: 'SBA 7(a) rates are prime rate plus 2.25% to 2.75%, currently roughly 8-11%. Rates can be variable or fixed. The guarantee fee of 2-3.75% is a one-time charge typically rolled into the loan.',
    },
    {
      question: 'What is the difference between SBA 7(a) and 504 loans?',
      answer: <>The 7(a) is more flexible: it covers working capital, equipment, real estate, acquisitions, and refinancing. The 504 is restricted to fixed assets (real estate, major equipment) but offers lower fixed rates on the CDC portion (5.5-7%). The 504 has a three-party structure and job creation requirements. Choose 7(a) for flexibility, 504 for the lowest rate on a major purchase.</>,
      schemaAnswer: 'The 7(a) covers working capital, equipment, real estate, acquisitions, and refinancing. The 504 is restricted to fixed assets but offers lower rates (5.5-7%) on the CDC portion. Choose 7(a) for flexibility, 504 for the lowest rate on major purchases.',
    },
  ],

  'should-you-refinance-your-business-loan': [
    {
      question: 'How soon can I refinance a business loan?',
      answer: <>There is no universal waiting period, but check your current loan's prepayment penalty and whether your financial profile has improved enough for better terms. Many businesses refinance 6 to 12 months after the original loan. Use our <Link href="/tools/refinance-savings-calculator" className="text-quicklend-600 font-medium hover:underline">refinance savings calculator</Link> to see if it makes sense now.</>,
      schemaAnswer: 'There is no universal waiting period. Check your prepayment penalty and whether your profile has improved. Many businesses refinance 6 to 12 months after the original loan once credit or revenue has improved.',
    },
    {
      question: 'Can I refinance an SBA loan?',
      answer: <>Yes. SBA loans can be refinanced through another SBA loan, a bank loan, or an online lender. If refinancing SBA debt with a new SBA loan, the refinance must provide a "substantial benefit" (typically a 10%+ reduction in monthly payment). SBA 7(a) loans with 15+ year terms have prepayment penalties during the first 3 years.</>,
      schemaAnswer: 'Yes. SBA loans can be refinanced through another SBA loan, bank loan, or online lender. SBA-to-SBA refinancing must provide a substantial benefit, typically a 10%+ payment reduction. SBA 7(a) loans with 15+ year terms have penalties during the first 3 years.',
    },
    {
      question: 'Does refinancing a business loan hurt my credit?',
      answer: <>The application creates a hard inquiry (2-5 point temporary drop). However, if refinancing lowers your payment and improves debt ratios, the long-term effect is positive. Closing the old account and opening a new one may briefly affect credit mix, but this recovers within a few months.</>,
      schemaAnswer: 'The application creates a hard inquiry causing a temporary 2-5 point drop. If refinancing improves your debt ratios, the long-term credit effect is positive. Brief credit mix changes recover within a few months.',
    },
    {
      question: 'What credit score do I need to refinance a business loan?',
      answer: <>Credit requirements match the new loan product. SBA refinancing requires 680+. Bank refinancing needs 680+. Online lenders may refinance at 580+. To make refinancing worthwhile, your credit should be meaningfully better than when you took the original loan. Use our <Link href="/tools/prepayment-penalty-calculator" className="text-quicklend-600 font-medium hover:underline">prepayment penalty calculator</Link> to check your current loan's payoff terms.</>,
      schemaAnswer: 'Requirements match the new loan product: SBA needs 680+, banks need 680+, online lenders accept 580+. Your credit should be meaningfully better than when you took the original loan for refinancing to be worthwhile.',
    },
    {
      question: 'How long does it take to refinance a business loan?',
      answer: <>Online lenders can close in 1 to 5 days. Banks take 1 to 4 weeks. SBA refinancing takes 4 to 10 weeks. The process is similar to a new loan application: documentation, underwriting, and closing where the old loan is paid from the new loan proceeds.</>,
      schemaAnswer: 'Online lenders close in 1 to 5 days. Banks take 1 to 4 weeks. SBA refinancing takes 4 to 10 weeks. The process is similar to a new loan application with documentation, underwriting, and closing.',
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
