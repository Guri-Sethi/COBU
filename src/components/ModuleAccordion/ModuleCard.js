import React from 'react'
import './ModuleCard.css'
import DropUpBtn from '../DropUpBtn/DropUpBtn'
const ModuleCard = ({module , onClick , color,onAction,onDelete}) => {
  const handleEdit = () => {
    onAction('editModule',module.id,module);
  }
  
  return (
    <div className='module-card' >
      <div className='module-card-head' onClick={onClick} style={{backgroundColor:color}}>{module.name}</div>
      <div className='module-card-foot'>
        <DropUpBtn onEdit={handleEdit} onDelete={onDelete}/>
      </div>
    </div>
  )
}

export default ModuleCard
