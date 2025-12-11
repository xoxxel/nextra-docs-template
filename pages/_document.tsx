import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <meta name="description" content="BrowserLess - استخراج داده از دیجیکالا، دیوار، ترب، آمازون، eBay و 50+ سایت دیگر | وب اسکرپینگ حرفه‌ای بدون مرورگر" />
        <meta name="keywords" content="استخراج از دیجیکالا, استخراج از دیوار, استخراج از ترب, استخراج داده از آمازون, web scraping amazon, ebay data extraction, digikala scraper, divar api, torob crawler, استخراج قیمت محصولات, اتوماسیون دیجیکالا, instagram scraping, youtube data api, github api, spotify scraper, netflix data, airbnb extraction, booking scraper, google maps api, stackoverflow crawler, twitter scraping, linkedin data, n8n automation, headless browser, وب اسکرپینگ فارسی, browserless scraping" />
        <meta name="author" content="BrowserLess" />
        <meta property="og:title" content="BrowserLess - استخراج از دیجیکالا، آمازون، دیوار و 50+ سایت" />
        <meta property="og:description" content="پلتفرم حرفه‌ای استخراج داده از فروشگاه‌های آنلاین ایرانی و خارجی. استخراج از دیجیکالا، دیوار، ترب، آمازون، eBay و سایر وب‌سایت‌ها" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/full-logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BrowserLess - استخراج داده از دیجیکالا و آمازون" />
        <meta name="twitter:description" content="سرویس حرفه‌ای وب اسکرپینگ از فروشگاه‌های ایرانی و خارجی: دیجیکالا، دیوار، ترب، آمازون، eBay و بیشتر" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://browserless.ir" />
        <link rel="icon" type="image/x-icon" href="/assets/logo.ico" />
        <link rel="icon" type="image/svg+xml" href="/assets/icon-site.svg" />
        <link rel="apple-touch-icon" href="/assets/icon-site.svg" />
        <link rel="stylesheet" href="/landing/style.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="/landing/script.js"></script>
      </body>
    </Html>
  )
}
