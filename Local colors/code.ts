// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  // This plugin creates rectangles on the screen.
  const numberOfRectangles = 5;

  const nodes: SceneNode[] = [];
  for (let i = 0; i < numberOfRectangles; i++) {
    const rect = figma.createRectangle();
    rect.x = i * 150;
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    figma.currentPage.appendChild(rect);
    nodes.push(rect);
  }
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
}

// Runs this code if the plugin is run in FigJam
if (figma.editorType === 'figjam') {
  // This plugin creates shapes and connectors on the screen.
  const numberOfShapes = 5;

  const nodes: SceneNode[] = [];
  for (let i = 0; i < numberOfShapes; i++) {
    const shape = figma.createShapeWithText();
    // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
    shape.shapeType = 'ROUNDED_RECTANGLE';
    shape.x = i * (shape.width + 200);
    shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    figma.currentPage.appendChild(shape);
    nodes.push(shape);
  }

  for (let i = 0; i < numberOfShapes - 1; i++) {
    const connector = figma.createConnector();
    connector.strokeWeight = 8;

    connector.connectorStart = {
      endpointNodeId: nodes[i].id,
      magnet: 'AUTO',
    };

    connector.connectorEnd = {
      endpointNodeId: nodes[i + 1].id,
      magnet: 'AUTO',
    };
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
}
