import React from 'react';

type PickProps = {
	teamName: string;
	mapName: string;
	img: string;
	side: string;
	shown: boolean;
}

export function Pick({mapName ,teamName, img, side, shown}: PickProps) {
	return (
		<div className="pick-container">
			<div className='pick-img-container'>
				{shown && (
					<>
						<img className="pick-img" src={img} alt=""/>
						<div className='map-name'>{mapName}</div>
					</>
				)}
			</div>
			
			<div className="pick-title">{teamName}</div>
			{side && (
				<div className="pick-footer" >
					{side}
				</div>
			)}
		</div>
	);
}
