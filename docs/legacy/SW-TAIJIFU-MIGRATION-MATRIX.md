# SW-TAIJIFU → TAIJIFU-SITE migration matrix

Status: working migration record  
Authority: **non-canonical until explicitly promoted**  
Tracks: #201, #202

## Rule

`TAIJIFU-CANON-1.0` remains the canonical snapshot. Material recovered from `SW-TAIJIFU` is evidence/provenance and MUST NOT silently enable canonical capabilities or overwrite current official content.

Authority states:

- `canonical`: already supported by the current TAIJIFU canon.
- `legacy-candidate`: recovered from SW-TAIJIFU and eligible for review.
- `rejected`: explicitly not promoted.
- `unavailable`: required information has not been recovered/promoted.

## Initial recovered training protocols

| Legacy source | Recovered subject | Candidate destination | Authority | Product use now |
| --- | --- | --- | --- | --- |
| `SW-TAIJIFU/docs/M021-warmup-protocol.md` | Warm-up V1; 7-minute structure; phases A–D; scaling and safety rule | Método / Adaptive Engine candidate dataset | `legacy-candidate` | Provenance/read-only; MUST NOT enable canonical prescription |
| `SW-TAIJIFU/docs/M023-fundamental-conditioning.md` | Conditioning V1; 2–4 rounds; repetitions/times; 60–90 s rest; progression; initial effort 4–6/10 | Método / Adaptive Engine candidate dataset | `legacy-candidate` | Provenance/read-only; MUST NOT enable canonical prescription |
| `SW-TAIJIFU/docs/M025-post-training-recovery.md` | Cooldown V1; 5-minute structure; between-session recovery; adaptation rule | Método / Adaptive Engine candidate dataset | `legacy-candidate` | Provenance/read-only; MUST NOT enable canonical prescription |

## Public-content migration queue

The SW-TAIJIFU documentation tree also contains material covering manifesto/definition, principles, safety, progression architecture, physical assessments, initial profile, mobility, core, posture, guard, weight distribution, movement, pivot, entry/exit and distance control.

These subjects are **not automatically canonical**. Each document must be reviewed against current official content before being attached to a public route.

| Subject family | Preferred current surface | Current migration state |
| --- | --- | --- |
| Manifesto / definition | Manifesto / Fundamentos | review required |
| Principles | Fundamentos / TAI · JI · FU | review required |
| Safety | Método | review required |
| Progression / evaluation | Graduação / Método | review required |
| Physical preparation | Método / Adaptive Engine | review required |
| Posture / guard / movement / distance | Método | review required |

## Promotion gate

A `legacy-candidate` may become an official source only through an explicit, traceable decision that records:

1. source path and recovered revision;
2. target public/canonical surface;
3. conflicts with current official material;
4. accepted text/data and any deliberate exclusions;
5. resulting authority state.

Until that gate is completed, the Adaptive Engine must continue reporting canonical prescription metadata as unavailable where `training-catalog.ts` says it is unavailable.

## Non-goals

- Do not rewrite `TAIJIFU-CANON-1.0` retroactively.
- Do not infer missing exercises, dosage, rest, equipment, goal scoring or safety metadata.
- Do not present legacy candidate material as current official TAIJIFU merely because it existed in an older repository.
