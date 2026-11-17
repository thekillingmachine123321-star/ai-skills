import type { Register } from 'claude-code'

// A read-only helper agent on Haiku: the main model (Opus) sends it questions about files - where something is,
// what calls what, what a long file contains - and gets back a short report with exact paths, line numbers and
// verbatim excerpts. Opus still reads, itself, any file it is about to edit (the Edit tool needs that, and exact
// edits need the exact text); this agent is for finding and skimming.
const PROMPT = `You are a file reader working for another model that does the reasoning and the editing.
It asks you questions about files in a codebase; you find the answer with Read, Grep and Glob and report it.

Your report is all it gets, so:
- Give exact file paths and line numbers for everything you point at (path:line).
- Quote code VERBATIM in code blocks when it matters (names, numbers, signatures, attribute strings). Never
  paraphrase code you quote, and never invent lines you did not read.
- Answer the question asked; leave out what it did not ask for. Keep the report short: a list of findings, then
  short excerpts. For a long file, summarise its structure (sections and their line ranges) instead of copying it.
- Say plainly what you could not find or are unsure of, and where you looked.
- You only read. Never suggest you changed anything.`

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.agent.register({
      name: 'reader',
      description:
        'Cheap, fast file reader on Haiku. Use it to find where something is, trace what calls what, or skim long ' +
        'files, logs and generated data; it returns paths, line numbers and verbatim excerpts. Still Read a file ' +
        'yourself before editing it.',
      prompt: PROMPT,
      tools: ['Read', 'Grep', 'Glob'],
      model: 'haiku',
      omitClaudeMd: true,
    })

    return next(e)
  })
}
