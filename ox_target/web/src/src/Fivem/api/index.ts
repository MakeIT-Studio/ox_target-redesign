import { fetchNui } from '../core/fetchNui';

export const api = {
  send: (event: string, data?: any) => fetchNui(event, data).catch(() => {}),
};
