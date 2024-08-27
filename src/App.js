import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ModuleScreen from './screens/ModuleScreen/ModuleScreen';
import ResourceScreen from './screens/ResourceScreen/ResourceScreen';
import Dialog from './components/Dialog/Dialog';
import { ModuleProvider } from './components/ModuleContext/ModuleContext';
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext } from 'react-beautiful-dnd';
function App() {
  const [modules, setModules] = useState([]);
  const [resources, setResources] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const colors1 = ["green", "orange", "red", "darkyellow", "skyblue", "purple"];
  const colors2 = ["red","daryellow","skybule","purple","green","orange"];
  const colors3 = ["orange","daryellow","red","purple","green","skyblue"];

  const handleDialogOpen = (action, moduleId = null, item = null) => {
    setDialogAction(action);
    setDialogOpen(true);
    setCurrentModuleId(action === 'createModule' ? null : moduleId);
    setCurrentItem(item);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentModuleId(null);
    setCurrentItem(null);
  };

  const handleRenameItem = (itemId, newName, isModule) => {
    if (isModule) {
      setModules(modules.map((module) => (module.id === itemId ? { ...module, name: newName } : module)));
    } else {
      setResources(resources.map((resource) => (resource.id === itemId ? { ...resource, name: newName } : resource)));
    }
  };

  const handleDeleteItem = (itemId, isModule) => {
    if (isModule) {
      setModules(modules.filter((module) => module.id !== itemId));
    } else {
      setResources(resources.filter((resource) => resource.id !== itemId));
    }
  };

  const handleConfirm = (name, value, file, currentModuleId) => {
    if (dialogAction === 'createModule') {
      const colorIndex1 = Math.floor(Math.random() * colors1.length);
      const newModule = {
        id: uuidv4(),
        name,
        dragId: `module-${uuidv4()}`,
        color:colors1[colorIndex1],
      };
      console.log(newModule);
      setModules(prevModules => [...prevModules, newModule]);
      console.log(newModule);
    } else if (dialogAction === 'addLink') {
      const colorIndex2 = Math.floor(Math.random()*colors2.length);
      const newResource = {
        id: uuidv4(),
        moduleId: currentModuleId,
        dragId: `resource-${uuidv4()}`,
        name,
        value,
        type: 'link',
        color:colors2[colorIndex2]
      };
      setResources(prevResources => [...prevResources, newResource]);
    } else if (dialogAction === 'uploadFile') {
      const colorIndex3 = Math.floor(Math.random()*colors3.length);
      const newFile = {
        id: uuidv4(),
        moduleId: currentModuleId,
        dragId: `resource-${uuidv4()}`,
        name,
        file,
        type: 'file',
        color:colors3[colorIndex3]
      };
      setResources(prevResources => [...prevResources, newFile]);
    } else if (dialogAction === 'editModule' || dialogAction === 'editResource') {
      handleRenameItem(currentItem.id, name, dialogAction === 'editModule');
    }
    handleDialogClose();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;

    console.log("Drag event:", { source, destination, draggableId });
    
    if (draggableId.startsWith("module")) {
      const newModules = Array.from(modules);
      const [removed] = newModules.splice(source.index, 1);
      newModules.splice(destination.index, 0, removed);
      setModules(newModules);
    } else {
      const newResources = Array.from(resources);
      const [removed] = newResources.splice(source.index, 1);
      newResources.splice(destination.index, 0, removed);
      setResources(newResources);
    }
  };

  

  return (
    <ModuleProvider>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Router>
          <Navbar onAction={handleDialogOpen} />
          <Routes>
            <Route exact path='/' element={
              <ModuleScreen
                modules={modules}
                onAction={handleDialogOpen}
                onDelete={handleDeleteItem}
                setModules={setModules}
              />
            } />
            <Route path='/module/:id' element={
              <ResourceScreen
                resources={resources}
                modules={modules}
                onAction={handleDialogOpen}
                onDelete={handleDeleteItem}
              />
            } />
          </Routes>
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            onConfirm={handleConfirm}
            action={dialogAction}
            currentItem={currentItem}
            currentModuleId={currentModuleId}
          />
        </Router>
      </DragDropContext>
    </ModuleProvider>
  );
}

export default App;
