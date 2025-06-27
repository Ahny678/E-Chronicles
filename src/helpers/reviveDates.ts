export function reviveDates(obj: any): any {
  if (Array.isArray(obj)) return obj.map(reviveDates);
  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'string' &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
      ) {
        result[key] = new Date(value);
      } else {
        result[key] = reviveDates(value);
      }
    }
    return result;
  }
  return obj;
}
