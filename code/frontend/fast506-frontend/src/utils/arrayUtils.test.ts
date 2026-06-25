import { deduplicateByKey } from "./arrayUtils";

describe("deduplicateByKey", () => {
  it("keeps the first occurrence of each repeated key", () => {
    const items = [
      { id: 1, name: "A" },
      { id: 1, name: "B" },
      { id: 2, name: "C" },
    ];

    expect(deduplicateByKey(items, "id")).toEqual([
      { id: 1, name: "A" },
      { id: 2, name: "C" },
    ]);
  });
});
