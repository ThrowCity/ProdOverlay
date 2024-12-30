import React from 'react';
import {ExampleReplicant} from '../types/schemas';
import {useReplicant} from './replicant';

export function Prod() {
	let [data, setData, updateData] = useReplicant<ExampleReplicant>('exampleReplicant');

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
						name: e.target.value,
					}
				})
			}} value={data.name}></input>
			<button onClick={updateData}>Update</button>
		</>
	)
}
