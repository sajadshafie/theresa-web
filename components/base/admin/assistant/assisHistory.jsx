import React from 'react';
import style from '../../../../styles/admin/assistant.module.css';
import { EditOutlined, DeleteFilled, MailFilled, PhoneFilled } from '@ant-design/icons';
import { Switch } from 'antd';
export default function assisHistory({ handleRemoveHistory, editHistory, closeHistory, data, assisHistory }) {
	console.log(data);
	console.log(assisHistory);
	return (
		<div className={style.assisHistory}>
			<img className={style.bgHistory} src="/img/assistant/Rectangle 307.svg" alt="" />
			<div className={style.headerAssis}>
				<div className={style.mark}>
					<span>View Patient</span>
				</div>
				<div className={style.activeText}>
					<span onClick={editHistory} className={style.activeText1}>
						<EditOutlined style={{ paddingRight: '5px' }} />
						Edit
					</span>
					<span onClick={handleRemoveHistory} className={style.activeText2}>
						{/* <img src="/admin/assistant/Vvector.svg" alt="" /> */}
						<DeleteFilled style={{ paddingRight: '5px' }} />
						Delete
					</span>
					<span className={style.activeText3} onClick={closeHistory}>
						close
					</span>
				</div>
			</div>
			<div className={`${style.contentHistory} switch`}>
				<h2 className={style.titleHistory}>Assistant Information</h2>
				<h1>
					{assisHistory.name} {assisHistory.family}
				</h1>
				<div className={style.infoAssis}>
					<div className={style.info1}>
						<MailFilled />
						<span>{assisHistory.email}</span>
					</div>
					<div className={style.verticalLine} />
					<div className={style.info2}>
						<PhoneFilled />
						<span>{assisHistory.mobile}</span>
					</div>
				</div>
				<p className={`${style.desHistory} `}>
					{assisHistory.description ? assisHistory.description : 'There is no description available.'}
				</p>
				<h2>Access Information</h2>
				<div className={style.switch1}>
					<span>Patient management</span>
					<Switch defaultChecked={true} disabled={true} />
				</div>
				<div className={style.switch1}>
					<span>Modify pregnancy history</span>
					<Switch defaultChecked={true} disabled={true} />
				</div>
				<div className={style.switch1}>
					<span>Modify pregnancy problems</span>
					<Switch defaultChecked={true} disabled={true} />
				</div>
				<div className={style.switch1}>
					<span>Modify underlying disease</span>
					<Switch defaultChecked={true} disabled={true} />
				</div>
				<div className={style.switch1}>
					<span>Modify abortion</span>
					<Switch defaultChecked={true} disabled={true} />
				</div>
			</div>
		</div>
	);
}
