import produce from 'immer';

const initialState = {
  graphFidelity: 'high',
  mouseMode: 'move',
  drawerOpen: false,
  machineClasses: [],
  selectedMachine: null,
  openModals: 0,
  graphSourceNode: null,
  graphData: {
    edges: [],
    nodes: []
  },
  selectedData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GRAPH_DATA':
      const newNodes = new Set(action.payload.nodes);
      const newEdges = new Set(action.payload.edges);

      const selectedEdges = state.selectedData.edges || {};
      const selectedNodes = state.selectedData.nodes || {};

      const newSelectedEdges = {};
      const newSelectedNodes = {};

      Object.keys(selectedEdges).forEach(edgeId => {
        const edgeItem = selectedEdges[edgeId];
        if (newEdges.has(edgeItem)) {
          newSelectedEdges[edgeId] = edgeItem;
        }
      });

      Object.keys(selectedNodes).forEach(nodeId => {
        const nodeItem = selectedNodes[nodeId];
        if (newNodes.has(nodeItem)) {
          newSelectedNodes[nodeId] = nodeItem;
        }
      });

      const selectedData = {
        nodes: newSelectedNodes,
        edges: newSelectedEdges
      };

      return produce(state, draftState => {
        draftState.graphData = action.payload;
        draftState.graphSourceNode = newNodes.has(draftState.graphSourceNode)
          ? draftState.graphSourceNode
          : null;
        draftState.selectedData = selectedData;
      });
    case 'SET_SELECTED_DATA':
      return produce(state, draftState => {
        draftState.selectedData = action.payload;
      });
    case 'SET_GRAPH_FIDELITY':
      return produce(state, draftState => {
        draftState.graphFidelity = action.payload;
      });
    case 'SET_MOUSE_MODE':
      return produce(state, draftState => {
        draftState.mouseMode = action.payload;
      });
    case 'SET_MACHINE_CLASSES':
      return produce(state, draftState => {
        draftState.machineClasses = action.payload;
      });
    case 'SET_SELECTED_MACHINE':
      return produce(state, draftState => {
        draftState.selectedMachine = action.payload;
      });
    case 'ADD_OPENED_MODAL_NODES':
      return produce(state, draftState => {
        draftState.openModals = draftState.openModals + 1;
      });
    case 'CLOSE_OPENED_MODAL_NODES':
      return produce(state, draftState => {
        draftState.openModals = draftState.openModals - 1;
      });
    case 'SET_GRAPH_SOURCE_NODE':
      return produce(state, draftState => {
        draftState.graphSourceNode = action.payload;
      });
    default:
      return state;
  }
};
