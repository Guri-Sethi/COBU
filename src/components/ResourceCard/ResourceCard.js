import React from 'react';
import './ResourceCard.css';
import DropUpBtn from '../DropUpBtn/DropUpBtn';

const ResourceCard = ({ resource, onEdit, onDelete, color }) => {
  const handleEdit = () => {
    onEdit('editResource', resource.moduleId, resource);
  };

  const handlePreview = () => {
    const fileUrl = URL.createObjectURL(resource.file);
    window.open(fileUrl, '_blank');
  };

  const getFileName = (file) => {
    return file.name;
  };

  return (
    <div className='resource-card'>
      <div className='resource-card-head' style={{ backgroundColor: color }}>
        <h3 style={{ fontSize: 32, fontFamily: 'Roboto' }}>
          {resource.name}
        </h3>
        <div className='resource-card-btns'>
          <DropUpBtn onEdit={handleEdit} onDelete={onDelete} />
        </div>
      </div>
      <div className='resource-card-body'>
        {resource.type === 'link' ? (
          <a className='resource-card-value' href={resource.value} target='_blank' rel='noreferrer'>{resource.value}</a>
        ) : (
          <button className='resource-card-value' onClick={handlePreview}>
            {getFileName(resource.file)}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
