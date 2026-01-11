export function buildContext(docs: any[]) {
  return docs
    .map(
      (doc, i) =>
        `Source ${i + 1} (page ${doc.metadata?.pageNumber ?? "N/A"}):\n${
          doc.content
        }`
    )
    .join("\n\n");
}
