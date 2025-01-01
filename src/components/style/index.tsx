import { CSSObject } from "@ant-design/cssinjs";
import { AliasToken } from "../theme/interface/alias";

export const resetComponent = (token: AliasToken, needInheritFontFamily = false): CSSObject => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token.lineHeight,
  listStyle: 'none',
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: needInheritFontFamily ? 'inherit' : token.fontFamily,
});



export const textEllipsis = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}