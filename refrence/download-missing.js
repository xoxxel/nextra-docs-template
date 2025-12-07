const fs = require('fs');
const path = require('path');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('brand-logos.json', 'utf8'));

// Create main directory for logos
const mainDir = 'brand-logos-svg';
if (!fs.existsSync(mainDir)) {
  fs.mkdirSync(mainDir, { recursive: true });
}

// Download function using fetch API
async function downloadFile(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
  } catch (error) {
    throw error;
  }
}

// Check which brands are missing
function getMissingBrands() {
  const missing = [];
  for (const brand of data.brands) {
    if (brand.logos.length === 0) continue;
    
    const brandDirName = brand.domain.replace(/\./g, '_').replace(/\//g, '_');
    const brandDir = path.join(mainDir, brandDirName);
    
    if (!fs.existsSync(brandDir)) {
      missing.push(brand);
    }
  }
  return missing;
}

// Process each brand
async function downloadMissingLogos() {
  const missingBrands = getMissingBrands();
  
  console.log(`\n🔍 Found ${missingBrands.length} brands to download...\n`);
  
  if (missingBrands.length === 0) {
    console.log('✅ All brands are already downloaded!\n');
    return;
  }
  
  let downloadedCount = 0;
  let errorCount = 0;
  
  for (const brand of missingBrands) {
    // Create directory for this brand
    const brandDirName = brand.domain.replace(/\./g, '_').replace(/\//g, '_');
    const brandDir = path.join(mainDir, brandDirName);
    
    if (!fs.existsSync(brandDir)) {
      fs.mkdirSync(brandDir, { recursive: true });
    }
    
    // Save brand info
    const brandInfo = {
      name: brand.brandName,
      domain: brand.domain,
      category: brand.category,
      logoCount: brand.logos.length,
      logos: brand.logos
    };
    fs.writeFileSync(
      path.join(brandDir, 'info.json'),
      JSON.stringify(brandInfo, null, 2)
    );
    
    console.log(`\n📁 ${brand.brandName} (${brand.domain})`);
    
    // Download each logo
    for (let i = 0; i < brand.logos.length; i++) {
      const logo = brand.logos[i];
      const type = (logo.type || 'logo').replace(/[\/\s]+/g, '-');
      const theme = (logo.theme || 'default').replace(/[\/\s]+/g, '-');
      const filename = `logo-${i + 1}-${type}-${theme}.svg`.toLowerCase();
      const filepath = path.join(brandDir, filename);
      
      try {
        await downloadFile(logo.url, filepath);
        const stats = fs.statSync(filepath);
        downloadedCount++;
        console.log(`  ✓ Downloaded: ${filename} (${(stats.size / 1024).toFixed(2)} KB)`);
      } catch (error) {
        errorCount++;
        console.error(`  ✗ Failed: ${filename} - ${error.message}`);
      }
      
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('DOWNLOAD SUMMARY:');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✅ Successfully downloaded: ${downloadedCount} logos`);
  console.log(`❌ Failed: ${errorCount} logos`);
  console.log(`📂 Saved in: ./${mainDir}/`);
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log(`🎉 Done! Missing brands have been downloaded.\n`);
}

downloadMissingLogos().catch(console.error);
