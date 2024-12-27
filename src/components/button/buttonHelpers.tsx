export const _ButtonVariantTypes = [
  'outlined',
  'dashed',
  'solid',
  'filled',
  'text',
  'link',
] as const;

export type ButtonVariantType = (typeof _ButtonVariantTypes)[number];


export const _ButtonColorTypes = ['default', 'primary', 'danger'] as const;
export type ButtonColorType = (typeof _ButtonColorTypes)[number];


const _ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const;
export type ButtonType = (typeof _ButtonTypes)[number];
