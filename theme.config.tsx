import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Image from 'next/image'

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Image 
        src="/assets/full-logo.svg" 
        alt="BrowserLess Logo" 
        width={120} 
        height={30}
        priority
      />
    </div>
  ),
  project: {
    link: 'https://github.com/browserless',
  },
  chat: {
    link: 'https://discord.com/browserless',
  },
  docsRepositoryBase: 'https://github.com/browserless/docs',
  footer: {
    text: '© 2025 BrowserLess - سرویس استخراج داده از وب بدون مرورگر',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  direction: 'ltr',
  head: (
    <>
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-title" content="BrowserLess" />
      <meta name="application-name" content="BrowserLess" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – BrowserLess',
      defaultTitle: 'BrowserLess - استخراج داده از وب بدون مرورگر',
      description: 'سرویس حرفه‌ای استخراج و اتوماسیون داده از آمازون و وب‌سایت‌ها',
      openGraph: {
        type: 'website',
        locale: 'fa_IR',
        siteName: 'BrowserLess'
      }
    }
  },
}

export default config
