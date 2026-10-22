/* Main website data loader.
   Edit files inside /data to update text, download links, images and sections.
   Keep index.html unchanged. */
(function () {
  const files = [
    ["site", "data/site.json"],
    ["downloads", "data/downloads.json"],
    ["screenshots", "data/screenshots.json"],
    ["features", "data/features.json"],
    ["services", "data/services.json"],
    ["navigation", "data/navigation.json"]
  ];
  const loaded = {};
  Promise.all(files.map(async ([key, url]) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Could not load " + url);
    loaded[key] = await response.json();
  })).then(() => render(loaded)).catch(error => {
    console.error("Shaheen TV content could not be loaded:", error);
    const heading = document.getElementById("hero-title");
    if (heading) heading.textContent = "Website content could not be loaded. Please check the /data files.";
  });

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function render(data) {
    const site = data.site;
    document.title = site.pageTitle;
    document.querySelector('meta[name="description"]').content = site.metaDescription;
    document.getElementById("brand-logo").src = site.logo;
    document.getElementById("brand-name").textContent = site.brandName;
    document.getElementById("live-label").textContent = site.liveLabel;
    document.getElementById("hero-title").textContent = site.hero.title;
    document.getElementById("hero-description").textContent = site.hero.description;
    document.getElementById("download-title").textContent = site.download.title;
    document.getElementById("download-description").textContent = site.download.description;
    document.getElementById("features-title").textContent = site.features.title;
    document.getElementById("features-description").textContent = site.features.description;
    document.getElementById("services-title").textContent = site.services.title;
    document.getElementById("services-description").textContent = site.services.description;
    document.getElementById("community-title").textContent = site.community.title;
    document.getElementById("community-description").textContent = site.community.description;
    document.getElementById("community-link").href = site.community.url;
    document.getElementById("community-link").textContent = site.community.buttonText;
    document.getElementById("copyright").textContent = site.copyright;

    const heroButtons = document.getElementById("hero-buttons");
    site.hero.buttons.forEach((item, index) => {
      const a = el("a", "btn" + (index ? " ghost" : ""), item.label);
      a.href = item.url; heroButtons.appendChild(a);
    });
    const facts = document.getElementById("hero-facts");
    site.hero.facts.forEach(item => {
      const box = el("div"), number = el("b", "", item.value), label = el("span", "", item.label);
      if (item.numericValue !== undefined) {
        number.dataset.count = item.numericValue;
        number.dataset.suffix = item.suffix || "";
      }
      box.append(number, label); facts.appendChild(box);
    });
    document.getElementById("ticker-content").innerHTML = "";
    [...site.ticker, ...site.ticker].forEach(text => document.getElementById("ticker-content").appendChild(el("span", "", text)));

    const nav = document.getElementById("main-nav"), footerNav = document.getElementById("footer-nav");
    data.navigation.forEach(item => {
      [nav, footerNav].forEach(target => {
        const a = el("a", "", item.label); a.href = item.url; target.appendChild(a);
      });
    });

    const downloadList = document.getElementById("download-sources");
    data.downloads.links.forEach(item => {
      const a = el("a", "r src"); a.href = item.url;
      if (item.newTab) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      const img = el("img"); img.src = item.icon; img.alt = "";
      const span = el("span"), strong = el("strong", "", item.title), small = el("small", "", item.description);
      span.append(strong, small); a.append(img, span);
      if (item.badge) a.appendChild(el("em", "", item.badge));
      downloadList.appendChild(a);
    });
    const info = document.getElementById("app-info");
    info.appendChild(el("h3", "", data.downloads.info.title));
    const dl = el("dl");
    data.downloads.info.items.forEach(item => { dl.append(el("dt", "", item.label), el("dd", item.status ? "status" : "", item.value)); });
    info.appendChild(dl); info.appendChild(el("p", "", data.downloads.info.note));

    const featureList = document.getElementById("feature-list");
    data.features.items.forEach((item, index) => {
      const card = el("div", "r f" + (index === 0 ? " big" : ""));
      card.innerHTML = item.iconSvg;
      card.append(el("h3", "", item.title), el("p", "", item.description));
      featureList.appendChild(card);
    });
    const serviceList = document.getElementById("service-list");
    data.services.items.forEach(item => {
      const row = el("div", "r row"), heading = el("h3", "", item.title), description = el("p", "", item.description), ul = el("ul");
      item.tags.forEach(tag => ul.appendChild(el("li", "", tag)));
      row.append(heading, description, ul); serviceList.appendChild(row);
    });

    data.screenshots.images.forEach(item => {
      const img = el("img"); img.src = item.url; img.alt = item.alt || "Shaheen TV screenshot";
      document.getElementById("track").appendChild(img);
    });
    document.dispatchEvent(new Event("shaheen-content-ready"));
  }
})();
