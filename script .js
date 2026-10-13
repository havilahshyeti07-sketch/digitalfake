/* EDIT THIS OBJECT with your real brand details */
const BRAND = {
  name: "Acme Co",
  legalName: "Acme Corporation Pvt. Ltd.",
  logos: [
    { label: "Primary logo", src: "" }  /* put an image URL or data URI in src; empty shows a placeholder shield */
  ],
  socials: [
    { platform: "Instagram", handle: "@acmeco_official", url: "https://instagram.com/acmeco_official" },
    { platform: "X (Twitter)", handle: "@acmeco", url: "https://x.com/acmeco" },
    { platform: "Facebook", handle: "AcmeCoOfficial", url: "https://facebook.com/AcmeCoOfficial" },
    { platform: "LinkedIn", handle: "company/acmeco", url: "https://linkedin.com/company/acmeco" }
  ],
  apps: [
    { platform: "Android", name: "Acme Co", url: "https://play.google.com/store/apps/details?id=com.acmeco.app" },
    { platform: "iOS", name: "Acme Co", url: "https://apps.apple.com/app/acme-co/id000000000" }
  ],
  identifiers: [
    { label: "Website", value: "www.acmeco.com" },
    { label: "Support email", value: "support@acmeco.com" },
    { label: "Customer care", value: "+91 00000 00000" },
    { label: "Registration no.", value: "U00000TG2020PTC000000" },
    { label: "Trademark", value: "Acme Co (TM)" }
  ]
};

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shield = '<svg viewBox="0 0 48 48" width="80" height="80" aria-label="Placeholder logo"><path d="M24 3 6 10v13c0 11 7.6 18.6 18 22 10.4-3.4 18-11 18-22V10z" fill="var(--accent)"/></svg>';

$("brandName").textContent = BRAND.name;
$("legalName").textContent = BRAND.legalName;
$("logos").innerHTML = BRAND.logos.map(l =>
  `<figure style="margin:0"><div class="logo-tile">${l.src ? `<img src="${esc(l.src)}" alt="${esc(l.label)}">` : shield}</div><figcaption class="sub" style="margin:6px 0 0">${esc(l.label)}</figcaption></figure>`).join("");
$("socials").innerHTML = BRAND.socials.map(s =>
  `<li class="item"><span class="k">${esc(s.platform)}</span><span class="v">${esc(s.handle)}</span><a class="go" href="${esc(s.url)}" target="_blank" rel="noopener">Open</a></li>`).join("");
$("appList").innerHTML = BRAND.apps.map(a =>
  `<li class="item"><span class="k">${esc(a.platform)}</span><span class="v">${esc(a.name)}</span><a class="go" href="${esc(a.url)}" target="_blank" rel="noopener">Store page</a></li>`).join("");
$("idList").innerHTML = BRAND.identifiers.map(i =>
  `<div><dt>${esc(i.label)}</dt><dd>${esc(i.value)}</dd></div>`).join("");

function norm(s){return s.toLowerCase().replace(/^https?:\/\/(www\.)?/,"").replace(/[@\/\s]+$/,"").replace(/^@/,"")}
function check(){
  const q = norm($("q").value);
  const out = $("result");
  if(!q){out.className="";out.textContent="";return}
  const pool = [BRAND.name, ...BRAND.socials.flatMap(s=>[s.handle,s.url]), ...BRAND.apps.flatMap(a=>[a.name,a.url]), ...BRAND.identifiers.map(i=>i.value)];
  const hit = pool.some(p => { const n = norm(p); return n === q || n.endsWith("/"+q) || n.includes(q) && q.length > 3 });
  out.className = hit ? "ok" : "no";
  out.textContent = hit ? "Match found: this appears on the official list." : "No match: this is not on the official list. Treat it as unverified and do not share personal details.";
}
$("checkBtn").addEventListener("click", check);
$("q").addEventListener("keydown", e => { if(e.key==="Enter") check() });
