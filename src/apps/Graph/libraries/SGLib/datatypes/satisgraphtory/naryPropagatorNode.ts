import SatisGraphtoryLoopableNode from './satisGraphtoryLoopableNode';
import SatisGraphtoryAbstractNode from './satisGraphtoryAbstractNode';
import DistributedOutput from './distributedOutput';
import ResourceRate from '../primitives/resourceRate';
import SimpleEdge from '../graph/simpleEdge';

// No, I didn't misspell this class. It's an N-Ary propagator node. Used for industrial container
export default class NaryPropagatorNode extends SatisGraphtoryLoopableNode {
  isClusterBoundary: boolean = false;

  distributeOutputs(): DistributedOutput {
    return new DistributedOutput(false, new Map());
  }

  processInputs(): void {}

  distributePresentOutputs(
    nodeSubset: Array<SatisGraphtoryAbstractNode>
  ): void {}

  processPresentInputs(nodeSubset: Set<SatisGraphtoryAbstractNode>): void {}

  backPropagation(
    resourceRate: ResourceRate[],
    edge: SimpleEdge
  ): Map<SatisGraphtoryAbstractNode, ResourceRate> {
    throw new Error('Unimplemented!');
    return new Map();
  }
}
