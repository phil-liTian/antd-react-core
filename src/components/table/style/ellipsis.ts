import { textEllipsis } from "@/components/style";

export const genEllipsisStyle = token => {
  const { componentCls } = token


  return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-cell-ellipsis`]: {
				...textEllipsis,
			},
		},
	};
}