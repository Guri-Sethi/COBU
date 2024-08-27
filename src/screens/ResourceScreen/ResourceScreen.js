import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBackOutlined';
import './ResourceScreen.css';
import { useModule } from '../../components/ModuleContext/ModuleContext';
import ResourceCard from '../../components/ResourceCard/ResourceCard';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const ResourceScreen = ({ resources, modules, onAction, onDelete }) => {
  const { id } = useParams();
  const { setCurrentModuleId } = useModule();
  const [moduleResources, setModuleResources] = useState([]);
  const [moduleName, setModuleName] = useState('');

  

  useEffect(() => {
    setCurrentModuleId(id);
    const filteredResources = resources.filter(resource => resource.moduleId === id);
    setModuleResources(filteredResources);

    const module = modules.find(module => module.id === id);
    if (module) {
      setModuleName(module.name);
    }
  }, [id, resources, modules, setCurrentModuleId]);

  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className='resourceContainer'>
      <div className='resource-head'>
        <h1 className='resource-title'>Resources for {moduleName} :</h1>
        <button className='back-btn' onClick={handleBack}><BackIcon id='back-icon' /></button>
      </div>
      {moduleResources.length === 0 ? (
        <p id='no-resource'>No resources available!</p>
      ) : (
        <Droppable droppableId="resources">
          {(provided) => (
            <div className='resource-card-wrapper' ref={provided.innerRef} {...provided.droppableProps}>
              {moduleResources.map((resource, index) => (
                <Draggable key={resource.id} draggableId={resource.dragId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ResourceCard
                        resource={resource}
                        onEdit={onAction}
                        onDelete={() => onDelete(resource.id, false)}
                        color={resource.color}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default ResourceScreen;
