const API_KEY = 'MvUeyVV3VzwgNboyO8sIbGkqchkEIvC-Qo77LWYA6cCY0vnrrYDBJnH62xiom3TPEaed1S3aC92lrrOsuT-5NA';
const fs = require('fs');

// Brand domains to fetch - Comprehensive list
const brands = [
  // Financial & Crypto
  { name: 'Binance', domain: 'binance.com', category: 'Crypto' },
  { name: 'Coinbase', domain: 'coinbase.com', category: 'Crypto' },
  
  // E-commerce & Dropshipping
  { name: 'Amazon', domain: 'amazon.com', category: 'E-commerce' },
  { name: 'eBay', domain: 'ebay.com', category: 'E-commerce' },
  { name: 'Shopify', domain: 'shopify.com', category: 'E-commerce' },
  { name: 'AliExpress', domain: 'aliexpress.com', category: 'Dropshipping' },
  { name: 'Alibaba', domain: 'alibaba.com', category: 'Dropshipping' },
  { name: 'Etsy', domain: 'etsy.com', category: 'E-commerce' },
  { name: 'WooCommerce', domain: 'woocommerce.com', category: 'E-commerce' },
  { name: 'Walmart', domain: 'walmart.com', category: 'E-commerce' },
  { name: 'Target', domain: 'target.com', category: 'E-commerce' },
  { name: 'Wish', domain: 'wish.com', category: 'E-commerce' },
  { name: 'Shein', domain: 'shein.com', category: 'E-commerce' },
  
  // Content Creation & Design
  { name: 'Figma', domain: 'figma.com', category: 'Design' },
  { name: 'Medium', domain: 'medium.com', category: 'Content' },
  
  // Social Media
  { name: 'Facebook', domain: 'facebook.com', category: 'Social Media' },
  { name: 'Instagram', domain: 'instagram.com', category: 'Social Media' },
  { name: 'Twitter (X)', domain: 'twitter.com', category: 'Social Media' },
  { name: 'TikTok', domain: 'tiktok.com', category: 'Social Media' },
  { name: 'YouTube', domain: 'youtube.com', category: 'Social Media' },
  { name: 'LinkedIn', domain: 'linkedin.com', category: 'Social Media' },
  { name: 'Pinterest', domain: 'pinterest.com', category: 'Social Media' },
  { name: 'WhatsApp', domain: 'whatsapp.com', category: 'Messaging' },
  { name: 'Reddit', domain: 'reddit.com', category: 'Social Media' },
  { name: 'Threads', domain: 'threads.net', category: 'Social Media' },
  { name: 'Twitch', domain: 'twitch.tv', category: 'Streaming' },
  
  // Gaming & Entertainment
  { name: 'Steam', domain: 'steampowered.com', category: 'Gaming' },
  { name: 'PlayStation', domain: 'playstation.com', category: 'Gaming' },
  { name: 'Xbox', domain: 'xbox.com', category: 'Gaming' },
  { name: 'Epic Games', domain: 'epicgames.com', category: 'Gaming' },
  { name: 'Roblox', domain: 'roblox.com', category: 'Gaming' },
  { name: 'Netflix', domain: 'netflix.com', category: 'Entertainment' },
  { name: 'Spotify', domain: 'spotify.com', category: 'Music' },
  { name: 'Apple Music', domain: 'music.apple.com', category: 'Music' },
  { name: 'SoundCloud', domain: 'soundcloud.com', category: 'Music' },
  { name: 'Deezer', domain: 'deezer.com', category: 'Music' },
  
  // App Stores & Platforms
  { name: 'Google Play', domain: 'play.google.com', category: 'Platform' },
  { name: 'App Store', domain: 'apps.apple.com', category: 'Platform' },
  { name: 'Microsoft Store', domain: 'microsoft.com', category: 'Platform' },
  
  // Domain & Hosting
  { name: 'GoDaddy', domain: 'godaddy.com', category: 'Domain & Hosting' },
  { name: 'Namecheap', domain: 'namecheap.com', category: 'Domain & Hosting' },
  
  // Development & Code
  { name: 'GitHub', domain: 'github.com', category: 'Development' },
  { name: 'GitLab', domain: 'gitlab.com', category: 'Development' },
  { name: 'Stack Overflow', domain: 'stackoverflow.com', category: 'Development' },
  
  // Transportation
  { name: 'Google Maps', domain: 'maps.google.com', category: 'Maps' },
  
  // Education & Learning
  { name: 'Coursera', domain: 'coursera.org', category: 'Education' },
  { name: 'Udemy', domain: 'udemy.com', category: 'Education' },
  
  // Travel & Booking
  { name: 'Airbnb', domain: 'airbnb.com', category: 'Travel' },
  { name: 'Booking.com', domain: 'booking.com', category: 'Travel' },
  { name: 'Expedia', domain: 'expedia.com', category: 'Travel' },
  { name: 'TripAdvisor', domain: 'tripadvisor.com', category: 'Travel' },
  { name: 'Skyscanner', domain: 'skyscanner.com', category: 'Travel' }
];


async function fetchBrandLogo(domain, brandName, category, retryCount = 0) {
  const url = `https://api.brandfetch.io/v2/brands/${domain}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    
    if (response.status === 429 && retryCount < 3) {
      // Rate limit hit, wait longer and retry
      const waitTime = (retryCount + 1) * 5000; // 5s, 10s, 15s
      console.log(`⏳ ${brandName}: Rate limited, waiting ${waitTime/1000}s...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return fetchBrandLogo(domain, brandName, category, retryCount + 1);
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract SVG logos
    const svgLogos = data.logos?.filter(logo => logo.formats?.some(f => f.format === 'svg')) || [];
    
    const result = {
      brandName,
      category,
      domain,
      svgCount: svgLogos.length,
      logos: []
    };
    
    svgLogos.forEach((logo, index) => {
      const svgFormat = logo.formats.find(f => f.format === 'svg');
      if (svgFormat) {
        result.logos.push({
          url: svgFormat.src,
          type: logo.type || 'N/A',
          theme: logo.theme || 'N/A'
        });
      }
    });
    
    console.log(`✓ ${brandName} (${category}): ${svgLogos.length} SVG logos`);
    return result;
    
  } catch (error) {
    console.error(`✗ ${brandName}: ${error.message}`);
    return { 
      brandName, 
      category,
      domain, 
      error: error.message,
      svgCount: 0,
      logos: []
    };
  }
}

// Fetch all brands and save to file
async function fetchAllBrands() {
  console.log(`\n🚀 Starting to fetch ${brands.length} brand logos...\n`);
  
  const results = [];
  const summary = {};
  
  for (const brand of brands) {
    const result = await fetchBrandLogo(brand.domain, brand.name, brand.category);
    results.push(result);
    
    // Update category summary
    if (!summary[brand.category]) {
      summary[brand.category] = { count: 0, totalLogos: 0 };
    }
    summary[brand.category].count++;
    summary[brand.category].totalLogos += result.svgCount;
    
    // Longer delay to avoid rate limiting (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Prepare output data
  const output = {
    generatedAt: new Date().toISOString(),
    totalBrands: brands.length,
    totalLogos: results.reduce((sum, r) => sum + r.svgCount, 0),
    categorySummary: summary,
    brands: results
  };
  
  // Save to JSON file
  const jsonFilename = 'brand-logos.json';
  fs.writeFileSync(jsonFilename, JSON.stringify(output, null, 2));
  console.log(`\n✅ Saved to ${jsonFilename}`);
  
  // Save to readable text file
  const txtFilename = 'brand-logos.txt';
  let txtContent = '═══════════════════════════════════════════════════════════\n';
  txtContent += '           BRAND LOGOS SVG COLLECTION\n';
  txtContent += '═══════════════════════════════════════════════════════════\n';
  txtContent += `Generated: ${new Date().toLocaleString()}\n`;
  txtContent += `Total Brands: ${brands.length}\n`;
  txtContent += `Total SVG Logos: ${output.totalLogos}\n`;
  txtContent += '═══════════════════════════════════════════════════════════\n\n';
  
  // Group by category
  const categorized = {};
  results.forEach(brand => {
    if (!categorized[brand.category]) {
      categorized[brand.category] = [];
    }
    categorized[brand.category].push(brand);
  });
  
  Object.keys(categorized).sort().forEach(category => {
    txtContent += `\n━━━ ${category.toUpperCase()} ━━━\n\n`;
    
    categorized[category].forEach(brand => {
      txtContent += `${brand.brandName}\n`;
      txtContent += `Domain: ${brand.domain}\n`;
      txtContent += `SVG Logos: ${brand.svgCount}\n`;
      
      if (brand.logos.length > 0) {
        brand.logos.forEach((logo, idx) => {
          txtContent += `  ${idx + 1}. ${logo.url}\n`;
          txtContent += `     Type: ${logo.type} | Theme: ${logo.theme}\n`;
        });
      } else if (brand.error) {
        txtContent += `  Error: ${brand.error}\n`;
      }
      txtContent += '\n';
    });
  });
  
  fs.writeFileSync(txtFilename, txtContent);
  console.log(`✅ Saved to ${txtFilename}`);
  
  // Print summary
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('SUMMARY BY CATEGORY:');
  console.log('═══════════════════════════════════════════════════════════');
  Object.keys(summary).sort().forEach(cat => {
    console.log(`${cat}: ${summary[cat].count} brands, ${summary[cat].totalLogos} logos`);
  });
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`\n🎉 Done! Check ${jsonFilename} and ${txtFilename} for complete results.\n`);
}

fetchAllBrands();