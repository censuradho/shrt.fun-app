export const getDomain = (url: string) =>
  url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]

export const clearHttp = (url: string) =>
  url.replace(/^(https?:\/\/)?(www\.)?/, '')

export function getLinkFavicon (url: string, size: number = 32) {
  return `https://www.google.com/s2/favicons?domain=${getDomain(url)}&sz=${size}`
}