import React from 'react';

type BanProps = {
	teamName: string;
	img: string;
	side: string;
	shown: boolean;
}

export function Pick({teamName, img, side, shown}: BanProps) {
	return (
		<div className="pick-container">
			<div className="pick-title" style={{
				marginTop: '2px',
				marginBottom: '-2px'
			}}>{teamName}</div>
			<div className='pick-img-container'>
				{shown && (
					<>
						<img className="pick-img" src={img} alt=""/>
					</>
				)}
			</div>

			{side && (
				<div className="pick-footer" style={{
					marginTop: '3px',
					marginBottom: '-3px'
				}}>
					{side}
				</div>
			)}
		</div>
	);
}
