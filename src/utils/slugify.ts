export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacríticos (acentos)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')        // remove caracteres especiais
    .replace(/\s+/g, '-')            // substitui espaços por hífen
    .replace(/-+/g, '-');            // remove múltiplos hífens
}