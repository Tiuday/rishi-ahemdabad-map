import { useState } from 'react';
import { nodes, routes } from './data';
import './MapCanvas.css';

/* Inline SVG Icons */
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const NavIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

/* Get connected nodes for a given node */
function getConnectedNodes(nodeId) {
  const connectedRoutes = routes.filter(r => r.source === nodeId || r.target === nodeId);
  const connectedIds = connectedRoutes.map(r => r.source === nodeId ? r.target : r.source);
  return { connectedRoutes, connectedIds };
}

const MapCanvas = ({ onLogout }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    if (selectedNode?.id === node.id) {
      setSelectedNode(null); // deselect
    } else {
      setSelectedNode(node);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget || e.target.tagName === 'svg') {
      setSelectedNode(null);
    }
  };

  const selected = selectedNode ? getConnectedNodes(selectedNode.id) : null;

  return (
    <div className="map-container">
      {/* Glass Header */}
      <div className="map-glass-header">
        <div className="header-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <div>
            <h2>Navi Secure — Ahmedabad</h2>
            <p>Discover safe connections across the city</p>
          </div>
        </div>
        <div className="stats">
          <span><PinIcon /> {nodes.length} Locations</span>
          <span><NavIcon /> {routes.length} Routes</span>
          {onLogout && (
            <button onClick={onLogout} className="logout-btn">Sign out</button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-title">Legend</div>
        <div className="legend-item">
          <span className="legend-dot west-dot"></span> West Ahmedabad
        </div>
        <div className="legend-item">
          <span className="legend-dot east-dot"></span> East Ahmedabad
        </div>
        <div className="legend-item">
          <span className="legend-line bridge-line"></span> Bridge Route
        </div>
        <div className="legend-item">
          <span className="legend-dot selected-dot"></span> Selected Location
        </div>
        <div className="legend-sep"></div>
        <div className="legend-hint">Click any location to explore its safe routes</div>
      </div>

      {/* SVG Map Canvas */}
      <div className="canvas-wrapper" onClick={handleBackdropClick}>
        <svg viewBox="-50 -50 1300 900" className="interactive-svg-map">
          <defs>
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(200, 225, 245, 0.1)" />
              <stop offset="50%" stopColor="rgba(180, 215, 240, 0.4)" />
              <stop offset="100%" stopColor="rgba(200, 225, 245, 0.1)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="selectedGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pulse animation ring */}
            <radialGradient id="pulseGrad">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>

            {/* Safe route gradient */}
            <linearGradient id="safeRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Region labels */}
          <text x="250" y="0" className="region-label">WEST AHMEDABAD</text>
          <text x="850" y="0" className="region-label">EAST AHMEDABAD</text>

          {/* Sabarmati River */}
          <path
            d="M 590 -100 C 560 100, 580 300, 555 400 S 600 600, 610 900"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="90"
            strokeLinecap="round"
          />
          <path
            d="M 590 -100 C 560 100, 580 300, 555 400 S 600 600, 610 900"
            fill="none"
            stroke="#dce8f5"
            strokeWidth="22"
            strokeLinecap="round"
            className="river-flow"
          />
          <text x="540" y="420" className="river-label">Sabarmati River</text>

          {/* Routes */}
          {routes.map((route, idx) => {
            const start = nodes.find((n) => n.id === route.source);
            const end = nodes.find((n) => n.id === route.target);
            if (!start || !end) return null;

            const isBridge = start.region !== end.region;
            const isHoverActive =
              hoveredNode &&
              !selectedNode &&
              (hoveredNode.id === start.id || hoveredNode.id === end.id);

            const isSelectedRoute = selected &&
              (selectedNode.id === start.id || selectedNode.id === end.id);

            const isDimmed = selectedNode && !isSelectedRoute;

            return (
              <line
                key={`route-${idx}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                className={`route-line 
                  ${isHoverActive ? 'route-active' : ''} 
                  ${isBridge ? 'route-bridge' : ''} 
                  ${isSelectedRoute ? 'route-selected' : ''}
                  ${isDimmed ? 'route-dimmed' : ''}`}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            const isSelected = selectedNode?.id === node.id;
            const isConnected = selected?.connectedIds.includes(node.id);
            const isDimmed = selectedNode && !isSelected && !isConnected;

            return (
              <g
                key={node.id}
                className={`node-group 
                  ${isHovered && !selectedNode ? 'node-hovered' : ''} 
                  ${isSelected ? 'node-selected' : ''} 
                  ${isConnected ? 'node-connected' : ''}
                  ${isDimmed ? 'node-dimmed' : ''}`}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
              >
                {/* Pulse ring for selected node */}
                {isSelected && (
                  <>
                    <circle cx={node.x} cy={node.y} r="30" className="pulse-ring pulse-1" />
                    <circle cx={node.x} cy={node.y} r="22" className="pulse-ring pulse-2" />
                  </>
                )}

                {/* Glow backdrop */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 18 : isConnected ? 12 : isHovered ? 12 : 8}
                  className="node-glow"
                />

                {/* Core shape: Shield for selected, circle for others */}
                {isSelected ? (
                  <g transform={`translate(${node.x - 10}, ${node.y - 13})`}>
                    <path
                      d="M10 1 L2 5 V11 C2 15.5 10 19 10 19 C10 19 18 15.5 18 11 V5 Z"
                      className="shield-icon"
                    />
                    <path
                      d="M7 10 L9.5 12.5 L13.5 7.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ) : isConnected ? (
                  <circle cx={node.x} cy={node.y} r={5} className="node-core connected-core" />
                ) : (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered && !selectedNode ? 5 : 3.5}
                    className={`node-core ${node.region}`}
                  />
                )}

                {/* Label */}
                {(isSelected || isConnected || (isHovered && !selectedNode)) && (
                  <text
                    x={node.x}
                    y={node.y - (isSelected ? 26 : 14)}
                    className={`node-label ${isSelected ? 'label-selected' : ''} ${isConnected ? 'label-connected' : ''}`}
                  >
                    {node.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip Card — hover (only when no selection) */}
      {hoveredNode && !selectedNode && (
        <div className="tooltip-card">
          <h3>{hoveredNode.name}</h3>
          <p className="region-tag">{hoveredNode.region === 'west' ? 'WEST' : 'EAST'} AHMEDABAD</p>
          <div className="tooltip-details">
            <small>
              Connected to{' '}
              {routes.filter(r => r.source === hoveredNode.id || r.target === hoveredNode.id).length}{' '}
              nearby areas
            </small>
          </div>
          <div className="tooltip-hint">Click to explore safe routes</div>
        </div>
      )}

      {/* Expanded Detail Panel — selection */}
      {selectedNode && (
        <div className="detail-panel">
          <div className="detail-header">
            <div className="detail-shield-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h3>{selectedNode.name}</h3>
              <p className="region-tag">{selectedNode.region === 'west' ? 'WEST' : 'EAST'} AHMEDABAD</p>
            </div>
            <button className="close-btn" onClick={() => setSelectedNode(null)}>×</button>
          </div>

          <div className="detail-routes">
            <h4>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Safe Routes ({selected.connectedIds.length})
            </h4>
            <ul>
              {selected.connectedIds.map(id => {
                const targetNode = nodes.find(n => n.id === id);
                return (
                  <li key={id} onClick={() => setSelectedNode(targetNode)}>
                    <span className={`route-dot ${targetNode.region}`}></span>
                    <span className="route-name">{targetNode.name}</span>
                    <span className="route-arrow">→</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapCanvas;
