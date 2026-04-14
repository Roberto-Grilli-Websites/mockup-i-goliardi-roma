import subprocess, json, threading

API_KEY = "00401ded-ea85-44bf-b71b-2ef285e56e80:9e4cb8192ed34a137d072697788b71f4"
BASE = "https://queue.fal.run/fal-ai/flux-2-pro"

images = [
  ("HERO_BG", "landscape_16_9", "Interior of an elegant Piedmontese restaurant in Rome at dinner time, warm amber candlelight glow, dark walnut wooden tables with cream linen tablecloths, brass and bronze fixtures, intimate sophisticated atmosphere, cinematic warm amber lighting, soft bokeh background, extremely detailed photorealistic, professional photography, 8K resolution, no text, no watermark, no people"),
  ("ABOUT_IMG", "portrait_4_3", "Close-up of artisanal fresh egg pasta being hand-rolled and cut into thin tajarin ribbons in a traditional Italian kitchen, golden yellow pasta strands on dark worn wooden surface, flour dust in air, warm natural light streaming from small window, rustic Piedmontese kitchen atmosphere, shallow depth of field, food editorial photography, professional lighting, no text, no people"),
  ("SLIDER_1", "landscape_16_9", "Intimate upscale restaurant dining room viewed from the entrance, round tables with pressed white linen and polished silverware, wine glasses catching soft candlelight, warm amber Edison bulbs, dark mahogany walls with subtle wall sconces, Piedmontese restaurant atmosphere in Rome, cinematic evening ambiance, no people, no text"),
  ("SLIDER_2", "landscape_16_9", "Elegant Italian wine cellar with aged Barolo, Barbaresco and Arneis DOCG bottles arranged on dark oak wooden racks, dramatic warm amber spotlighting creating deep shadows, brick vault ceiling, dust on old bottles, sophisticated atmosphere, no text, no people, no watermark, cinematic photography"),
  ("SLIDER_3", "landscape_16_9", "Outdoor restaurant terrace in Rome at early evening golden hour, four small square tables with cream linen tablecloths neatly set, wrought iron chairs, warm soft street lighting beginning to glow, elegant quiet atmosphere, ancient building facade in background, no people, no text, cinematic color grading"),
  ("SLIDER_4", "landscape_16_9", "Selection of Piedmontese aged cheeses including Castelmagno DOP and Toma Piemontese arranged on dark slate board, small ceramic ramekin of chestnut honey, dried fig slices, walnut halves, grape cluster, thin bread crisps, warm directional side lighting, elegant Italian restaurant presentation, overhead shot, professional food photography, no text"),
  ("SLIDER_5", "landscape_16_9", "Two crystal wine glasses filled with deep ruby Barolo red wine, dramatic rim lighting from the side, dark blurred restaurant background, shallow depth of field, droplets of condensation on glass, elegant Italian fine dining atmosphere, cinematic food photography, no text, no people, no watermark"),
  ("BATTUTA_IMG", "square_hd", "Finely minced raw Piedmontese beef tartare hand-shaped into round mound on white ceramic plate, small salted capers scattered around, two thin toasted bread crisps on the side, light drizzle of olive oil, NO egg, NO avocado, NO heavy garnish, elegant Piedmontese restaurant presentation, overhead shot, warm natural side lighting, professional food photography, shallow depth of field, appetizing"),
  ("CARPACCIO_IMG", "square_hd", "Thinly sliced raw Piedmontese veal carpaccio fanned out on white ceramic plate, shaved Grana Padano cheese curls scattered on top, thin black truffle shavings from Alba, light drizzle of extra virgin olive oil, lemon zest, NO sauce, NO lettuce, elegant Italian restaurant presentation, overhead shot, warm soft natural light, professional food photography"),
  ("VITEL_TONNE_IMG", "square_hd", "Thinly sliced cold poached veal arranged on white ceramic plate, covered in smooth ivory tuna and caper sauce, garnished with small capers and one thin lemon slice, clean presentation, elegant Piedmontese restaurant style, overhead shot, warm directional light, professional food photography, appetizing, NO mayonnaise blobs, NO parsley"),
  ("SACHER_IMG", "square_hd", "Small elegant chocolate-apricot pastry dessert on white ceramic plate, dark glossy chocolate glaze coating, apricot jam visible at cut section, light powdered sugar dusting, traditional Piedmontese interpretation, 45 degree angle shot, soft natural light, professional food photography, elegant, NO whipped cream"),
  ("AGNELLO_IMG", "square_hd", "Rack of lamb chops with herb and breadcrumb crust on white ceramic plate, roasted to medium, natural meat juices pooling, simple elegant presentation, NO heavy sauce, NO vegetables, elegant Piedmontese restaurant style, 45 degree angle shot, warm directional lighting, professional food photography, appetizing"),
  ("TAGLIERE_IMG", "square_hd", "Piedmontese cheese board with Castelmagno DOP, aged Toma and creamy Robiola arranged on dark slate, small ceramic ramekin of chestnut honey, fig jam, walnut halves, thin rustic bread slices, NO cured meats, NO prosciutto, overhead shot, warm side lighting, elegant Italian restaurant cheese presentation, professional food photography"),
  ("GULASH_IMG", "square_hd", "Braised Piedmontese veal beef stew chunks in rich dark wine sauce served in white ceramic bowl over thick toasted rustic bread slice, fresh parsley garnish, NO potatoes, NO pasta, Italian-Piedmontese goulash style, overhead shot, warm amber light, professional food photography, appetizing, rustic elegant presentation"),
  ("PLIN_IMG", "square_hd", "Small handmade Piedmontese agnolotti plin pasta in roasting pan sauce on white ceramic plate, glistening brown butter sauce, three fresh sage leaves, NO truffle, NO heavy cream sauce, 45 degree angle shot, warm amber lighting, professional Italian food photography, elegant restaurant presentation, shallow depth of field"),
  ("TAJARIN_IMG", "square_hd", "Thin handmade golden egg tajarin pasta noodles in rich Piedmontese beef and Bra sausage ragu on white ceramic plate, small amount of aged Grana Padano shaved on top, NO truffle, NO extra toppings, 45 degree angle, warm amber lighting, professional food photography, elegant Italian restaurant, shallow depth of field"),
  ("PIZZICATI_IMG", "square_hd", "Handmade Piedmontese pizzicati pasta parcels on white ceramic plate, crispy diced guanciale DOP pieces, light Taleggio cheese cream sauce, crushed toasted hazelnuts scattered, overhead shot, warm natural light, professional food photography, elegant Italian restaurant presentation, NO heavy cream pool"),
  ("RAVIOLI_IMG", "square_hd", "Handmade square ravioli pasta filled with leek and potato on white ceramic plate, thin Bra DOP cheese cream sauce, thin julienne strips of pink prosciutto on top, overhead shot, warm soft light, professional Italian food photography, elegant restaurant presentation, NO heavy cream pool, NO garnish herbs"),
  ("TAGLIATA_IMG", "square_hd", "Sliced medium-rare Piedmontese veal tagliata on white ceramic plate, thin slices fanned showing pink interior, fresh rosemary sprig, thin olive oil drizzle, NO arugula, NO tomatoes, NO sauce, elegant Italian restaurant presentation, 45 degree angle, warm directional lighting, professional food photography"),
  ("STINCO_IMG", "square_hd", "Whole roasted pork shank on white ceramic plate with golden-brown crispy lacquered skin, tender braised Savoy cabbage alongside, small ramekin of mustard sauce, NO fries, NO potatoes, rustic Piedmontese style, 45 degree angle, warm oven light, professional food photography, appetizing"),
  ("COSTINE_IMG", "square_hd", "BBQ pork ribs with sticky dark caramelized glaze on white ceramic plate, glistening lacquered surface showing char marks, crispy golden french fries alongside, NO extra garnish, NO herbs, casual Italian restaurant style, 45 degree angle, warm light, professional food photography, appetizing"),
  ("CUPOLA_IMG", "square_hd", "Elegant dome-shaped chocolate semifreddo dessert on white ceramic plate, dark bitter chocolate glaze coating, small pool of pale moscato zabaione cream sauce beside the dome, thin edible gold leaf accent, NO fruit, NO whipped cream, elegant Piedmontese dessert presentation, 45 degree angle, soft warm studio light, professional food photography"),
  ("PERSI_PIEN_IMG", "square_hd", "Traditional Piedmontese stuffed peach dessert on white ceramic plate, halved yellow peach filled with crumbled amaretto cookie and crushed Piedmontese hazelnut mixture, light golden caramel sauce drizzle, toasted hazelnut halves scattered, NO cream, overhead shot, warm natural light, professional food photography, rustic elegant"),
]

results = {}
lock = threading.Lock()

def send(name, size, prompt):
    payload = json.dumps({
        "prompt": prompt,
        "image_size": size,
        "num_inference_steps": 28,
        "guidance_scale": 3.5,
        "num_images": 1,
        "safety_tolerance": "2"
    })
    r = subprocess.run(
        ["curl", "-s", "-X", "POST", BASE,
         "-H", f"Authorization: Key {API_KEY}",
         "-H", "Content-Type: application/json",
         "-d", payload],
        capture_output=True, text=True
    )
    try:
        data = json.loads(r.stdout)
        rid = data.get("request_id", f"ERROR: {r.stdout[:200]}")
    except Exception as e:
        rid = f"PARSE_ERROR: {r.stdout[:200]}"
    with lock:
        results[name] = rid
        print(f"{name}={rid}", flush=True)

threads = [threading.Thread(target=send, args=(n,s,p)) for n,s,p in images]
for t in threads: t.start()
for t in threads: t.join()

print("\n--- ALL REQUEST IDS ---")
for k,v in results.items():
    print(f"{k}={v}")
