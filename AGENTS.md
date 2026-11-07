# Project Agent Rules

Read this file in full before planning or editing, and again at the start of each substantial task.

## Precedence

1. The task brief (for example `dpanda_BUILD_PROMPT.md`) and the project master prompt (`dpanda_MASTER_PROMPT.md`) decide **what** to build: content, brand, layout, motion, features.
2. This file decides **how** you work: process, honesty, verification, reporting.
3. If a brief and this file conflict on content, the brief wins. On process, honesty and verification, this file wins.
4. If two instructions contradict and the answer is not obvious, ask the owner. Do not pick silently.

## Core rules

1. **Inspect before editing.** Read the repo structure, manifests, scripts, framework versions, tokens, components, routes, tests and assets. Do not propose a rewrite before you have read the current code.
2. **Turn the request into acceptance criteria.** List them before you start. Separate what you observed from what you assume. Never invent copy, data, brand rules, interactions or reference details.
3. **Make the smallest complete change.** Do not redesign unrelated areas, delete data, change APIs or add dependencies without a stated reason and the owner's approval.
4. **Match references with evidence.** Compare layout, proportions, type, colour, crop, radii, shadows, icons, states and motion timing against the supplied images and video, using screenshots at the relevant widths. Do not claim a match you have not compared. Label every inference about states the reference does not show.
5. **Use supplied assets as given.** Never redraw, trace by eye, distort or regenerate a logo, mascot or brand render when the source file exists. If a file is missing or too low quality, say which one and ask. Do not ship placeholders silently.
6. **Never fabricate.** No invented testimonials, statistics, user counts, awards, clients, rates, licences, policies, capabilities, legal statements or citations. A number appears on screen only if it comes from the database or from the owner.
7. **Implement robustly.** Follow the installed stack and versions. Use semantic markup, accessible controls, validated and typed data, and safe error handling. Do not invent APIs, packages, files or scripts. Check that they exist.
8. **Secure the real attack surface.** Review injection and XSS, authentication, authorisation, CSRF, secrets, file uploads, SSRF, dependency risk, rate limiting, headers, CORS, cookies and logging of sensitive data. Apply controls that fit the architecture. Do not claim an audit you did not perform.
9. **Verify, do not assume.** Run the project's real checks (tests, lint, typecheck, build) and inspect the rendered result in a browser. Report a check as passed only if it ran and passed.
10. **Finish properly.** Do not call work done while any of these remain: a broken primary flow, a critical or high-severity defect, a material visual mismatch, an unverified factual claim, or a required check that has not run. If verification is blocked, say exactly what was and was not verified, and why.

## Visual quality bans

These apply to every page, state and animation. They exist because earlier builds contained them.

- **No glowing dots.** No pulsing status dots, glowing bullets, or decorative glowing orbs. Show status with a text label or an icon.
- No glow or outer shadow on text. No emoji in the interface. No decorative sparkle icons.
- No gradients that serve no purpose. Large soft shapes appear only where the supplied designs use them.
- No fake 3D (bevelled clip-art, stock coins). Use the supplied renders.
- No dead controls: every button, link and input does something or is not on the page.
- No lorem ipsum, no stock people, no placeholder avatars.
- Judge a style by whether it serves the brief and stays consistent. These bans are specific faults and not a ban on style.

## Copy rules

- **No tautology.** Do not say the same thing twice in one block.
- **No ambiguity.** Each sentence states one specific, checkable thing: what the reader does, what they get, or what happens next. If a line can be read two ways, rewrite it.
- One idea per sentence. Body sentences stay under 18 words.
- Banned words and phrases: seamless, unleash, elevate, next-level, revolutionary, cutting-edge, game-changer, world-class, empower, leverage, delve, "in today's fast-paced world", "whether you're a … or a …".
- No exclamation marks or rhetorical questions in headings.
- Use only the approved copy deck. If a line is missing, mark it `{owner to supply}` and report it. Do not write it yourself.
- Remove filler and repeated punctuation. Keep the facts unchanged unless the owner approves the change.
- Every rate or price on screen carries a timestamp and the standard rate disclaimer.

## Task sequence

1. **Intake.** State the objective, deliverables, constraints, reference sources, affected routes and acceptance criteria.
2. **Reconnaissance.** Read the code, assets, dependencies, tokens, scripts and current behaviour. Make no edits yet.
3. **Reference analysis.** Record what each reference shows, what it omits and what is uncertain. Ask only if a blocking decision cannot be made safely.
4. **Plan.** Write a short plan: files to change, files to leave alone, how you will verify.
5. **Implement.** Work in small steps. Reuse existing patterns. Commit per phase.
6. **Review.** Re-read your diff and look at the rendered page. Check for the bans above, invented content, visual drift, broken affordances and unneeded complexity.
7. **Verify.** Run the checks. Test the primary flows at 390, 768 and 1440 px at minimum. Check keyboard use, focus, contrast, overflow, links, forms, and the loading, empty, error and success states. Read the browser console and network tab.
8. **Report.** Use the format below.

## Completion report

- **Outcome:** what is done, and what you deliberately did not change.
- **Design and content:** visual, brand, type, layout and writing decisions.
- **Engineering:** changes made, dependencies added or avoided, env vars needed.
- **Verification:** each command or check you ran, with pass, fail or blocked. Paste real output only.
- **Reference comparison:** the differences you found between the build and the reference, and which are intentional.
- **Needs owner:** missing assets, missing copy, open decisions.
- **Known limitations:** untested browsers, devices or states, and pre-existing failures.
- **Remaining issues:** ordered by severity, each with the next action.

These rules lower the risk of defects. They do not remove it. Quality comes from inspection and evidence on the real project.
