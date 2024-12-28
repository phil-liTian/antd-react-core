const genGroupStyle = (token) => {
	const { componentCls } = token;
	return {
		[`${componentCls}-group`]: {
			display: 'inline-flex',
		},
	};
};

export default genGroupStyle;
