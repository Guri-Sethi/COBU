import React, { useState, useEffect } from 'react';
import { useModule } from '../ModuleContext/ModuleContext';
import './Dialog.css';

const Dialog = ({ open, onClose, onConfirm, action , currentItem}) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [file,setFile] = useState();

  const {currentModuleId} = useModule();

  useEffect(() => {
    if (!open) {
      setName('');
      setValue('');
      setFile(null);
    }
  }, [open]);

  useEffect(()=>{
    if(currentItem){
      setName(currentItem.name || '');
      setValue(currentItem.value || '');
    }
  },[currentItem]);

  const handleConfirm = () => {
    console.log("Name: ",name,"Value: ",value,"File: ",file,"Current Module Id: ",currentModuleId)
    onConfirm(name, value,file, currentModuleId);
  };

  return (
    open && (
      <div className='dialog'>
        <div className='dialogContent'>
          <h4 className='dialog-label'>{action === 'createModule' ? 'Create Module' : action==='addLink'||action==='uploadFile'? 'Add Resource':'Edit Item'}</h4>
          <input
            className='nameInput'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {action === 'addLink' && (
            <div>
              <h4 className='dialog-label'>Enter URL:</h4>
              <input
                className='nameInput'
                type='text'
                placeholder='Link'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          )}
          {action === 'uploadFile' && (
            <div>
              <h4 className='dialog-label'>Choose Resource:</h4>
              <input
                id='fileInput'
                type='file'
                value={value}
                onChange={(e) =>{
                  setFile(e.target.files[0]);}}
              />
            </div>
          )}
          <div className='btns'>
            <button className='inputBtns' id='confirmBtn' onClick={handleConfirm}>Confirm</button>
            <button className='inputBtns' id='cancelBtn' onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Dialog;
