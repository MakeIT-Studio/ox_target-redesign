declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}
export type Listener = (payload: any) => void;
