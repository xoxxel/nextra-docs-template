/**
 * Hero Section Animation System
 * Recreates the Vite landing page hero diagram animation
 * Uses GSAP for smooth animations and SVG manipulation
 */

// ============================================
// Configuration & Constants
// ============================================

// Input paths (7 different paths for file nodes)
const inputPaths = [
    'M843.505 284.659L752.638 284.659C718.596 284.659 684.866 280.049 653.251 271.077L598.822 255.629L0.675021 1.00011',
    'M843.505 298.181L724.342 297.36C708.881 297.36 693.45 296.409 678.22 294.518L598.822 284.659C592.82 284.659 200.538 190.002 0.675028 164.892',
    'M843.505 311.703L701.108 310.061L598.822 305.136L0.675049 256.071',
    'M843.505 325.224L598.822 326.002L0.675049 321.858',
    'M843.505 338.746L701.108 340.388L598.822 345.442L0.675038 387.646',
    'M843.505 352.268L724.342 353.088C708.881 353.088 693.45 354.039 678.22 355.93L598.822 365.789L0.675067 478.825',
    'M843.505 365.789L752.638 365.789C718.596 365.789 684.866 370.399 653.251 379.372L598.822 394.82L0.675049 642.717',
];

// Output path
const outputPath = 'M843.463 1.3315L245.316 5.47507L0.633077 4.69725';

// File sets that can appear on input lines
const inputFileSets = [
    [
        { label: '.jsx', color: null },
        { label: '.sass', color: null },
        { label: '.svelte', color: '#ff8d67' },
    ],
    [
        { label: '.tsx', color: null },
        { label: '.scss', color: null },
        { label: '.vue', color: '#40b782' },
    ],
    [
        { label: '.js', color: null },
        { label: '.styl', color: null },
        { label: '.svelte', color: '#ff8d67' },
    ],
    [
        { label: '.ts', color: null },
        { label: '.less', color: null },
        { label: '.vue', color: '#40b782' },
    ],
    [
        { label: '.mts', color: null },
        { label: '.html', color: null },
        { label: '.json', color: null },
    ],
];

// Output labels
const outputLabels = ['.html', '.css', '.js'];

// State management
let animationRunning = false;
let animationTimeout = null;
let timeline = null;
let inputNodesCache = [];
let outputNodesCache = [];

// ============================================
// SVG Node Class
// ============================================

/**
 * Represents a single animated node (dot with glow and label) on an SVG path
 */
class SvgNode {
    constructor(pathString, dotColor = '#9fe6fd', glowColor = '#41D1FF') {
        this.pathString = pathString;
        this.dotColor = dotColor;
        this.glowColor = glowColor;
        this.pathId = `path-${Math.random().toString(36).substr(2, 9)}`;
        
        // State
        this.position = 0;
        this.visible = false;
        this.labelVisible = false;
        this.label = '';
        
        // DOM elements
        this.path = null;
        this.circle = null;
        this.text = null;
        this.maskCircle = null;
        this.gradient = null;
        
        this._initialize();
    }

    _initialize() {
        // Create group element
        this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // Create path with gradient mask
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('d', this.pathString);
        this.path.setAttribute('stroke', `url(#glow_gradient_${this.pathId})`);
        this.path.setAttribute('stroke-width', '1.2');
        this.path.setAttribute('mask', `url(#glow_mask_${this.pathId})`);
        this.path.classList.add('svg-path');
        
        // Create dot (circle)
        this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle.setAttribute('r', this.visible ? 3 : 0);
        this.circle.setAttribute('fill', this.dotColor);
        this.circle.classList.add('circle-dot');
        this.circle.setAttribute('style', `--dot-color: ${this.dotColor}`);
        
        // Create label text
        this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.text.setAttribute('fill', '#a3a3a3');
        this.text.setAttribute('font-family', 'Inter, sans-serif');
        this.text.setAttribute('font-size', '11px');
        this.text.setAttribute('font-style', 'normal');
        this.text.setAttribute('font-weight', '400');
        this.text.setAttribute('text-anchor', 'middle');
        this.text.setAttribute('alignment-baseline', 'hanging');
        this.text.classList.add('label');
        
        // Create defs for mask and gradient
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Create mask
        const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
        mask.setAttribute('id', `glow_mask_${this.pathId}`);
        
        const maskPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        maskPath.setAttribute('d', this.pathString);
        maskPath.setAttribute('fill', 'black');
        
        this.maskCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.maskCircle.setAttribute('r', this.visible ? 30 : 0);
        this.maskCircle.setAttribute('fill', 'white');
        
        mask.appendChild(maskPath);
        mask.appendChild(this.maskCircle);
        
        // Create radial gradient
        this.gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        this.gradient.setAttribute('id', `glow_gradient_${this.pathId}`);
        this.gradient.setAttribute('r', this.visible ? 30 : 0);
        this.gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', this.glowColor);
        stop1.setAttribute('stop-opacity', '1');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', this.glowColor);
        stop2.setAttribute('stop-opacity', '0');
        
        this.gradient.appendChild(stop1);
        this.gradient.appendChild(stop2);
        
        defs.appendChild(mask);
        defs.appendChild(this.gradient);
        
        // Assemble group
        this.group.appendChild(defs);
        this.group.appendChild(this.path);
        this.group.appendChild(this.circle);
        this.group.appendChild(this.text);
    }

    /**
     * Get the SVG path element (temporary for length calculation)
     */
    _getTempPath() {
        const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tempPath.setAttribute('d', this.pathString);
        return tempPath;
    }

    /**
     * Update the node's position on the path
     */
    updatePosition() {
        const tempPath = this._getTempPath();
        const svg = document.getElementById('input-svg');
        svg.appendChild(tempPath);
        const pathLength = tempPath.getTotalLength();
        const { x, y } = tempPath.getPointAtLength((1 - this.position) * pathLength);
        svg.removeChild(tempPath);
        
        // Update circle position
        this.circle.setAttribute('cx', x);
        this.circle.setAttribute('cy', y);
        
        // Update text position
        this.text.setAttribute('x', x);
        this.text.setAttribute('y', y + 15);
        this.text.textContent = this.label;
        if (this.labelVisible) {
            this.text.classList.add('label--visible');
        } else {
            this.text.classList.remove('label--visible');
        }
        
        // Update mask circle
        this.maskCircle.setAttribute('cx', x);
        this.maskCircle.setAttribute('cy', y);
        
        // Update gradient
        this.gradient.setAttribute('cx', x);
        this.gradient.setAttribute('cy', y);
    }

    /**
     * Animate the node visibility
     */
    animateVisibility(duration = 0.5) {
        return gsap.to(this, {
            duration,
            ease: 'power2.inOut',
        });
    }

    /**
     * Append the node to an SVG element
     */
    appendTo(svgElement) {
        svgElement.appendChild(this.group);
    }
}

// ============================================
// Output Node Class
// ============================================

/**
 * Represents an output node on the output path
 */
class OutputNode extends SvgNode {
    constructor() {
        super(outputPath, '#d499ff', '#BD34FE');
    }

    updatePosition() {
        const tempPath = this._getTempPath();
        const svg = document.getElementById('output-svg');
        svg.appendChild(tempPath);
        const pathLength = tempPath.getTotalLength();
        const { x, y } = tempPath.getPointAtLength((1 - this.position) * pathLength);
        svg.removeChild(tempPath);
        
        // Update circle position
        this.circle.setAttribute('cx', x);
        this.circle.setAttribute('cy', y);
        
        // Update text position
        this.text.setAttribute('x', x);
        this.text.setAttribute('y', y + 15);
        this.text.textContent = this.label;
        if (this.labelVisible) {
            this.text.classList.add('label--visible');
        } else {
            this.text.classList.remove('label--visible');
        }
        
        // Update mask circle
        this.maskCircle.setAttribute('cx', x);
        this.maskCircle.setAttribute('cy', y);
        
        // Update gradient
        this.gradient.setAttribute('cx', x);
        this.gradient.setAttribute('cy', y);
    }

    appendTo(svgElement) {
        svgElement.appendChild(this.group);
    }
}

// ============================================
// Animation Functions
// ============================================

/**
 * Create input lines in the SVG
 */
function createInputLines() {
    const svg = document.getElementById('input-svg');
    
    // Create path lines
    inputPaths.forEach(pathData => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', 'url(#base_gradient)');
        path.setAttribute('stroke-width', '1.2');
        path.setAttribute('style', 'opacity: 0.8');
        svg.appendChild(path);
    });
}

/**
 * Create output line in the SVG
 */
function createOutputLine() {
    const svg = document.getElementById('output-svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', outputPath);
    path.setAttribute('stroke', 'url(#output_gradient)');
    path.setAttribute('stroke-width', '1.2');
    svg.appendChild(path);
}

/**
 * Animate a single input node for desktop
 */
function animateSingleInputDesktop(inputNode) {
    const timeline = gsap.timeline();

    // Reset position
    timeline.set(inputNode, { position: 0 }, 0);

    // Animate in
    timeline.to(
        inputNode,
        {
            position: Math.random() * 0.1 + 0.4,
            duration: 1,
            ease: 'expo.out',
            onUpdate: () => inputNode.updatePosition(),
        },
        0
    );

    // Show dot
    timeline.set(inputNode, { visible: true }, 0);
    timeline.call(() => {
        inputNode.circle.setAttribute('r', 3);
        inputNode.maskCircle.setAttribute('r', 30);
        inputNode.gradient.setAttribute('r', 30);
    }, null, 0);

    // Show label
    timeline.set(inputNode, { labelVisible: true }, 0.2);
    timeline.call(() => {
        inputNode.text.classList.add('label--visible');
    }, null, 0.2);

    // Animate out
    timeline.to(
        inputNode,
        {
            position: 1,
            duration: 1.2,
            ease: 'power3.in',
            onUpdate: () => inputNode.updatePosition(),
        },
        1.2
    );

    // Hide label
    timeline.set(inputNode, { labelVisible: false }, 1.6);
    timeline.call(() => {
        inputNode.text.classList.remove('label--visible');
    }, null, 1.6);

    // Hide dot
    timeline.set(inputNode, { visible: false }, 1.9);
    timeline.call(() => {
        gsap.to([inputNode.circle, inputNode.maskCircle, inputNode.gradient], {
            attr: { r: 0 },
            duration: 0.3,
        }, 1.85);
    }, null, 1.9);

    return timeline;
}

/**
 * Animate a single input node for mobile
 */
function animateSingleInputMobile(inputNode) {
    const timeline = gsap.timeline();

    // Reset position
    timeline.set(inputNode, { position: 0 }, 0);

    // Show dot
    timeline.set(inputNode, { visible: true }, 0);
    timeline.call(() => {
        inputNode.circle.setAttribute('r', 3);
        inputNode.maskCircle.setAttribute('r', 30);
        inputNode.gradient.setAttribute('r', 30);
    }, null, 0);

    // Animate
    timeline.to(
        inputNode,
        {
            position: 1,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => inputNode.updatePosition(),
        },
        0
    );

    // Hide dot
    timeline.set(inputNode, { visible: false }, 0.5);
    timeline.call(() => {
        gsap.to([inputNode.circle, inputNode.maskCircle, inputNode.gradient], {
            attr: { r: 0 },
            duration: 0.3,
        }, 0.45);
    }, null, 0.5);

    return timeline;
}

/**
 * Animate a single output node for desktop
 */
function animateSingleOutputDesktop(outputNode, index) {
    const timeline = gsap.timeline();

    // Reset
    timeline.set(outputNode, { position: 0 }, 0);

    // Animate in
    timeline.to(
        outputNode,
        {
            position: (0.7 / 3) * (index + 1) + 0.05,
            duration: 1.5,
            ease: 'expo.out',
            onUpdate: () => outputNode.updatePosition(),
        },
        0
    );

    // Show dot
    timeline.set(outputNode, { visible: true }, 0);
    timeline.call(() => {
        outputNode.circle.setAttribute('r', 3);
        outputNode.maskCircle.setAttribute('r', 30);
        outputNode.gradient.setAttribute('r', 30);
    }, null, 0);

    // Show label
    timeline.set(outputNode, { labelVisible: true }, 0.4);
    timeline.call(() => {
        outputNode.text.classList.add('label--visible');
    }, null, 0.4);

    // Animate out
    timeline.to(
        outputNode,
        {
            position: 1,
            duration: 1.5,
            ease: 'power3.in',
            onUpdate: () => outputNode.updatePosition(),
        },
        2
    );

    // Hide label
    timeline.set(outputNode, { labelVisible: false }, 2.5);
    timeline.call(() => {
        outputNode.text.classList.remove('label--visible');
    }, null, 2.5);

    // Hide dot
    timeline.set(outputNode, { visible: false }, 3);
    timeline.call(() => {
        gsap.to([outputNode.circle, outputNode.maskCircle, outputNode.gradient], {
            attr: { r: 0 },
            duration: 0.3,
        }, 2.95);
    }, null, 3);

    return timeline;
}

/**
 * Animate a single output node for mobile
 */
function animateSingleOutputMobile(outputNode) {
    const timeline = gsap.timeline();

    // Reset
    timeline.set(outputNode, { position: 0 }, 0);

    // Animate in
    timeline.to(
        outputNode,
        {
            position: 0.7,
            duration: 2,
            ease: 'power1.inOut',
            onUpdate: () => outputNode.updatePosition(),
        },
        0.3
    );

    // Show dot
    timeline.set(outputNode, { visible: true }, 0.75);
    timeline.call(() => {
        outputNode.circle.setAttribute('r', 3);
        outputNode.maskCircle.setAttribute('r', 30);
        outputNode.gradient.setAttribute('r', 30);
    }, null, 0.75);

    // Hide dot
    timeline.set(outputNode, { visible: false }, 1.2);
    timeline.call(() => {
        gsap.to([outputNode.circle, outputNode.maskCircle, outputNode.gradient], {
            attr: { r: 0 },
            duration: 0.3,
        }, 1.15);
    }, null, 1.2);

    return timeline;
}

/**
 * Prepare input nodes by selecting random file set and paths
 */
function prepareInputNodes() {
    const inputFileSet = inputFileSets[Math.floor(Math.random() * inputFileSets.length)];
    const selectedPaths = new Set();
    
    while (selectedPaths.size < 3) {
        selectedPaths.add(Math.floor(Math.random() * inputPaths.length));
    }
    
    const inputNodes = [];
    let fileIndex = 0;
    
    for (const pathIndex of selectedPaths) {
        const file = inputFileSet[fileIndex];
        const node = new SvgNode(
            inputPaths[pathIndex],
            file.color || '#9fe6fd',
            file.color || '#41D1FF'
        );
        node.label = file.label;
        inputNodes.push(node);
        fileIndex++;
    }
    
    return inputNodes;
}

/**
 * Main animation function
 */
async function animateDiagram() {
    if (animationRunning) return;
    animationRunning = true;

    // Clean up previous timeline
    if (timeline) {
        timeline.kill();
    }

    const isMobile = window.innerWidth < 768;
    
    // Prepare input nodes
    const inputNodes = prepareInputNodes();
    const inputSvg = document.getElementById('input-svg');
    
    // Clear previous nodes
    const previousNodes = inputSvg.querySelectorAll('g');
    previousNodes.forEach(node => node.remove());
    
    // Recreate input lines
    createInputLines();
    
    // Add input nodes
    inputNodes.forEach(node => node.appendTo(inputSvg));
    
    // Create output nodes
    const outputSvg = document.getElementById('output-svg');
    const previousOutputNodes = outputSvg.querySelectorAll('g');
    previousOutputNodes.forEach(node => node.remove());
    
    createOutputLine();
    
    const outputNodes = outputLabels.map(label => {
        const node = new OutputNode();
        node.label = label;
        node.appendTo(outputSvg);
        return node;
    });

    // Build master timeline
    timeline = gsap.timeline({
        onComplete: () => {
            animationRunning = false;
            animationTimeout = setTimeout(animateDiagram, isMobile ? 3000 : 2000);
        },
    });

    // Animate input nodes
    inputNodes.forEach((node, index) => {
        const animation = isMobile
            ? animateSingleInputMobile(node)
            : animateSingleInputDesktop(node);
        timeline.add(animation, index * (isMobile ? 0.4 : 0.2));
    });

    // Illuminate logo and background
    const viteChip = document.getElementById('vite-chip');
    const background = document.getElementById('hero-background');

    timeline.call(() => {
        viteChip.classList.add('active');
    }, null, isMobile ? '>-2' : '>-0.2');
    
    timeline.call(() => {
        background.classList.add('active');
    }, null, '<-0.3');

    // Animate output nodes
    const outputLabel = isMobile ? '>-0.3' : 'showOutput+=' + (isMobile ? 0.3 : 0.1);
    timeline.addLabel('showOutput', '<');
    
    outputNodes.forEach((node, index) => {
        const animation = isMobile
            ? animateSingleOutputMobile(node)
            : animateSingleOutputDesktop(node, index);
        timeline.add(animation, 'showOutput+=' + (isMobile ? 0.3 : 0.1) * index);
    });

    // Desktop only: disable background before looping
    if (!isMobile) {
        timeline.call(() => {
            background.classList.remove('active');
        }, null, '>-1');
        
        timeline.set({}, {}, '+=0.2');
    }
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Use IntersectionObserver to start animation when element enters viewport
    const diagram = document.getElementById('hero-diagram');
    
    if (diagram) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationRunning) {
                    observer.unobserve(diagram);
                    animateDiagram();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(diagram);
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (timeline) {
        timeline.kill();
    }
    if (animationTimeout) {
        clearTimeout(animationTimeout);
    }
});

console.log('✅ Hero Section Animation Loaded');
