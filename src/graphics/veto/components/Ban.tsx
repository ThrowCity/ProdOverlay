import React from 'react';

type BanProps = {
	teamName: string;
	mapName: string;
	img: string;
	shown: boolean;
}

export function Ban({mapName, teamName, img, shown}: BanProps) {
	return (
		<div className="ban-container">
			{shown && (
				<>
					<div className="ban-overlay">
						<img className="ban-img" src={img} alt=""/>
						<svg className="ban-sign" width="80" height="80" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 88.97 89.93">
							<g>
								<polygon points="31.94 0 31.94 12.92 12.91 12.92 12.91 31.95 0 31.95 0 0 31.94 0"
										 fill="#dc3030"/>
								<polygon
									points="76.06 0 57.03 0 57.03 12.92 76.06 12.92 76.06 31.95 88.97 31.95 88.97 12.92 88.97 0 76.06 0"
									fill="#dc3030"/>
								<polygon
									points="76.06 57.98 76.06 77.01 57.03 77.01 57.03 89.93 76.06 89.93 88.97 89.93 88.97 77.01 88.97 57.98 76.06 57.98"
									fill="#dc3030"/>
								<polygon
									points="12.91 77.01 12.91 57.98 0 57.98 0 77.01 0 89.93 12.91 89.93 31.94 89.93 31.94 77.01 12.91 77.01"
									fill="#dc3030"/>
								<polygon
									points="62.21 31.31 58.56 27.66 44.39 41.82 30.23 27.66 26.58 31.31 40.74 45.47 26.58 59.63 30.23 63.28 44.39 49.12 58.56 63.28 62.21 59.63 48.05 45.47 62.21 31.31"
									fill="#dc3030"/>
							</g>
						</svg>
					</div>
					<div className="ban-title">{teamName} ban <span>{mapName}</span></div>
				</>
			
			)}
		</div>
	);
	
}
