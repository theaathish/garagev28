import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("car").title("Cars"),
      S.documentTypeListItem("review").title("Reviews"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["car", "review"].includes(item.getId()!),
      ),
    ]);
