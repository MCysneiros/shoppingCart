const reducer = (state, action) => {
	if (action.type === 'CLEAR_CART') return { ...state, cart: [] };

	if (action.type === 'REMOVE_ITEM')
		return {
			...state,
			cart: state.cart.filter(item => item.id !== action.payload),
		};

	if (action.type === 'TOGGLE_AMOUNT') {
		let tempCart = state.cart
			.map(item => {
				if (item.id === action.payload.id) {
					if (action.payload.type === 'increase') {
						return { ...item, amount: item.amount + 1 };
					}
					if (action.payload.type === 'decrease') {
						return { ...item, amount: item.amount - 1 };
					}
				}
				return item;
			})
			.filter(item => item.amount > 0);

		return { ...state, cart: tempCart };
	}

	if (action.type === 'GET_TOTALS') {
		let { total, amount } = state.cart.reduce(
			(acc, item) => {
				acc.amount += item.amount;
				acc.total += item.price * item.amount;
				return acc;
			},
			{
				total: 0,
				amount: 0,
			}
		);

		total = parseFloat(total.toFixed(2));

		return { ...state, total, amount };
	}

	if (action.type === 'LOADING') {
		return { ...state, loading: true };
	}

	if (action.type === 'DISPLAY_ITEMS') {
		return { ...state, loading: false, cart: action.payload };
	}

	throw new Error('Should not get here!');
};

export default reducer;
