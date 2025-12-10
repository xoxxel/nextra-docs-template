import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <meta name="description" content="BrowserLess - سرویس استخراج داده از وب بدون مرورگر | وب اسکرپینگ و اتوماسیون داده‌های آمازون، eBay و سایر فروشگاه‌های آنلاین" />
        <meta name="keywords" content="استخراج داده از آمازون, web scraping, browserless scraping, استخراج محتوا, اتوماسیون وب, n8n automation, API استخراج داده, headless browser, وب اسکرپینگ فارسی, استخراج قیمت محصولات" />
        <meta name="author" content="BrowserLess" />
        <meta property="og:title" content="BrowserLess - استخراج داده از وب بدون مرورگر" />
        <meta property="og:description" content="پلتفرم حرفه‌ای استخراج و اتوماسیون داده از وب. استخراج آسان محتوا از آمازون، eBay و سایر وب‌سایت‌ها بدون نیاز به مرورگر" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/full-logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BrowserLess - استخراج داده از وب" />
        <meta name="twitter:description" content="سرویس حرفه‌ای وب اسکرپینگ و استخراج داده از آمازون و فروشگاه‌های آنلاین" />
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
