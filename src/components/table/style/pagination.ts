export const genPaginationStyle = (token) => {
	const { componentCls, margin } = token;

	return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-pagination`]: {
				display: 'flex',
				margin: `${margin}px 0`,

				['&-right']: {
					justifyContent: 'flex-end',
				},
				['&-left']: {
					justifyContent: 'flex-start',
				},
				['&-center']: {
					justifyContent: 'center',
				},
			},
		},
	};
};
