import React from 'react';
import Header from './header';
import Side from './side';
import style from '../../../styles/admin/main.module.css';
import Sideitem from './sideItem';
export default function main({ children, image, arrowIcon, name, titleName }) {
	return (
		<React.Fragment>
			<div className={style.adminContainer}>
				<div className={style.navbar}>
					<Side />
					<Header titleName={titleName} image={image} arrowIcon={arrowIcon} name={name} />
				</div>
				<div className={style.side}>
					<div className={style.sideItem}>
						<Sideitem />
					</div>
					<div className={style.adminDataContainer}>{children}</div>
				</div>
			</div>
		</React.Fragment>
	);
}
