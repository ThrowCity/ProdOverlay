import React from 'react';
import {MapBan} from '../types/schemas';
import {useReplicant} from './replicant';

export function Prod() {
	let [data, setData, updateData] = useReplicant<MapBan>('mapBan');

	if (!data) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<p>Enter name:</p>
			<input onChange={(e) => {
				setData((d) => {
					return {
						...d,
						teamA: e.target.value,
					}
				})
			}} value={data.teamA}></input>
			<button onClick={updateData}>Update</button>
		</>
	)
}
