# Vixora Studio — Web Design & Development

**Vixora** is an elite web design and development studio obsessed with digital craft. Vixora rejects templates to build custom, bespoke web experiences tailored to each brand's identity, audience, and growth goals.

This website is a highly interactive, premium portfolio and studio landing page that demonstrates state-of-the-art WebGL rendering, custom animations, and immersive scrolling effects.

---

## 🚀 Key Interactive Highlights

* **Two-Gate Preloader**: 
  * A loading screen that tracks progress up to 100% (Gate A).
  * Automatically coordinates with the loading event of the Spline 3D model iframe (Gate B) before executing the entry animation.
* **Spline 3D Hero Integration**:
  * Features an interactive 3D robot concept centered in the sticky hero section.
  * Automatically pauses WebGL execution when the hero section scrolls out of view to optimize CPU/GPU performance.
* **Typing Service Unfold Cards**:
  * Expandable cards that reveal service capabilities with a character-by-character typing animation.
  * Includes a simulated typing cursor that blinks and fades out once the text is fully rendered.
* **Theme-Aware Floating Navigation**:
  * A sticky navigation bar that uses an `IntersectionObserver` to dynamically shift between dark and light color themes depending on the background of the section currently in view.
* **3D Tilt & Shadow Effects**:
  * Dynamic, real-time mouse-tracking tilt effect with shifting box-shadows applied via event delegation for maximum performance.
* **Paper Stack Parallax**:
  * Stacked layout elements that slide at differing speeds on scroll to create depth.
* **Project Card Rotate-Settle**:
  * Staggered entrance animations where project items swing and rotate slightly before settling into their grid positions.

---

## 🛠️ Technology Stack

* **Structure**: Semantic HTML5 markup (modular multi-page structure: `index`, `about`, `services`, `work`, `contact`, `lab`).
* **Styling**: Vanilla CSS3, custom CSS variables, theme classes, and layout utilities.
* **Interactivity & Logic**: Vanilla JavaScript (ES6+), optimized for speed and lifecycle events.
* **3D & Animation Engines (Loaded via CDN)**:
  * [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) — Central animation driver.
  * [ScrollTrigger](https://greensock.com/scrolltrigger/) — Scroll-bound motion control.
  * [Lenis Smooth Scroll](https://lenis.darkroom.engineering/) — Inertial scroll smoothing.
  * [Spline 3D Viewer](https://spline.design/) — Real-time WebGL interactive 3D model.

---

## 📂 Project Structure

```text
Vixora/
├── index.html        # Landing page with sticky 3D hero
├── about.html        # Studio philosophy, team details, and stats
├── services.html     # Capabilities with expandable typing cards
├── work.html         # Portfolio grid with filter controls
├── contact.html      # Interactive contact form with floating labels
├── lab.html          # Experimental interactive components
├── shared.js         # Global navigation/footer injection and animation setup
├── style.css         # Main stylesheet with layout grid and components
├── texture.css       # Core styling for background gradients and patterns
└── README.md         # Project documentation (this file)
```

---

## 🏁 Getting Started

To run the project locally, you can open any HTML file directly, but using a local server is recommended to ensure smooth iframe loading and script execution:

### 1. Python Local Server
Run this command in the project directory:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### 2. Node.js Local Server
Run this command:
```bash
npx serve .
```
Then visit the URL printed in the terminal.
