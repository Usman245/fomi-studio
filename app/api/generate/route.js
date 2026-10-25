import {
  INITIAL_BATCHES,
  HISTORY_ITEMS,
  AI_MODELS,
  STYLE_PRESETS,
} from "@/data/mockGenerations";

const VISUAL_POOLS = {
  portrait: [
    "/assets/mockup/portrait-1.webp",
    "/assets/mockup/portrait-2.webp",
    "/assets/mockup/portrait-3.webp",
    "/assets/mockup/portrait-4.webp",
  ],
  cosmic: [
    "/assets/mockup/cosmic-1.webp",
    "/assets/mockup/cosmic-2.webp",
    "/assets/mockup/cosmic-3.webp",
    "/assets/mockup/cosmic-4.webp",
  ],
  art: [
    "/assets/mockup/art-1.webp",
    "/assets/mockup/art-2.webp",
    "/assets/mockup/art-3.webp",
    "/assets/mockup/art-4.webp",
  ],
  scene: [
    "/assets/mockup/scene-1.webp",
    "/assets/mockup/scene-2.webp",
    "/assets/mockup/scene-3.webp",
    "/assets/mockup/scene-4.webp",
  ],
  editorial: [
    "/assets/mockup/history-4.webp",
    "/assets/mockup/history-6.webp",
    "/assets/mockup/history-7.webp",
    "/assets/mockup/history-8.webp",
  ],
  cinematic: [
    "/assets/mockup/history-1.webp",
    "/assets/mockup/history-10.webp",
    "/assets/mockup/history-11.webp",
    "/assets/mockup/history-13.webp",
  ],
};

function selectPoolForPrompt(prompt = "", style = "") {
  const lower = `${prompt} ${style}`.toLowerCase();
  if (
    lower.includes("cloud") ||
    lower.includes("sky") ||
    lower.includes("cosmic") ||
    lower.includes("star") ||
    lower.includes("astral") ||
    lower.includes("night")
  ) {
    return VISUAL_POOLS.cosmic;
  }
  if (
    lower.includes("cartoon") ||
    lower.includes("illustrat") ||
    lower.includes("frog") ||
    lower.includes("anime") ||
    lower.includes("stylized") ||
    lower.includes("art")
  ) {
    return VISUAL_POOLS.art;
  }
  if (
    lower.includes("fashion") ||
    lower.includes("vogue") ||
    lower.includes("floral") ||
    lower.includes("mirror") ||
    lower.includes("crystal")
  ) {
    return VISUAL_POOLS.editorial;
  }
  if (
    lower.includes("noir") ||
    lower.includes("cinematic") ||
    lower.includes("anamorphic") ||
    lower.includes("library") ||
    lower.includes("neon")
  ) {
    return VISUAL_POOLS.cinematic;
  }
  if (
    lower.includes("game") ||
    lower.includes("western") ||
    lower.includes("monster") ||
    lower.includes("panda") ||
    lower.includes("world")
  ) {
    return VISUAL_POOLS.scene;
  }
  return VISUAL_POOLS.portrait;
}

export async function GET() {
  return Response.json({
    batches: INITIAL_BATCHES,
    history: HISTORY_ITEMS,
    models: AI_MODELS,
    styles: STYLE_PRESETS,
    quota: {
      used: 180,
      limit: 1000,
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      prompt = "",
      type = "image",
      count = 4,
      aspectRatio = "3:4",
      model = "Model",
      style = "",
      cfgScale = 7.0,
      seed,
    } = body;

    const cleanPrompt =
      prompt.trim() ||
      "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face, wearing a cream-colored cashmere sweater in a modern art gallery with directional lighting.";

    const pool = selectPoolForPrompt(cleanPrompt, style);
    const numOutputs = Math.min(Math.max(Number(count) || 4, 1), 4);
    const baseSeed = seed ? Number(seed) : Math.floor(100000 + Math.random() * 899999);
    const timestamp = Date.now();

    const outputs = Array.from({ length: numOutputs }, (_, idx) => {
      const imgSrc = pool[idx % pool.length];
      return {
        id: `gen-${timestamp}-${idx + 1}`,
        src: imgSrc,
        alt: `${cleanPrompt.slice(0, 85)} (Variation ${idx + 1})`,
        seed: baseSeed + idx,
        resolution:
          aspectRatio === "1:1"
            ? "1536 × 1536"
            : aspectRatio === "16:9"
            ? "2048 × 1152"
            : "1536 × 2048",
        type,
        duration: type === "video" ? "0:05" : undefined,
        fps: type === "video" ? 24 : undefined,
        cfgScale,
      };
    });

    const newBatch = {
      id: `batch-${timestamp}`,
      prompt: cleanPrompt,
      model: model === "Name" ? "Model" : model,
      modelFull: model === "Name" ? "Fomi Realism v4" : model,
      aspectRatio,
      type,
      createdAt: "Just now",
      isTopCroppedPreview: false,
      outputs,
    };

    const newHistoryItem = {
      id: `hist-${timestamp}`,
      title: cleanPrompt.split(" ").slice(0, 4).join(" "),
      thumbnail: outputs[0].src,
      fullImage: outputs[0].src,
      prompt: cleanPrompt,
      model: model === "Name" ? "Fomi Realism" : model,
      aspectRatio,
      type,
      duration: type === "video" ? "0:05" : undefined,
      createdAt: "Just now",
      seed: baseSeed,
    };

    return Response.json({
      success: true,
      batch: newBatch,
      historyItem: newHistoryItem,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to process generation request." },
      { status: 400 }
    );
  }
}
