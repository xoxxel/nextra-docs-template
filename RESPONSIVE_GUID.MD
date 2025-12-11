# Vite Hero Section - Responsive Design Guide

## 📋 نسخه کامل پیاده‌سازی برای تمام صفحات

این مستند تشریح می‌کند چگونه نسخه اصلی Vite hero section برای تمام اندازه‌های صفحه optimized شده است.

---

## 🎯 معماری کلی

### ساختار HTML
```
.hero
├── .container (محتوای top - title, buttons, etc.)
└── .hero__diagram (SVG diagram + Vite chip)
```

### لایه‌های Z-Index
- `.hero__background` → `z-index: -1` (پس‌زمینه)
- `.hero__diagram` → `z-index: 1` (diagram)
- `.vite-chip` → `z-index: 4` (chip مرکزی)
- `.container` → `z-index: 2` (محتوا)

---

## 📱 Breakpoints و responsive design

### 1️⃣ **Desktop (1500px+)**
```css
/* Hero Diagram */
- width: 1630px (fixed width)
- height: 700px
- margin: -100px auto 0
- position: relative (in normal flow)

/* Vite Chip */
- position: absolute
- left: 50% (relative to .hero__diagram)
- top: 45% (45% از ارتفاع diagram)
- transform: translate(-50%, -50%) scale(0.85)
- width: 134px
- height: 134px

/* SVG Elements */
- opacity: 0.8 (input lines)
- .circle-dot: display block (نمایش labels)
- .label: display block (نمایش file extensions)

/* Animation */
- Desktop timings: input (0.2s intervals), output (0.1s intervals)
- Loops every 2 seconds
```

### 2️⃣ **Tablet (768px - 1500px)**
```css
/* Hero Diagram */
- width: 1630px (still 1630px, but centered)
- transform: translate3d(-50%, 0, 0) (center horizontally)
- height: 700px

/* Vite Chip */
- Same as desktop (left: 50%, top: 45%)
- Still scale(0.85)

/* Animation */
- Desktop animation (same as 1500px)
```

### 3️⃣ **Mobile (< 768px)**
```css
/* Hero Diagram */
- width: 1630px (بدون تغییر)
- left: 50%
- transform: translate3d(-50%, 0, 0) scale(0.6) ⭐ KEY
- height: 400px (کاهش شده)
- overflow: hidden (قطع شدن اضافی)

/* Vite Chip */
- width: 100px (کاهش شده از 134px)
- height: 100px
- left: 50% (relative positioning حفظ شده)
- top: 45% (نسبت به diagram)
- transform: translate(-50%, -50%) scale(0.85)

/* SVG Elements */
- opacity: 0.6 (کاهش برای وضوح بیشتر)
- .circle-dot: display block (عادی)
- .label: display none ⭐ (هیچ برچسبی - جا نیست)

/* Indicators */
- opacity: 0 (مخفی ولی space را اشغال می‌کنند)
- visibility: hidden

/* Animation */
- Mobile timings: سریع‌تر (0.4s intervals)
- سادگی‌تر: فقط movement، بدون labels
- Input animation: 1.8s duration (slower)
- Output animation: simplified
```

---

## 🔍 تفاوت‌های کلیدی

### Mobile Scale Factor
```
Desktop:  transform: scale(1)        [100% size]
Tablet:   transform: scale(1)        [100% size]
Mobile:   transform: scale(0.6)      [60% size] ⭐
```

**دلیل:** diagram خیلی بزرگ است برای موبایل (1630px)، بنابراین scale(0.6) آن را قابل مشاهده می‌کند.

### Vite Chip Sizing
```
Desktop/Tablet:  134x134px
Mobile:          100x100px (کوچک‌تر)
```

### Labels Display
```
Desktop:  display: block (برچسب‌ها نمایش داده می‌شوند)
Mobile:   display: none  (جا نیست)
```

---

## 🎬 Animation Differences

### Desktop Animation Loop (2s)
```
1. Input nodes animate in                    (0-1s)
2. Stagger input animations                  (0.2s intervals)
3. Illuminate Vite chip & background         (0.8s)
4. Output nodes animate in                   (0.8-2s)
5. Loop restarts
```

### Mobile Animation Loop (3s)
```
1. Input nodes animate in                    (0-1.8s)
2. Stagger input animations                  (0.4s intervals - بیشتر)
3. Illuminate Vite chip                      (0.5s - کمتر منتظر)
4. Output nodes animate in                   (simplified)
5. Loop restarts (بیشتر delay)
```

---

## 📊 Background (Hero Background)

### Desktop (768px+)
```css
.hero__background {
    position: absolute  (NOT fixed - نسبی به .hero)
    opacity: 0.1        (کم برای desktop)
    background: noise + radial-gradient
    mask-image: radial-gradient
}

.hero__background.active {
    opacity: 0.7        (مرئی بیشتر هنگام animation)
}
```

### Mobile (< 768px)
```css
.hero__background {
    opacity: 0.4        (بیشتر برای موبایل)
}

.hero__background.active {
    opacity: 0.4        (بدون تغییر در موبایل)
}
```

---

## 🛠️ Critical CSS Properties

### شاخص‌های مهم برای اصلاح:

1. **Hero Diagram Transform**
   ```css
   @media (max-width: 768px) {
       .hero__diagram {
           transform: translate3d(-50%, 0, 0) scale(0.6); /* ⭐ KEY */
       }
   }
   ```

2. **Vite Chip Positioning**
   ```css
   .vite-chip {
       left: 50%;
       top: 45%; /* NOT 50% - کمی بالاتر برای center درست */
       transform: translate(-50%, -50%) scale(0.85);
   }
   ```

3. **Mobile Label Hidden**
   ```css
   @media (max-width: 768px) {
       .label {
           display: none !important; /* برچسب‌ها مخفی */
       }
   }
   ```

4. **Mobile SVG Opacity**
   ```css
   @media (max-width: 768px) {
       .input-lines {
           opacity: 0.6; /* کاهش برای وضوح */
       }
   }
   ```

---

## ✅ Checklist برای Responsive Implementation

- [ ] Desktop layout: 1630px width diagram
- [ ] Tablet layout: same as desktop but centered
- [ ] Mobile layout: diagram with scale(0.6)
- [ ] Vite chip: always at left: 50%, top: 45%
- [ ] Labels: hidden on mobile
- [ ] Background: different opacity levels
- [ ] Animation: different timings for mobile
- [ ] SVG: opacity adjusted for mobile
- [ ] Indicators: opacity 0 but space reserved

---

## 🔄 Animation Flow Timing

### Desktop Timeline
```
0.0s → Input nodes start
0.2s → Input node 1
0.4s → Input node 2
0.6s → Input node 3
0.8s → Vite chip active + background active
1.0s → Output nodes start
2.0s → Loop restart
```

### Mobile Timeline
```
0.0s → Input nodes start
0.4s → Input node 1 (more spaced)
0.8s → Input node 2
1.2s → Input node 3
1.7s → Vite chip active
3.0s → Loop restart (slower)
```

---

## 📝 نکات تکمیلی

### چرا scale(0.6) برای موبایل؟
- Diagram 1630px عرض دارد
- در موبایل معمولاً 375px عرض است
- 0.6 scale = 978px width (متناسب)

### چرا opacity متفاوت است؟
- Desktop: زمینه‌ی ظریف (0.1)
- Mobile: زمینه‌ی برجسته‌تر (0.4) برای contrast بیشتر

### چرا animation در موبایل سریع‌تر است؟
- کاربران موبایل صبور نیستند
- Interactions سریع‌تر باید باشند
- 0.4s stagger vs 0.2s stagger

---

## 🎯 اهداف طراحی

1. **Desktop**: نمایش تمام جزئیات (labels، indicators، animations)
2. **Tablet**: همان desktop اما centered
3. **Mobile**: ساده‌تر، سریع‌تر، compact

---

## 📚 فایل‌های مرتبط

- `hero-section.css` - تمام styling
- `hero-section.js` - animations
- `index.html` - structure
- نسخه اصلی: `/workspaces/vite/docs/.vitepress/theme/components/landing/1. hero-section/`
