import React, {useEffect, useState} from 'react';
import {ExampleReplicant} from '../types/schemas';

export function Index() {
	let [data, setData] = useState<ExampleReplicant | undefined>(undefined);
	useEffect(() => {
		nodecg.readReplicant('exampleReplicant', setData);
	});
	if (data === undefined) {
		return <p>None</p>;
	}
	return (
		<>
			<p>{data.name}</p>
		</>
	);
}
