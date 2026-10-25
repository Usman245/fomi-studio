"use client";

import React, { useState } from "react";
import { FomiLogo } from "@/components/icons/FomiIcons";

export default function ProductThinkingView({
  onSwitchToPartA,
  onSwitchToPartB,
}) {
  const [vercelUrl, setVercelUrl] = useState("https://fomi-workspace.vercel.app");

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#FCFAF8] text-[#1D1917] pb-20">
      {/* Sticky Top Header (Hidden when printing PDF) */}
      <header className="print:hidden sticky top-0 z-30 bg-[#FCFAF8]/90 backdrop-blur-md border-b border-[#EBE0DA] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FomiLogo className="w-5 h-6 text-[#191615]" />
          <div>
            <h1 className="text-sm font-bold text-[#191615]">
              Fomi Frontend Engineering & Product Thinking Document
            </h1>
            <p className="text-[11px] text-[#7A6F6A]">
              Part A (Mockup Implementation) & Part B (Image Generation Workspace Redesign)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSwitchToPartA}
            className="px-3.5 py-1.5 rounded-xl bg-[#F4E6E4] hover:bg-[#EAD6D3] text-[#221D1B] text-xs font-semibold transition-colors cursor-pointer"
          >
            View Part A (Mockup)
          </button>
          <button
            type="button"
            onClick={onSwitchToPartB}
            className="px-3.5 py-1.5 rounded-xl bg-[#1E1A18] hover:bg-[#302926] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            View Part B (Studio Redesign)
          </button>
          <button
            type="button"
            onClick={handlePrintPdf}
            className="px-4 py-1.5 rounded-xl bg-[#D17D60] hover:bg-[#BE6B4E] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            🖨️ Save / Print Submission PDF
          </button>
        </div>
      </header>

      {/* Main Document Body */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pt-8 space-y-8">
        {/* Submission Cover Banner */}
        <section className="rounded-3xl bg-[#F6EEEA] border border-[#E8DAD2] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5D5CC]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#D17D60]/15 text-[#B86346] text-xs font-bold uppercase tracking-wider mb-2">
                Fomi Frontend Engineering Assessment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191615]">
                Directorial AI: Designing the Future of Professional Visual Creation
              </h2>
              <p className="text-xs sm:text-sm text-[#5C534F] mt-1">
                Chosen Track: <strong>1. Image Generation Workspace</strong> • Built with Next.js (App Router), JavaScript, Tailwind CSS & CSS Modules
              </p>
            </div>
          </div>

          {/* Interactive Deployment URL Box for PDF Export */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <label
                htmlFor="vercel-link-input"
                className="block text-[11px] font-bold uppercase tracking-wider text-[#7A6F6A] mb-1"
              >
                Live Vercel Deployment Link (Included in PDF Printout)
              </label>
              <input
                id="vercel-link-input"
                type="url"
                value={vercelUrl}
                onChange={(e) => setVercelUrl(e.target.value)}
                className="w-full sm:max-w-md bg-white border border-[#DFCFC6] rounded-xl px-3 py-1.5 text-xs font-mono text-[#191615] focus:outline-none focus:border-[#D17D60]"
              />
            </div>
            <div className="text-xs text-[#5C534F]">
              <div>
                <strong>Part A Route:</strong>{" "}
                <code className="px-1.5 py-0.5 rounded bg-white">/?view=part-a</code>
              </div>
              <div className="mt-1">
                <strong>Part B Route:</strong>{" "}
                <code className="px-1.5 py-0.5 rounded bg-white">/?view=part-b</code>
              </div>
            </div>
          </div>
        </section>

        {/* Question 1 */}
        <article className="rounded-3xl bg-white border border-[#EBE0DA] p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D17D60]">
            Question 01 • Problem Definition & User Persona
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#191615]">
            1. What problem were you trying to solve? What type of user did you design for?
          </h3>
          <div className="text-sm leading-relaxed text-[#38322F] space-y-3">
            <p>
              <strong>Target User Persona:</strong> We designed <em>Fomi Director Studio</em> for a returning, signed-in <strong>professional Art Director, Brand Photographer, or Visual Designer</strong> (e.g., <em>Clara</em>, shooting an Autumn Cashmere Lookbook) who spends <strong>4 to 6 hours daily</strong> inside the workspace producing commercial-grade campaign assets.
            </p>
            <p>
              <strong>The Core Problem — &ldquo;The Slot-Machine Prompt Paradox&rdquo;:</strong> Today&apos;s AI image generators (Midjourney, OpenArt, Leonardo, Higgsfield) treat visual creation like an unstructured chat log. Professional creators face three severe bottlenecks:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Loss of Continuity Across a Campaign:</strong> Changing a single lighting angle or lens focal length in a 90-word text prompt inadvertently mutates the model&apos;s facial identity, wardrobe knit texture, or color grading.
              </li>
              <li>
                <strong>Clumsy Text-Based Spatial Control:</strong> Describing 3D lighting direction (<em>&ldquo;45-degree warm key light from top-left with subtle rim fill&rdquo;</em>) in prose is slow and unnatural for visual thinkers.
              </li>
              <li>
                <strong>Chronological Feed Fatigue:</strong> After 100 generations in a 4-hour session, scrolling up and down an endless feed makes it nearly impossible to compare two subtle variations side-by-side or remember <em>which prompt delta</em> improved skin texture.
              </li>
            </ul>
          </div>
        </article>

        {/* Question 2 */}
        <article className="rounded-3xl bg-white border border-[#EBE0DA] p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D17D60]">
            Question 02 • Core UX Architecture
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#191615]">
            2. What are the three most important UX decisions you made, and why?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="rounded-2xl bg-[#FAF5F2] border border-[#EDE0D9] p-4 space-y-2">
              <div className="text-xs font-bold text-[#D17D60]">
                Decision 01 • Visual DNA Tokens
              </div>
              <h4 className="text-sm font-bold text-[#191615]">
                Decoupling Persistent Identity from Scene Direction
              </h4>
              <p className="text-xs leading-relaxed text-[#4A4340]">
                Instead of forcing users to re-paste 100-word prompts, we extracted persistent campaign pillars into toggleable <strong>Visual DNA Pills</strong> (<code>@Clara.v4</code>, <code>@85mm-MasterPrime</code>, <code>@WarmCashmere</code>). This lets the creator type short, surgical <em>scene directions</em> while keeping identity and color science locked at 99.4%.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF5F2] border border-[#EDE0D9] p-4 space-y-2">
              <div className="text-xs font-bold text-[#D17D60]">
                Decision 02 • Tactile 2D Light Rig
              </div>
              <h4 className="text-sm font-bold text-[#191615]">
                Direct Spatial Manipulation over Prompt Guessing
              </h4>
              <p className="text-xs leading-relaxed text-[#4A4340]">
                We replaced arcane lighting buzzwords with an interactive <strong>2D Key-Light Radar Pad</strong> and Kelvin Color Temperature slider. Dragging the virtual light orb around the subject previews directional lighting and warmth directly on the canvas before committing GPU credits.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF5F2] border border-[#EDE0D9] p-4 space-y-2">
              <div className="text-xs font-bold text-[#D17D60]">
                Decision 03 • Lineage Deltas & A/B Loupe
              </div>
              <h4 className="text-sm font-bold text-[#191615]">
                Version Diffs & Split-Wipe Inspection
              </h4>
              <p className="text-xs leading-relaxed text-[#4A4340]">
                Inspired by Cursor&apos;s code diffs and Capture One&apos;s culling workflow, our left panel displays <strong>Prompt Deltas</strong> (e.g., <code>+ 45° gallery key light</code>) rather than duplicate paragraphs, paired with an interactive <strong>A/B Split Loupe</strong> to compare skin micro-texture between any two takes.
              </p>
            </div>
          </div>
        </article>

        {/* Question 3 */}
        <article className="rounded-3xl bg-white border border-[#EBE0DA] p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D17D60]">
            Question 03 • Intentional Restraint & Design Trade-offs
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#191615]">
            3. Which features did you intentionally leave out? Why did you decide not to include them?
          </h3>
          <div className="text-sm leading-relaxed text-[#38322F] space-y-2.5">
            <p>
              Guided by Fomi&apos;s principle of <strong>&ldquo;Maximum capability. Minimum complexity.&rdquo;</strong>, we intentionally omitted:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Spaghetti Node Graphs (e.g., ComfyUI wires):</strong> Node graphs expose raw plumbing (VAE loaders, KSampler schedulers, CLIP encoders) that break creative flow. Professionals want <em>photographic and directorial controls</em> (Lens, Kelvin, Key Light angle, Subject Lock), not tensor math.
              </li>
              <li>
                <strong>Social Community Feeds & Public Leaderboards Inside the Studio:</strong> When a professional is 4 hours deep into a client shoot, public meme feeds and notification badges create visual noise and cognitive fatigue. The workspace must remain a quiet, high-contrast darkroom.
              </li>
              <li>
                <strong>20+ Cryptic Sampler & Denoise Sliders:</strong> As foundation models mature over the next few years, manual step-count and sampler tweaking (`DPM++ 2M Karras`) become obsolete. We consolidated low-level parameters into semantic optical and lighting controls.
              </li>
            </ul>
          </div>
        </article>

        {/* Question 4 */}
        <article className="rounded-3xl bg-white border border-[#EBE0DA] p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D17D60]">
            Question 04 • Competitive Inspiration & Critique
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#191615]">
            4. Which existing products inspired your thinking? What did you like, and what would you improve?
          </h3>
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#EBE0DA] text-[#7A6F6A] uppercase">
                  <th className="py-2.5 pr-4">Product</th>
                  <th className="py-2.5 px-4">What We Admired</th>
                  <th className="py-2.5 pl-4">What We Improved in Fomi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E8E3] text-[#38322F]">
                <tr>
                  <td className="py-3 pr-4 font-bold">Krea.ai & Magnific</td>
                  <td className="py-3 px-4">
                    Immediate canvas focus, tactile real-time enhancement feel, and clean dark studio chrome.
                  </td>
                  <td className="py-3 pl-4">
                    Added structured <strong>Version Lineage Deltas</strong> and <strong>A/B Split Loupe</strong> so iterations don&apos;t overwrite or lose context.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">Higgsfield & OpenArt</td>
                  <td className="py-3 px-4">
                    Strong character reference concepts and bottom floating composer dock ergonomics.
                  </td>
                  <td className="py-3 pl-4">
                    Stripped away marketing clutter/upsell badges and introduced <strong>Visual DNA Lock Pills</strong> + <strong>2D Key Light Pad</strong>.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">Figma & Cursor</td>
                  <td className="py-3 px-4">
                    Keyboard-first speed, context pills (`@file`), and clear diff inspection before accepting changes.
                  </td>
                  <td className="py-3 pl-4">
                    Brought Cursor&apos;s `@context` token model into visual creation (`@Clara.v4`, `@85mm-MasterPrime`).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* Question 5 & Question 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="rounded-3xl bg-white border border-[#EBE0DA] p-6 shadow-2xs space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D17D60]">
              Question 05 • 30-Day Roadmap
            </div>
            <h3 className="text-base font-bold text-[#191615]">
              5. If you had another month to work on this product, what would you improve?
            </h3>
            <ul className="list-disc pl-5 text-xs leading-relaxed text-[#38322F] space-y-2">
              <li>
                <strong>Semantic Region Brush & Layer Decomposition:</strong> Automatic foreground/midground/background depth separation so moving the 2D Key Light casts physically accurate occlusion shadows behind the subject.
              </li>
              <li>
                <strong>Real-Time Multiplayer Art Direction:</strong> Live Figma-style cursor presence and pin comments so a creative director and client can review the Contact Sheet together in real time.
              </li>
              <li>
                <strong>Local WebGPU Instant Preview:</strong> Running a lightweight distilled LCM/Turbo preview model in WebGPU so dragging the 2D lighting puck renders a 512px structural preview at 30fps before final 4K cloud synthesis.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl bg-[#1E1A18] text-[#F5F0ED] p-6 shadow-2xs space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E5987D]">
              Question 06 • Key Differentiator
            </div>
            <h3 className="text-base font-bold text-white">
              6. What is the single workflow that differentiates your workspace from existing AI platforms?
            </h3>
            <p className="text-xs leading-relaxed text-white/80">
              <strong>The &ldquo;Visual DNA + Delta Lineage&rdquo; Loop:</strong> Existing platforms treat every generation as a stateless text prompt from scratch. Fomi treats creation as a <strong>stateful photographic shoot</strong>.
            </p>
            <p className="text-xs leading-relaxed text-white/80">
              By locking <strong>Visual DNA Tokens</strong> (`@Character`, `@Lens`, `@Palette`) at the session level and combining them with a tactile <strong>2D Lighting Pad</strong> and <strong>Prompt-Delta Lineage Tree</strong>, a professional creator can shoot 20 consistent campaign angles in 10 minutes with deterministic control—transforming AI from a slot machine into a virtual camera studio.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
