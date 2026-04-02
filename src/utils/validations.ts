export function slugValidation (slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

export function urlValidation (url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function domainValidation (url: string): boolean {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname

    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return false
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return false
    if (!/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(hostname)) return false

    return true
  } catch {
    return false
  }
}