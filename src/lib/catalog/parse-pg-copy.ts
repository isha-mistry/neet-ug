export function parseCopyBlocks(
  sql: string
): { header: string; rows: string[] }[] {
  const blocks: { header: string; rows: string[] }[] = [];
  const re =
    /^COPY public\.(\S+) \(([^)]+)\) FROM stdin;\n([\s\S]*?)^\\.$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sql)) !== null) {
    const rows = m[3]
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line) => line.length > 0);
    blocks.push({ header: `${m[1]}:${m[2]}`, rows });
  }
  return blocks;
}

export function parsePgCopyRow(line: string): string[] {
  return line.split("\t").map((cell) => (cell === "\\N" ? "" : cell));
}
