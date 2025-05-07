import glob
import yaml
from time import sleep
from pathlib import Path
from geopy import Nominatim
import folium
from folium.plugins import MarkerCluster

# Function to extract YAML front matter
def parse_yaml_front_matter(path):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    if not lines or lines[0].strip() != "---":
        return {}

    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            try:
                yaml_block = "".join(lines[1:i])
                return yaml.safe_load(yaml_block)
            except yaml.YAMLError:
                return {}
    return {}

# Geocoder setup
geocoder = Nominatim(user_agent="talkmap-mtalbot-2025")
location_cache = {}
talks_by_location = {}

talk_dir = Path("_talks")
md_files = list(talk_dir.glob("*.md"))
print(f"🔍 Found {len(md_files)} markdown files in {talk_dir}/")

# Extract metadata and geocode
for path in md_files:
    meta = parse_yaml_front_matter(path)
    location = meta.get("location", None)
    venue = meta.get("venue", "Unnamed Event")

    if not location or location == "Virtual Meeting":
        print(f"⏭️ Skipping {path.name}: No location or Virtual")
        continue

    if location not in location_cache:
        try:
            result = geocoder.geocode(location, timeout=10)
            if result:
                location_cache[location] = (result.latitude, result.longitude)
                print(f"📍 Geocoded: {location} → {result.latitude}, {result.longitude}")
            else:
                print(f"⚠️ Could not geocode: {location}")
                continue
        except Exception as e:
            print(f"❌ Error geocoding {location}: {e}")
            continue
        sleep(1)

    # Store this venue under the location
    if location not in talks_by_location:
        talks_by_location[location] = {
            "coords": location_cache[location],
            "venues": []
        }
    talks_by_location[location]["venues"].append(venue)

# Abort if no locations found
if not talks_by_location:
    raise ValueError("No valid geocoded talks found.")

# Map setup
all_coords = [v["coords"] for v in talks_by_location.values()]
lats, lons = zip(*all_coords)
center_lat, center_lon = sum(lats)/len(lats), sum(lons)/len(lons)
bounds = [[min(lats), min(lons)], [max(lats), max(lons)]]

m = folium.Map(location=[center_lat, center_lon], zoom_start=2, tiles="CartoDB positron")
m.fit_bounds(bounds)
cluster = MarkerCluster().add_to(m)

# Add markers with venue names
for location, data in talks_by_location.items():
    lat, lon = data["coords"]
    venues_html = "<br>".join(f"• {venue}" for venue in set(data["venues"]))
    popup_html = f"<b>{location}</b><br>{venues_html}"
    folium.Marker(
        location=[lat, lon],
        popup=folium.Popup(popup_html, max_width=300)
    ).add_to(cluster)

# Save map
output_path = "talkmap/map.html"
m.save(output_path)
print(f"✅ Map saved as {output_path}")