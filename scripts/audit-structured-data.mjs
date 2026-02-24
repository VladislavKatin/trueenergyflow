import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const checks = [
  {
    file: "src/app/layout.tsx",
    mustInclude: ["Organization", "WebSite", "JsonLd"]
  },
  {
    file: "src/app/page.tsx",
    mustInclude: ["FAQPage", "JsonLd"]
  },
  {
    file: "src/app/services/page.tsx",
    mustInclude: ["FAQPage", "ItemList", "JsonLd"]
  },
  {
    file: "src/app/blog/[slug]/page.tsx",
    mustInclude: ["Article", "BreadcrumbList", "JsonLd"]
  },
  {
    file: "src/app/services/[service]/page.tsx",
    mustInclude: ["Service", "LocalBusiness", "BreadcrumbList", "JsonLd"]
  }
];

let failed = 0;

for (const check of checks) {
  const filePath = path.join(root, check.file);
  const source = fs.readFileSync(filePath, "utf8");
  const missing = check.mustInclude.filter((token) => !source.includes(token));
  if (missing.length > 0) {
    failed += 1;
    console.log(`FAIL ${check.file} missing: ${missing.join(", ")}`);
  } else {
    console.log(`OK   ${check.file}`);
  }
}

if (failed > 0) {
  console.log(`Structured data audit failed: ${failed} file(s).`);
  process.exit(1);
}

console.log("Structured data audit passed.");
