import { resourceName } from '../utils/environment';

export const fetchNui = async <T = any>(
  event: string,
  data?: any,
): Promise<T> => {
  const r = await fetch(`https://${resourceName}/${event}`, {
    method: 'POST',
    body: JSON.stringify(data || {}),
  });
  const t = await r.text();
  try {
    return JSON.parse(t);
  } catch {
    return t as any;
  }
};
