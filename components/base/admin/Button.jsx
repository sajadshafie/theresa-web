import React from 'react';

export default function Button({
	off,

	btnClass = 'btn-add-patient',
	des = 'Add New Patient',
	onClick = () => {
		console.log('default btn');
	}
}) {
	console.log(off);
	return (
		<button className={btnClass} disabled={off} onClick={onClick}>
			{des}
		</button>
	);
}
