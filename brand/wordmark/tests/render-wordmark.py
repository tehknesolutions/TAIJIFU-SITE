from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SVG = ROOT / "construction" / "taijifu-wordmark-v1.svg"

assert SVG.exists(), f"missing candidate: {SVG}"
root = ET.parse(SVG).getroot()
assert root.attrib.get("viewBox"), "wordmark must define viewBox"
ns = {"svg": "http://www.w3.org/2000/svg"}
assert not root.findall(".//svg:text", ns), "wordmark must not depend on <text> or fonts"
for group_id in ("TAI", "JI", "FU"):
    assert root.find(f".//svg:g[@id='{group_id}']", ns) is not None, f"missing group {group_id}"
assert not root.findall(".//svg:filter", ns), "filters are forbidden"
assert not root.findall(".//svg:linearGradient", ns), "gradients are forbidden"
assert not root.findall(".//svg:radialGradient", ns), "gradients are forbidden"
visible = root.findall(".//svg:path", ns) + root.findall(".//svg:polygon", ns) + root.findall(".//svg:rect", ns)
assert visible, "wordmark must contain explicit vector geometry"
print("WORDMARK_STRUCTURE_PASS")
