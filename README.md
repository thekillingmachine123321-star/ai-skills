# haiku-reader

A Claude Code mod that adds a cheap, fast file reader running on Haiku, so the main model (for example Opus) can
spend its context on reasoning instead of on reading.

It adds one agent type, `haiku-reader:reader`. It can only read: its tools are Read, Grep and Glob. The main model
sends it questions like "where is X defined and what calls it?" or "summarise this long log", and gets back a short
report with exact `path:line` locations and code quoted word for word. The reader says plainly what it could not
find, and never makes up lines.

The main model still reads a file itself before editing it. Claude Code's Edit tool requires that, and exact edits
need the exact text. The reader is for finding and skimming.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install haiku-reader --marketplace thekillingmachine123321-star/ai-skills
```

Answer `y` to add the marketplace, then pick a scope (user scope loads it in every session).

From a shell:

```
claude plugin install haiku-reader --marketplace thekillingmachine123321-star/ai-skills
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with
`thekillingmachine123321-star/ai-skills`, then Add plugin.

## Use

Ask Claude to use the reader for searching or skimming, for example "use the Haiku reader to find every place the
stun is applied". Claude can also pick it on its own: its description tells the main model when to use it.
