import type NodeCG from '@nodecg/types';
import type {MapBan} from '../types/schemas';

let context: NodeCG.ServerAPI;

module.exports = function (nodecg: NodeCG.ServerAPI) {
	context = nodecg;

	const mapBan = nodecg.Replicant('mapBan', {
		defaultValue: {
			teamA: "Team A",
			teamB: "Team B",
			bestOf: 3,
		}
	}) as unknown as NodeCG.ServerReplicantWithSchemaDefault<MapBan>;
};

export function get(): NodeCG.ServerAPI {
	return context;
}
