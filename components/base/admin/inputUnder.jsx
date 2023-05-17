import React from 'react';
import { Input } from 'antd';
export default function inputUnder({ defaultValUnderlyin, formItem1, categoryData, editListUnderlying }) {
	return (
		<Input
			defaultValue={
				defaultValUnderlyin.length > 1 ? defaultValUnderlyin == '+ Add a New Disease' ? (
					''
				) : (
					defaultValUnderlyin
				) : (
					categoryData &&
					categoryData.map((i) => {
						if (i.id == editListUnderlying && editListUnderlying.underlying) {
							return i.name;
						}
					})
				)
			}
			onChange={formItem1}
		/>
	);
}
