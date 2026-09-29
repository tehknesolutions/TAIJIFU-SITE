# TAIJIFU Masters — Recovered Asset Pipeline

Status: LEGACY / EVIDENCE
Source basis: `Análise Taijifu Masters.txt`, `Relatório Taijifu Masters.txt`
Tracker: #65

This document preserves recovered production rules from TAIJIFU Masters. It does not redefine the martial Canon.

## Candidate → review → import → in-engine bench

A generated visual is not considered a production asset merely because it resembles the intended character. The recovered process requires technical validation through a runtime pipeline.

Rejected as production evidence:

- concept/showcase sheets used in place of individual assets;
- images containing presentation text, panels, branding or scenery;
- assets without transparent background where transparency is required;
- claims of approved pivot/scale/runtime behavior without engine verification;
- visual boards presented as if they were validated deliverables.

## VM01-A1 — Lian Wu Character Lock

Recovered expected package:

```text
production/first_playable/lian_wu/character_lock_v1/
├── lian_wu_neutral.png
├── lian_wu_combat_stance.png
├── lian_wu_silhouette_25pct.png
├── character-lock.manifest.json
├── visual-review.json
├── godot-bench-1920x1080.png
└── README.md
```

Recovered PNG constraints:

- PNG RGBA;
- fully transparent background;
- one character per file;
- no embedded text, logo or border;
- facing right;
- bottom-center pivot;
- identical scale between poses;
- identical ground line.

Recovered Lian Wu identity constraints for this production gate:

- chibi/comic-manga proportion;
- large head and readable silhouette;
- topknot with blue tie;
- white, blue, black and gold clothing;
- one katana;
- sheath on left hip;
- katana sheathed in neutral pose;
- no mutation of clothing, hair, weapon or accessories between required poses.

Recovered Godot validation gate:

1. import both PNGs;
2. position them on the current FighterController;
3. apply bottom-center pivot;
4. test facing and horizontal flip;
5. compare scale against hitbox;
6. test contact shadow;
7. verify readability at minimum and maximum zoom;
8. capture a real 1920×1080 screenshot;
9. confirm procedural fallback can be hidden;
10. record PASS/FAIL per criterion.

## Pack-ready distinction

The recovered report explicitly distinguishes visual references from pack-ready runtime assets. Presentation boards may define style or pose, but are not pack-ready until decomposed into individual runtime frames and validated.

### PACK 04 — Reaction Frames

Recovered target:

- Lian Wu: 17 frames;
- Training Rival: 17 frames;
- total: 34 frames.

Per fighter:

- `block_recoil`: 3;
- `parry`: 3;
- `posture_break`: 4;
- `knockback`: 4;
- `neutral_recovery`: 3.

The recovered production direction is to generate coherent individual frames/micro-batches without presentation layout, embedded text or branding.

## Current authority

These rules are preserved as historical product/game production evidence. Any reactivation for a future TAIJIFU game should occur through a new explicit product decision and issue/PR, not by assuming every historical gate remains current.
