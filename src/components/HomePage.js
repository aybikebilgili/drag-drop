import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DraggableComponent from "./DraggableComponent";
import PropertiesPanel from "./PropertiesPanel";

const HomePage = () => {
  //   localStorage.clear();
  const location = useLocation();
  const email = location.state?.email; // Kullanıcı emaili
  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);

  // LocalStorage'dan yükle
  useEffect(() => {
    if (email) {
      const savedComponents = localStorage.getItem(`design_${email}`);
      if (savedComponents) {
        setComponents(JSON.parse(savedComponents));
      }
    }
  }, [email]);

  // LocalStorage'a kaydet
  useEffect(() => {
    if (email) {
      localStorage.setItem(`design_${email}`, JSON.stringify(components));
    }
  }, [components, email]);

  const handleDrop = (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");

    if (id) {
      // Mevcut bileşen
      setComponents((prev) =>
        prev.map((component) =>
          component.id === parseInt(id, 10)
            ? {
                ...component,
                position: { x: e.clientX, y: e.clientY },
              }
            : component
        )
      );
    } else {
      const newComponent = {
        id: Date.now(),
        type,
        position: { x: e.clientX, y: e.clientY },
        width: 300,
        height: 50,
        backgroundColor: "#999",
        borderColor: "#fff",
        borderRadius: 10,
      };
      setComponents([...components, newComponent]);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSelect = (id) => {
    setSelectedComponentId(id);
  };

  const updateComponent = (id, updatedProperties) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? {
              ...comp,
              position: comp.position || { x: 0, y: 0 },
              ...updatedProperties,
            }
          : comp
      )
    );
  };

  const handleClickOutside = (e) => {
    if (e.target.closest(".properties-panel") === null) {
      setSelectedComponentId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const clearButton = () => {
    localStorage.removeItem(`design_${email}`);
    window.location.reload();
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <nav className="bg-gray-100 text-white flex justify-between items-center p-4 border-b-2 border-gray-200">
        <div className="flex items-center space-x-4 pl-10">
          <img
            src="https://profen.com/wp-content/uploads/2020/07/profen-red-logo.svg"
            alt="Logo"
            className="w-30 h-10"
          />
          {/* <span className="text-xl font-mono text-red-500 font-bold">
            PROFEN
          </span> */}
        </div>
        {/* <button
          onClick={onLogout}
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
        >
          Logout
        </button> */}
      </nav>
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sol Panel */}
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="font-mono mb-4 text-gray-500">Components</h2>
          <div
            className="p-2 bg-white text-gray-700 rounded mb-2 cursor-pointer"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("type", "input")}
          >
            Input
          </div>
          <div
            className="p-2 bg-white text-gray-700 rounded mb-2 cursor-pointer"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("type", "checkbox")}
          >
            Checkbox
          </div>
          <div
            className="p-2 bg-white text-gray-700 rounded mb-2 cursor-pointer"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("type", "image")}
          >
            Image Upload
          </div>
        </div>
        {/* Sağ Panel */}
        <div
          className="w-3/4 max-w-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div class="flex mt-5 mr-5 justify-end items-end">
            <button
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={clearButton}
            >
              Clear All
            </button>
          </div>
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              component={component}
              onSelect={() => handleSelect(component.id)}
              isSelected={selectedComponentId === component.id}
            />
          ))}
        </div>
      </div>
      {selectedComponentId && (
        <PropertiesPanel
          className="properties-panel"
          component={
            components.find((comp) => comp.id === selectedComponentId) || {}
          }
          updateComponent={(updatedProperties) =>
            updateComponent(selectedComponentId, updatedProperties)
          }
        />
      )}
    </div>
  );
};

export default HomePage;
