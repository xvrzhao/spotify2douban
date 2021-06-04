const spotifyAlbumUrlPrefix = "https://open.spotify.com/album/"
const spotifyAlbumTitlePrefix = "Spotify – "
const doubanMusicSearchUrl = "https://douban.com/search"

chrome.action.onClicked.addListener(async () => {
    const tab = await getCurrentTab()
    if (tab.url.startsWith(spotifyAlbumUrlPrefix)) {
        let albumName = getAlbumNameFromTabTitle(tab.title)
        const url = getDoubanSearchUrl(albumName)
        chrome.tabs.create({ url })
    }
})

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function getAlbumNameFromTabTitle(tabTitle) {
    return tabTitle.replace(spotifyAlbumTitlePrefix, '')
}

function getDoubanSearchUrl(albumName) {
    albumName = encodeURI(albumName)
    return `${doubanMusicSearchUrl}?cat=1003&q=${albumName}`
}