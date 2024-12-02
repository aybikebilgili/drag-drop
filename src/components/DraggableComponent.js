import React, { useState } from "react";

const DraggableComponent = ({ component, onSelect, isSelected }) => {
  // component.position'ın undefined olma durumunu kontrol et
  const position = component.position || { x: 0, y: 0 };

  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    e.dataTransfer.setData("id", component.id);
    e.dataTransfer.setData("type", component.type);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    onSelect({
      position: {
        x: position.x + deltaX,
        y: position.y + deltaY,
      },
    });
  };

  return (
    <div
      id={component.id}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${component.width}px`,
        height: `${component.height}px`,
        backgroundColor: component.backgroundColor,
        borderColor: component.borderColor,
        borderWidth: "2px",
        borderStyle: "solid",
        cursor: dragging ? "grabbing" : "grab",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onSelect(component.id)}
      className={`p-2 ${isSelected ? "border-2 border-blue-500" : ""}`}
    >
      {component.type === "input" && <input />}
      {component.type === "checkbox" && <input type="checkbox" />}
      {component.type === "image" && <input type="file" />}
    </div>
  );
};

export default DraggableComponent;
