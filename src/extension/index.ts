import type NodeCG from '@nodecg/types';
import type { ExampleReplicant } from '../types/schemas';

let context: NodeCG.ServerAPI;

module.exports = function (nodecg: NodeCG.ServerAPI) {
	context = nodecg;

	const exampleReplicant = nodecg.Replicant('exampleReplicant') as unknown as NodeCG.ServerReplicantWithSchemaDefault<ExampleReplicant>;
	setInterval(() => {
		exampleReplicant.value.age++;
	}, 5000);
};

export function get(): NodeCG.ServerAPI {
	return context;
}
