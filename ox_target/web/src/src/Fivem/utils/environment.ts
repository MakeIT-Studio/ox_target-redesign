export const isNui = !!window.GetParentResourceName;
export const resourceName = window.GetParentResourceName?.() || '';
