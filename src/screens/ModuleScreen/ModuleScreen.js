import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModuleScreen.css';
import ModuleCard from '../../components/ModuleAccordion/ModuleCard';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const ModuleScreen = ({ modules, onAction, onDelete }) => {
  console.log("ModuleScreen re-rendered with modules:", modules);
  const navigate = useNavigate();
  const handleModuleClick = (id) => {
    navigate(`/module/${id}`);
  };

  return (
    <Droppable droppableId="module">
      {(provided) => (
        <div className='moduleContainer' ref={provided.innerRef} {...provided.droppableProps}>
          {modules.length === 0 ? (
            <p id='noContent'>Sorry! No content available</p>
          ) : (
            <div className='module-card-wrapper'>
              {modules.map((module, index) => (
                <Draggable key={module.id} draggableId={module.dragId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ModuleCard
                        module={module}
                        onAction={onAction}
                        onDelete={() => onDelete(module.id, true)}
                        onClick={() => handleModuleClick(module.id)}
                        color={module.color}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default ModuleScreen;
