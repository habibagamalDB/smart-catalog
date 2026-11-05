import { describe, expect, it } from "vitest";
import ar from "../../messages/ar.json";
import en from "../../messages/en.json";
import { getDirection, routing } from "./routing";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("messages", () => {
  it("defines the same keys in every locale", () => {
    expect(flattenKeys(ar).sort()).toEqual(flattenKeys(en).sort());
  });

  it("has no empty strings", () => {
    for (const messages of [ar, en]) {
      const values = JSON.stringify(messages).match(/":\s*""/g);
      expect(values).toBeNull();
    }
  });
});

describe("routing", () => {
  it("defaults to Arabic", () => {
    expect(routing.defaultLocale).toBe("ar");
  });

  it("maps locales to text direction", () => {
    expect(getDirection("ar")).toBe("rtl");
    expect(getDirection("en")).toBe("ltr");
  });
});
