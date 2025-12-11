// فریمورک‌ها و ابزارها
const frameworks = [
    { name: 'Vitest', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/vitest.svg', color: 'rgba(250, 197, 43, 0.4)', url: 'https://vitest.dev/' },
    { name: 'React', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/react.svg', color: 'rgba(0, 214, 253, 0.4)', url: 'https://react.dev/' },
    { name: 'Angular', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/angular.svg', color: 'rgba(224, 50, 55, 0.4)', url: 'https://angular.dev/' },
    { name: 'Vue', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/vue.svg', color: 'rgba(64, 183, 130, 0.4)', url: 'https://vuejs.org/' },
    { name: 'Solid', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/solid.svg', color: 'rgba(117, 178, 223, 0.4)', url: 'https://www.solidjs.com/' },
    { name: 'Svelte', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/svelte.svg', color: 'rgba(253, 62, 0, 0.4)', url: 'https://svelte.dev/' },
    { name: 'Preact', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/preact.svg', color: 'rgba(103, 58, 184, 0.4)', url: 'https://preactjs.com/' },
    { name: 'Astro', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/astro.svg', color: 'rgba(255, 255, 255, 0.4)', url: 'https://astro.build' },
    { name: 'Remix', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/remix.svg', color: 'rgba(57, 145, 253, 0.4)', url: 'https://remix.run/' },
    { name: 'Nuxt', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/nuxt.svg', color: 'rgba(0, 218, 129, 0.4)', url: 'https://nuxt.com' },
    { name: 'Qwik', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/qwik.svg', color: 'rgba(24, 181, 244, 0.4)', url: 'https://qwik.dev/' },
    { name: 'Redwood', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/redwood.svg', color: 'rgba(190, 70, 34, 0.4)', url: 'https://redwoodjs.com/' },
    { name: 'Analog', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/analog.svg', color: 'rgba(193, 15, 46, 0.4)', url: 'https://analogjs.org/' },
    { name: 'Playwright', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/playwright.svg', color: 'rgba(212, 82, 71, 0.4)', url: 'https://playwright.dev/' },
    { name: 'Storybook', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/storybook.svg', color: 'rgba(253, 70, 132, 0.4)', url: 'https://storybook.js.org/' },
    { name: 'Marko', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/marko.svg', color: 'rgba(222, 42, 135, 0.4)', url: 'https://markojs.com/' },
    { name: 'Laravel', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/laravel.svg', color: 'rgba(235, 68, 50, 0.4)', url: 'https://laravel.com/' },
    { name: 'AdonisJS', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/adonis.svg', color: 'rgba(90, 69, 255, 0.4)', url: 'https://adonisjs.com/' },
    { name: 'EmberJS', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/ember.svg', color: 'rgba(224, 78, 57, 0.4)', url: 'https://emberjs.com/' },
    { name: 'Hono', logo: '../../docs/.vitepress/theme/components/landing/3. frameworks-section/images/hono.svg', color: 'rgba(255, 92, 19, 0.4)', url: 'https://hono.dev/' },
];

let screenWidth = window.innerWidth;

// محاسبه تعداد بلوک‌ها در هر ردیف
function getNumBlocksPerRow() {
    return Math.floor(screenWidth / (96 + 24));
}

// محاسبه تعداد بلوک‌های خالی در هر طرف
function getPaddedBlocksPerSide() {
    if (screenWidth < 840) return 0;
    if (screenWidth < 1280) return 1;
    if (screenWidth < 1600) return 2;
    return Math.max(Math.floor((screenWidth - 840) / 280), 0);
}

// محاسبه تعداد فریمورک‌ها در هر ردیف
function getNumFrameworksPerRow() {
    return getNumBlocksPerRow() - getPaddedBlocksPerSide() * 2;
}

// محاسبه تعداد ردیف‌های مورد نیاز
function getNumRows() {
    return Math.ceil(frameworks.length / getNumFrameworksPerRow());
}

// ایجاد کارت فریمورک
function createFrameworkCard(framework = null, index = 0) {
    const card = document.createElement(framework ? 'a' : 'div');
    card.className = 'framework-card';
    
    if (framework) {
        card.style.setProperty('--glow-color', framework.color);
        card.href = framework.url || '#';
        card.target = '_blank';
        card.rel = 'noopener';
        
        const img = document.createElement('img');
        img.src = framework.logo;
        img.alt = framework.name;
        img.loading = 'lazy';
        img.onerror = function() {
            console.error('Failed to load:', framework.name, framework.logo);
        };
        card.appendChild(img);
        
        // انیمیشن ظاهر شدن
        setTimeout(() => {
            card.classList.add('active');
        }, index * 50);
    } else {
        card.classList.add('empty');
        setTimeout(() => {
            card.classList.add('active');
        }, index * 50);
    }
    
    return card;
}

// ساخت گرید فریمورک‌ها
function buildFrameworksGrid() {
    const container = document.querySelector('.frameworks-container');
    container.innerHTML = '';
    
    const numBlocksPerRow = getNumBlocksPerRow();
    const paddedBlocksPerSide = getPaddedBlocksPerSide();
    const numFrameworksPerRow = getNumFrameworksPerRow();
    const numRows = getNumRows();
    
    let frameworkIndex = 0;
    
    // ردیف بالایی (خالی)
    const topRow = document.createElement('div');
    topRow.className = 'framework-row';
    for (let i = 0; i < numBlocksPerRow + 2; i++) {
        topRow.appendChild(createFrameworkCard(null, i));
    }
    container.appendChild(topRow);
    
    // ردیف‌های فریمورک‌ها
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        const row = document.createElement('div');
        row.className = 'framework-row';
        
        const isLastRow = rowIndex === numRows - 1;
        const remainingFrameworks = frameworks.length % numFrameworksPerRow;
        const lastRowPadding = isLastRow && remainingFrameworks > 0
            ? Math.floor((numFrameworksPerRow - remainingFrameworks) / 2)
            : 0;
        
        for (let colIndex = 0; colIndex < numBlocksPerRow + 2; colIndex++) {
            const isInCenterZone = colIndex >= paddedBlocksPerSide + 1 &&
                                   colIndex < numBlocksPerRow + 2 - paddedBlocksPerSide - 1;
            
            if (isInCenterZone) {
                const adjustedCol = colIndex - paddedBlocksPerSide - 1;
                
                if (isLastRow && (adjustedCol < lastRowPadding || adjustedCol >= lastRowPadding + remainingFrameworks)) {
                    row.appendChild(createFrameworkCard(null, frameworkIndex));
                } else if (frameworkIndex < frameworks.length) {
                    row.appendChild(createFrameworkCard(frameworks[frameworkIndex], frameworkIndex));
                    frameworkIndex++;
                } else {
                    row.appendChild(createFrameworkCard(null, frameworkIndex));
                }
            } else {
                row.appendChild(createFrameworkCard(null, frameworkIndex));
            }
        }
        
        container.appendChild(row);
    }
    
    // ردیف پایینی (خالی)
    const bottomRow = document.createElement('div');
    bottomRow.className = 'framework-row';
    for (let i = 0; i < numBlocksPerRow + 2; i++) {
        bottomRow.appendChild(createFrameworkCard(null, i));
    }
    container.appendChild(bottomRow);
}

// مدیریت تغییر اندازه صفحه
let resizeTimeout = null;
function handleResize() {
    screenWidth = window.innerWidth;
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        buildFrameworksGrid();
    }, 100);
}

// اجرای اولیه
buildFrameworksGrid();

// گوش دادن به تغییر اندازه
window.addEventListener('resize', handleResize);

// Intersection Observer برای انیمیشن ورود
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.framework-card:not(.active)');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 50);
            });
        }
    });
}, { threshold: 0.3 });

observer.observe(document.getElementById('frameworks-section'));

console.log('✅ Frameworks Section Script Loaded');
console.log(`📱 Screen width: ${screenWidth}px`);
console.log(`📊 Blocks per row: ${getNumBlocksPerRow()}`);
console.log(`🎯 Frameworks per row: ${getNumFrameworksPerRow()}`);
console.log(`📋 Number of rows: ${getNumRows()}`);
