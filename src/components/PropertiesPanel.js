import React from "react";

const PropertiesPanel = ({ component, updateComponent }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateComponent({ [name]: value });
  };

  const handlePanelClick = (e) => {
    e.stopPropagation(); // Panel üzerine tıklanmasını engelle
  };

  return (
    <div
      className="w-1/4 bg-gray-100 p-4 mt-5 shadow-md properties-panel"
      onClick={handlePanelClick}
    >
      <h2 className="font-mono mb-4 text-gray-500">Properties</h2>
      <label className="font-mono mb-4 text-gray-500">
        <span>Left:</span>
        <input
          type="number"
          name="position.x"
          value={component.position?.x || ""}
          onChange={(e) =>
            updateComponent({
              position: {
                ...component.position,
                x: parseInt(e.target.value, 10),
              },
            })
          }
          className="block w-full p-2 border rounded"
        />
      </label>
      <label className="font-mono mb-4 text-gray-500">
        <span>Top:</span>
        <input
          type="number"
          name="position.y"
          value={component.position?.y || ""}
          onChange={(e) =>
            updateComponent({
              position: {
                ...component.position,
                y: parseInt(e.target.value, 10),
              },
            })
          }
          className="block w-full p-2 border rounded"
        />
      </label>
      <label className="font-mono mb-4 text-gray-500">
        <span>Width:</span>
        <input
          type="number"
          name="width"
          value={component.width || ""}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        />
      </label>
      <label className="font-mono mb-4 text-gray-500">
        <span>Height:</span>
        <input
          type="number"
          name="height"
          value={component.height || ""}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        />
      </label>
      <label className="font-mono mb-4 text-gray-500">
        <span>Background Color:</span>
        <input
          type="color"
          name="backgroundColor"
          value={component.backgroundColor || "#ffffff"}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        />
      </label>
      <label className="font-mono mb-4 text-gray-500">
        <span>Border Color:</span>
        <input
          type="color"
          name="borderColor"
          value={component.borderColor || "#000000"}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        />
      </label>
    </div>
  );
};

export default PropertiesPanel;
