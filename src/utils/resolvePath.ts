export function resolvePath(path: string, params: Record<string, string>) {
  let resolvedPath = path;

  for (const [key, value] of Object.entries(params)) {
    resolvedPath = resolvedPath.replace(`:${key}`, value);
  }

  return resolvedPath;
}