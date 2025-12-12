// مسیرهای SVG برای خطوط درخشان
const SVG_PATHS = [
    "M1.00048 119.402L200.243 68.2732C213.283 65.4129 221.832 58.4923 221.832 50.7968V20.323V1",
    "M1.00048 136.779L231.212 68.7423C242.847 65.5523 250.195 59.0356 250.195 51.9076V20.323V1",
    "M1 165.731L263.267 69.1267C272.82 65.6348 278.558 59.7587 278.558 53.4667V20.323V1",
    "M719.001 154.23L464.019 69.1276C454.474 65.6348 448.743 59.7616 448.743 53.4731V20.323V1",
    "M719.001 125.219L496.078 68.7439C484.449 65.5528 477.106 59.0377 477.106 51.9119V20.323V1",
    "M719 107.817L527.05 68.2749C514.015 65.4134 505.469 58.4939 505.469 50.8001V20.323V1",
    "M719.001 96.2159L557.314 67.8323C543.291 65.2673 533.835 58.0756 533.835 49.976V20.323V9.78386C533.835 4.93267 529.902 1 525.051 1",
    "M1 107.817L169.982 67.8308C184.008 65.2668 193.467 58.0743 193.467 49.9735V20.323V9.78387C193.467 4.93267 197.4 1 202.251 1",
    "M306.924 1V20.323V55.7423C306.924 60.7337 303.306 65.5207 296.865 69.0509L62.8139 197.336C52.968 202.733 46.8471 213.068 46.8471 224.296V240.342",
    "M335.286 1V20.323V59.0919C335.286 62.0155 334.043 64.8989 331.656 67.5136L213.175 197.282C208.003 202.947 205.136 210.34 205.136 218.011V240.342",
    "M363.65 1V20.323L363.428 206.088V240.342",
    "M392.015 1V20.323V59.1056C392.015 62.0204 393.25 64.8954 395.624 67.5041L513.712 197.291C518.862 202.951 521.716 210.328 521.716 217.981V240.342",
    "M420.377 1V20.323V55.7518C420.377 60.7376 423.987 65.5197 430.415 69.0489L664.058 197.332C673.893 202.732 680.005 213.061 680.005 224.28V240.342"
];

// کلاس برای ایجاد نودهای درخشان متحرک
class SvgGlowNode {
    constructor(path, svgGroup, reverse = false) {
        this.path = path;
        this.svgGroup = svgGroup;
        this.reverse = reverse;
        this.position = 0;
        this.visible = false;
        this.glowColor = '#13B351';
        this.gradientWidth = 30;
        this.gradientWidthScaleFactor = 0;
        this.dotRadius = 0;
        
        this.pathElement = null;
        this.circleElement = null;
        this.maskElement = null;
        this.gradientElement = null;
        
        this.init();
    }
    
    init() {
        const pathId = Math.random().toString(36).substring(7);
        const NS = 'http://www.w3.org/2000/svg';
        
        // ایجاد path
        this.pathElement = document.createElementNS(NS, 'path');
        this.pathElement.setAttribute('d', this.path);
        this.pathElement.setAttribute('stroke', `url(#glow_gradient_${pathId})`);
        this.pathElement.setAttribute('stroke-width', '1.2');
        this.pathElement.setAttribute('mask', `url(#glow_mask_${pathId})`);
        
        // ایجاد دایره
        this.circleElement = document.createElementNS(NS, 'circle');
        this.circleElement.setAttribute('r', '0');
        this.circleElement.setAttribute('fill', '#9fe6fd');
        
        // ایجاد defs
        const defs = document.createElementNS(NS, 'defs');
        
        // ایجاد mask
        const mask = document.createElementNS(NS, 'mask');
        mask.setAttribute('id', `glow_mask_${pathId}`);
        
        const maskPath = document.createElementNS(NS, 'path');
        maskPath.setAttribute('d', this.path);
        maskPath.setAttribute('fill', 'black');
        
        this.maskElement = document.createElementNS(NS, 'circle');
        this.maskElement.setAttribute('r', '0');
        this.maskElement.setAttribute('fill', 'white');
        
        mask.appendChild(maskPath);
        mask.appendChild(this.maskElement);
        
        // ایجاد gradient
        this.gradientElement = document.createElementNS(NS, 'radialGradient');
        this.gradientElement.setAttribute('id', `glow_gradient_${pathId}`);
        this.gradientElement.setAttribute('gradientUnits', 'userSpaceOnUse');
        
        const stop1 = document.createElementNS(NS, 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', this.glowColor);
        stop1.setAttribute('stop-opacity', '1');
        
        const stop2 = document.createElementNS(NS, 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', this.glowColor);
        stop2.setAttribute('stop-opacity', '0');
        
        this.gradientElement.appendChild(stop1);
        this.gradientElement.appendChild(stop2);
        
        defs.appendChild(mask);
        defs.appendChild(this.gradientElement);
        
        // اضافه کردن به DOM
        this.svgGroup.appendChild(defs);
        this.svgGroup.appendChild(this.pathElement);
        this.svgGroup.appendChild(this.circleElement);
    }
    
    updatePosition(position) {
        this.position = position;
        const pathLength = this.pathElement.getTotalLength();
        const actualPosition = this.reverse ? position * pathLength : (1 - position) * pathLength;
        const point = this.pathElement.getPointAtLength(actualPosition);
        
        this.circleElement.setAttribute('cx', point.x);
        this.circleElement.setAttribute('cy', point.y);
        this.maskElement.setAttribute('cx', point.x);
        this.maskElement.setAttribute('cy', point.y);
        
        this.gradientElement.setAttribute('cx', point.x);
        this.gradientElement.setAttribute('cy', point.y);
        this.gradientElement.setAttribute('r', this.gradientWidth * this.gradientWidthScaleFactor);
    }
    
    setVisible(visible) {
        this.visible = visible;
        const targetScale = visible ? 1 : 0;
        const targetRadius = visible ? 3 : 0;
        
        this.animate(this, 'gradientWidthScaleFactor', targetScale, 500);
        this.animate(this, 'dotRadius', targetRadius, 600);
    }
    
    animate(obj, property, target, duration) {
        const start = obj[property];
        const change = target - start;
        const startTime = performance.now();
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutQuad(progress);
            
            obj[property] = start + (change * eased);
            
            if (property === 'gradientWidthScaleFactor') {
                this.maskElement.setAttribute('r', this.gradientWidth * obj[property]);
            } else if (property === 'dotRadius') {
                this.circleElement.setAttribute('r', obj[property]);
            }
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
}

// کلاس اصلی انیمیشن کارت
class CICardAnimation {
    constructor() {
        this.card = document.querySelector('#continuous-integration');
        this.visualization = document.querySelector('.feature__visualization');
        this.checkmarks = Array.from(document.querySelectorAll('.checkmark'));
        this.glowNodes = [];
        this.isAnimating = false;
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        // ایجاد نودهای درخشان برای هر مسیر
        const glowLineGroups = document.querySelectorAll('.glow-line');
        SVG_PATHS.forEach((path, index) => {
            const reverse = index >= 8; // مسیرهای پایینی (عمودی) معکوس هستند
            const node = new SvgGlowNode(path, glowLineGroups[index], reverse);
            this.glowNodes.push(node);
        });
        
        // ثبت رویدادها
        this.card.addEventListener('mouseenter', () => this.startAnimation());
        this.card.addEventListener('click', () => this.startAnimation());
        
        // انیمیشن خودکار در موبایل
        if (window.innerWidth < 768) {
            this.setupMobileAnimation();
        }
    }
    
    setupMobileAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5 && !this.hasAnimated) {
                    setTimeout(() => this.startAnimation(), 300);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(this.card);
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.hasAnimated = true;
        this.visualization.classList.add('active');
        
        // انیمیشن خطوط درخشان
        this.animateGlowLines();
        
        // انیمیشن چک مارک‌ها
        setTimeout(() => this.animateCheckmarks(), 1300);
    }
    
    animateGlowLines() {
        const duration = 1500;
        const startTime = performance.now();
        
        // نمایش خطوط
        setTimeout(() => {
            this.glowNodes.forEach(node => node.setVisible(true));
        }, 200);
        
        // انیمیشن حرکت
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInQuad(progress);
            
            this.glowNodes.forEach(node => {
                node.updatePosition(eased);
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // مخفی کردن خطوط بعد از اتمام
                setTimeout(() => {
                    this.glowNodes.forEach(node => node.setVisible(false));
                }, 100);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    animateCheckmarks() {
        this.checkmarks.forEach((checkmark, index) => {
            setTimeout(() => {
                checkmark.classList.add('active');
            }, index * 200);
        });
    }
    
    easeInQuad(t) {
        return t * t;
    }
}

// شروع انیمیشن بعد از لود کامل صفحه
window.addEventListener('DOMContentLoaded', () => {
    new CICardAnimation();
    console.log('✅ CI Card Animation Ready');
});
