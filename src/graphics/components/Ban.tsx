import React from 'react';

type BanProps = {
	teamName: string;
	img: string;
	shown: boolean;
}

export function Ban({teamName, img, shown}: BanProps) {
	return (
		<div className="ban-container">
			<div className="ban-title" style={{
				marginTop: '2px',
				marginBottom: '-2px'
			}}>{teamName}</div>
			{shown && (
				<>
					<img className="ban-img" src={img} alt=""/>
					<svg className="ban-sign"
						 width="120" height="120" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M60 0C27 0 0 29.25 0 65C0 100.75 27 130 60 130C93 130 120 100.75 120 65C120 29.25 93 0 60 0ZM60 16.25C69.75 16.25 78.75 19.5 86.25 25.1875L23.25 93.4375C18 85.3125 15 75.5625 15 65C15 38.1875 35.25 16.25 60 16.25ZM60 113.75C50.25 113.75 41.25 110.5 33.75 104.812L96.75 36.5625C102 44.6875 105 54.4375 105 65C105 91.8125 84.75 113.75 60 113.75Z"
							fill="#CC3333"/>
					</svg>
				</>
			)}
		</div>
	);

}
