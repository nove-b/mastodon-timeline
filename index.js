const endpoint = "https://api.rss2json.com/v1/api.json";
const feedUrl = "https://mstdn.jp/@nove_b.rss";
const getMastodonFeedToJson = async () => {
    // https://rss2json.com/docs
    try {
        const res = await fetch(`${endpoint}?rss_url=${feedUrl}`);
        if (!res.ok) {
            throw new Error(`Network response was not ok (${res.status})`);
        }
        const data = await res.json();
        return data.items;
    }
    catch (error) {
        console.error("Error fetching Mastodon feed:", error);
        return null;
    }
};
const createCardHtml = (res) => {
    const { pubDate, content, enclosure } = res;
    return `
  <div class="card">
    <div class="c-top">
      <div class="date">${fmtDate(pubDate)}</div>
    </div>
    <div class="c-middle">
      <div class="content">${content}</div>
      ${Object.keys(enclosure).length ? ` <div class="thumbnail"><img src="${enclosure.link}" alt=""></div>` : ''}
    </div>
  </div>
  `;
};
const fmtDate = (time) => {
    const dateObj = new Date(time);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() - 1).padStart(2, '0');
    const date = String(dateObj.getDate()).padStart(2, '0');
    return `${year}.${month}.${date}`;
};
(async () => {
    const timeline = document.getElementById('MastodonTimeline');
    if (!timeline)
        return;
    timeline.innerHTML = '<p>waiting...</p>';
    const response = await getMastodonFeedToJson();
    // 取得に失敗した時
    if (!response) {
        timeline.innerHTML = '<p>データの取得に失敗しました😭</p>';
    }
    let resultHtml = '';
    response.forEach((res) => {
        resultHtml += createCardHtml(res);
    });
    resultHtml += `<p class="request"><a href="${feedUrl.replace(".rss", "")}" target="_blank">エンジニアの友達が欲しいのでフォローしてください🖐</p>`;
    timeline.innerHTML = resultHtml;
})();
