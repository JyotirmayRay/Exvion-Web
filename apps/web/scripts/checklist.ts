import https from "https";

const checks = [
  {
    name: "Website live",
    url: "https://exvionglobal.com",
  },
  {
    name: "Admin panel live",
    url: "https://admin.exvionglobal.com/login",
  },
  {
    name: "API health",
    url: "https://api.exvionglobal.com/api/health",
  },
  {
    name: "Sitemap",
    url: "https://exvionglobal.com/sitemap.xml",
  },
  {
    name: "Robots.txt",
    url: "https://exvionglobal.com/robots.txt",
  },
];

const checkUrl = (url: string): Promise<number> =>
  new Promise((resolve) => {
    https.get(url, (res) => resolve(res.statusCode || 0))
      .on("error", () => resolve(0));
  });

(async () => {
  console.log("\n🚀 Exvion Go-Live Checklist\n");
  for (const check of checks) {
    const status = await checkUrl(check.url);
    const ok = status >= 200 && status < 400;
    console.log(`${ok ? "✅" : "❌"} ${check.name} (${status})`);
  }
  console.log("\n✨ Checklist complete\n");
})();
