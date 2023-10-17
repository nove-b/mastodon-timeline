interface Response {
  pubDate: string,
  thumbnail: string,
  content: string,
  categories: string[]
  enclosure: {
    link: string
  }
}


const getMastodonFeedToJson = async (feedUrl:string) => {
  
  // https://rss2json.com/docs
  const endpoint = "https://api.rss2json.com/v1/api.json";

  try {
    const res = await fetch(`${endpoint}?rss_url=${feedUrl}`);

    if (!res.ok) {
      throw new Error(`Network response was not ok (${res.status})`);
    }
    const data = await res.json();

    return data.items;

  } catch (error) {
    console.error("Error fetching Mastodon feed:", error);
    return null;
  }
}

const createCardHtml = (res: Response) => {
  const { pubDate, content, enclosure } = res
  return `
  <div class="mastodon-timeline-card">
    <div class="mastodon-timeline-top">
      <div class="mastodon-timeline-date">${fmtDate(pubDate)}</div>
    </div>
    <div class="mastodon-timeline-middle">
      <div class="mastodon-timeline-content">${content}</div>
      ${Object.keys(enclosure).length ? ` <div class="mastodon-timeline-thumbnail"><img src="${enclosure.link}" alt=""></div>` : ''}
    </div>
  </div>
  `
}

const fmtDate = (time: string) => {
  const dateObj = new Date(time)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() - 1).padStart(2, '0')
  const date = String(dateObj.getDate()).padStart(2, '0')
  return `${year}.${month}.${date}`
}

(async () => {
  const timeline = document.getElementById('MastodonTimeline')
  const server = timeline.dataset.server
  const username = timeline.dataset.username
  const message = timeline.dataset.message
  const feedUrl = `${server}@${username}.rss`;

  if(!timeline) return 
  timeline.innerHTML = '<p>waiting...🐘</p>'
  const response = await getMastodonFeedToJson(feedUrl)

  // 取得に失敗した時
  if (!response) {
    timeline.innerHTML = '<p>データの取得に失敗しました😭</p>'
  }
  let resultHtml = ''

  response.forEach((res: Response) => {
    resultHtml += createCardHtml(res)
  })
  resultHtml+=`<p class="mastodon-timeline-request"><a href="${feedUrl.replace(".rss", "")}" target="_blank">${message}</p>`
  timeline.innerHTML = resultHtml

  
})();