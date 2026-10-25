# Fomi — Product Thinking Document (Part B Deliverable)

**Track Chosen:** `1. Image Generation Workspace` (with integrated Relighting, Optical Controls & Version Lineage)  
**Tech Stack:** Next.js (App Router), JavaScript (`.js`/`.jsx`), Tailwind CSS, CSS Modules  

---

## 1. What problem were you trying to solve? What type of user did you design for?

### Target User Persona
We designed **Fomi Director Studio** for a signed-in, returning **professional Art Director, Brand Photographer, or Commercial Visual Creator** (e.g., *Clara*, shooting an *Autumn Cashmere Lookbook*) who spends **4 to 6 hours every day** inside Fomi producing cohesive visual campaigns.

### The Core Problem: "The Slot-Machine Prompt Paradox"
Current AI image generators (Midjourney, OpenArt, Leonardo, Higgsfield) treat image creation like a linear chat feed or a slot machine:
1. **Identity & Aesthetic Drift Across a Campaign:** When a creator tweaks a 90-word prompt to change the camera angle or lighting direction for Shot #2 of a lookbook, the model accidentally alters the subject's facial structure, sweater weave, or color palette.
2. **Clumsy Text-Based Spatial Control:** Describing 3D lighting angles (*"45-degree warm key light from top-left with subtle rim highlight"*) in prose is slow, imprecise, and unnatural for visual thinkers.
3. **Chronological Feed Fatigue:** After 100+ generations in a multi-hour session, scrolling through an endless vertical feed makes it nearly impossible to compare two subtle takes side-by-side or trace *which exact prompt adjustment* improved skin micro-texture.

---

## 2. What are the three most important UX decisions you made? Why?

### Decision 1: Visual DNA Lock Pills (`@Clara.v4`, `@85mm-MasterPrime`, `@WarmCashmere`)
- **What we built:** A persistent **Visual DNA Bar** directly above the composer that extracts Subject Identity (`Seed #482914`), Optical Prime Lens (`85mm f/1.4`), Color Science (`#F6ECE7`), and Lighting Rig into toggleable semantic pills.
- **Why:** It decouples **persistent campaign constants** from **per-shot scene direction**. Instead of copy-pasting 100-word prompt soup on every take, the creator locks the character and lens once, then types short, surgical directions (*"turn 15° left, softer north window fill"*).

### Decision 2: Interactive 2D Key-Light Radar Pad & Kelvin Color Science
- **What we built:** A tactile 2D lighting radar pad in the right-hand Director Inspector where dragging the virtual sun/key-light orb dynamically relights the canvas and adjusts Kelvin color temperature (`3200K Tungsten` ↔ `5200K Gallery` ↔ `7500K Cool Sky`).
- **Why:** Professional photographers think with their hands and eyes, not prompt adjectives. Direct 2D spatial manipulation embodies *"Power should feel effortless."*

### Decision 3: Prompt-Delta Version Lineage & Split A/B Loupe Inspector
- **What we built:** Instead of repeating full paragraphs in a chat history, our left panel displays a **Version Lineage Tree** (`v1.0` → `v1.4` → `v2.0 Hero ★`) showing only the **Prompt Delta** (`+ 45° directional key light + warm cashmere micro-contrast`), paired with a draggable **Split A/B Loupe** in the center stage.
- **Why:** Inspired by Cursor's code diffs and Capture One's photo culling, professionals need to immediately see *what changed* between two iterations and wipe A vs. B pixel-for-pixel before exporting.

---

## 3. Which features did you intentionally leave out? Why?

1. **Spaghetti Node Graphs (ComfyUI-style wires):** While node graphs offer raw flexibility, exposing KSamplers, VAE decoders, and conditioning wires creates high cognitive overhead. We translated those capabilities into photographic metaphors (Optics, Lighting Rig, Visual DNA).
2. **Public Community Feeds & Gamified Upsell Banners Inside the Workspace:** When a creator is 4 hours into a client campaign, social feeds and blinking "30% OFF" badges create visual clutter. *The workspace is the hero—not the marketing page.*
3. **Cryptic Low-Level Diffusion Sliders (Sampler names, CFG step counts):** As foundation models improve over the next few years, manual step-count tuning becomes obsolete. Every control in Fomi maps to a visual outcome.

---

## 4. Which existing products inspired your thinking? What did you like, and what would you improve?

| Product | What We Liked | What We Improved in Fomi |
| :--- | :--- | :--- |
| **Krea.ai & Magnific** | Immediate canvas focus, real-time tactile feedback, darkroom aesthetic. | Added **Version Lineage Deltas** and **A/B Split Loupe** so iterations never overwrite previous states or lose history. |
| **Higgsfield & OpenArt** | Bottom floating prompt dock ergonomics and character reference concepts. | Removed top navigation bloat/marketing badges and introduced **Visual DNA Lock Pills** + **2D Key Light Pad**. |
| **Figma & Cursor** | `@context` token pills, keyboard-first flow, and instant diff inspection. | Brought Cursor's `@context` mental model into visual creation (`@Clara.v4`, `@85mm-MasterPrime`). |

---

## 5. If you had another month to work on this product, what would you improve?

1. **Depth-Aware 3D Relighting & Layer Decomposition:** Automatically separating foreground subject, wardrobe, and gallery background into depth layers so moving the 2D Key Light casts physically accurate occlusion shadows.
2. **Real-Time WebGPU Draft Preview:** Running a lightweight local distilled model via WebGPU so dragging the 2D lighting orb renders a 30fps structural preview before committing to 4K cloud synthesis.
3. **Multiplayer Art Direction & Client Review Links:** Live Figma-style cursors and frame annotations on the Contact Sheet so clients can approve selects directly inside the workspace.

---

## 6. What is the single feature or workflow you believe differentiates your workspace from existing AI creative platforms?

**The "Visual DNA + Delta Lineage" Directorial Loop:**  
Existing AI generators treat every generation as an isolated text prompt from scratch. **Fomi Director Studio** treats creation as a **stateful photographic shoot**. By locking **Visual DNA Tokens** at the project level and pairing them with a **Tactile 2D Lighting Pad** and **Prompt-Delta Lineage Tree**, a professional can shoot 20 consistent campaign angles in minutes—turning AI generation from a slot machine into a deterministic creative instrument.
