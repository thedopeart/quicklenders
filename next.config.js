/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Internal links pointed at business-loan slugs that don't exist. Map the
      // 3 slug typos to their real pages; sba-loans has no page, so send it to
      // the SBA guide. (Source links are also corrected; these cover cache/externals.)
      { source: '/business-loans/asset-based-lending', destination: '/business-loans/asset-backed-loans', permanent: true },
      { source: '/business-loans/line-of-credit', destination: '/business-loans/lines-of-credit', permanent: true },
      { source: '/business-loans/esop-financing', destination: '/business-loans/esop', permanent: true },
      { source: '/business-loans/sba-loans', destination: '/financial-insights/sba-504-loan-guide', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/terms-of-use', destination: '/terms-of-service', permanent: true },
      // Old WordPress article URL redirects
      { source: '/small-business-equipment-financing', destination: '/financial-insights/small-business-equipment-financing', permanent: true },
      { source: '/first-time-business-loans', destination: '/financial-insights/first-time-business-loans', permanent: true },
      { source: '/how-to-improve-credit-fast', destination: '/financial-insights/how-to-improve-credit-fast', permanent: true },
      { source: '/invoice-financing', destination: '/financial-insights/invoice-financing', permanent: true },
      { source: '/pre-seed-funding', destination: '/financial-insights/pre-seed-funding', permanent: true },
      { source: '/secured-vs-unsecured-loans-which-is-better', destination: '/financial-insights/secured-vs-unsecured-loans-which-is-better', permanent: true },
      { source: '/short-term-business-financing', destination: '/financial-insights/short-term-business-financing', permanent: true },
      { source: '/long-term-business-loans', destination: '/financial-insights/long-term-business-loans', permanent: true },
      { source: '/how-to-get-vc-financing', destination: '/financial-insights/how-to-get-vc-financing', permanent: true },
      { source: '/online-loans-for-poor-credit-score', destination: '/financial-insights/online-loans-for-poor-credit-score', permanent: true },
      { source: '/no-collateral-business-loan', destination: '/financial-insights/no-collateral-business-loan', permanent: true },
      { source: '/bootstrapping-finance', destination: '/financial-insights/bootstrapping-finance', permanent: true },
      { source: '/venture-capital-funding-from-investors', destination: '/financial-insights/venture-capital-funding-from-investors', permanent: true },
      { source: '/invoice-factoring-loans', destination: '/financial-insights/invoice-factoring-loans', permanent: true },
      { source: '/large-business-loans', destination: '/financial-insights/large-business-loans', permanent: true },
      { source: '/direct-lender-loans-online', destination: '/financial-insights/direct-lender-loans-online', permanent: true },
      { source: '/first-time-personal-loans-with-no-credit-history', destination: '/financial-insights/first-time-personal-loans-with-no-credit-history', permanent: true },
      { source: '/how-to-get-a-startup-business-loan-with-bad-credit', destination: '/financial-insights/how-to-get-a-startup-business-loan-with-bad-credit', permanent: true },
      { source: '/cash-loans-direct', destination: '/financial-insights/cash-loans-direct', permanent: true },
      { source: '/veteran-loan-for-small-business', destination: '/financial-insights/veteran-loan-for-small-business', permanent: true },
    ]
  },
}

module.exports = nextConfig
