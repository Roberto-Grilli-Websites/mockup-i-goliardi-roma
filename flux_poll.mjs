const API_KEY = "00401ded-ea85-44bf-b71b-2ef285e56e80:9e4cb8192ed34a137d072697788b71f4"
const BASE = "https://queue.fal.run/fal-ai/flux-2-pro"

const requests = {
  HERO_BG: "019d8b32-c7d0-71b3-9dd6-33bfcfa15cba",
  ABOUT_IMG: "019d8b32-c7b1-77b1-af36-d6d58c85a7d8",
  SLIDER_1: "019d8b32-c7d2-7941-a00a-bb6ccd0d2147",
  SLIDER_2: "019d8b32-c7d6-7f40-86a5-14cfad9f796e",
  SLIDER_3: "019d8b32-c7cf-7500-a519-0b1f7ee823f3",
  SLIDER_4: "019d8b32-c7d7-7611-b349-041e105c569b",
  SLIDER_5: "019d8b32-c7cb-72d3-93b9-9402389e9ead",
  BATTUTA_IMG: "019d8b32-c7dc-73b3-97a3-112bf50b851e",
  CARPACCIO_IMG: "019d8b32-c7cf-7cc2-8267-a113c58af57c",
  VITEL_TONNE_IMG: "019d8b32-c7db-7d62-ae7e-957dfc3f5d65",
  SACHER_IMG: "019d8b32-c7cf-7500-a519-0b407011a6b0",
  AGNELLO_IMG: "019d8b32-c7d9-7b61-aa7d-216fff67e220",
  TAGLIERE_IMG: "019d8b32-c7d6-7083-910c-3c35e661f3e3",
  GULASH_IMG: "019d8b32-c7cd-7b31-979b-b2d449393570",
  PLIN_IMG: "019d8b32-c7d4-72e1-8fb9-d4c0bda1cd15",
  TAJARIN_IMG: "019d8b32-c7cf-7500-a519-0b2f9a60d196",
  PIZZICATI_IMG: "019d8b32-c7d8-7390-9a5e-ddd3a9f83222",
  RAVIOLI_IMG: "019d8b32-c7d2-71d1-a854-2b4aa74a5b47",
  TAGLIATA_IMG: "019d8b32-c7cc-78d3-a786-919ace280426",
  STINCO_IMG: "019d8b32-c7cf-7500-a519-0b3929a0a95a",
  COSTINE_IMG: "019d8b32-c7db-72e3-a5ed-a378c4d7a2e5",
  CUPOLA_IMG: "019d8b32-c7d8-7390-9a5e-ddc61b644812",
  PERSI_PIEN_IMG: "019d8b32-c7d4-74d0-bdf8-40564b1d5d43",
}

async function getResult(name, rid) {
  let attempts = 0
  while (attempts < 60) {
    const r = await fetch(`${BASE}/requests/${rid}`, {
      headers: { "Authorization": `Key ${API_KEY}` }
    })
    const data = await r.json()
    if (data.images && data.images[0]) {
      console.log(`${name}=${data.images[0].url}`)
      return [name, data.images[0].url]
    }
    if (data.detail && data.detail.includes("failed")) {
      console.log(`${name}=FAILED`)
      return [name, "FAILED"]
    }
    // still in queue, wait 4s
    await new Promise(r => setTimeout(r, 4000))
    attempts++
  }
  console.log(`${name}=TIMEOUT`)
  return [name, "TIMEOUT"]
}

const pairs = await Promise.all(
  Object.entries(requests).map(([name, rid]) => getResult(name, rid))
)

console.log("\n--- FINAL URLS ---")
for (const [k,v] of pairs) console.log(`${k}=${v}`)
