const CORS_PROXY = "https://api.allorigins.win/raw?url="

export const getEpisodesFromFeed = async (feedUrl) => {
  const response = await fetch(
    CORS_PROXY + encodeURIComponent(feedUrl)
  )

  const xmlText = await response.text()

  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlText, "text/xml")

  const items = Array.from(xml.querySelectorAll("item"))

  return items.map((item, index) => ({
    id: item.querySelector("guid")?.textContent || index.toString(),
    title: item.querySelector("title")?.textContent || "",
    description:
      item.querySelector("description")?.textContent || "",
    audioUrl:
      item.querySelector("enclosure")?.getAttribute("url") || "",
    pubDate:
      item.querySelector("pubDate")?.textContent || "",
  }))
}
