import React from 'react';
import './DropDownBtn.css';
import ModuleIcon from '@mui/icons-material/TableRowsOutlined';
import LinkIcon from '@mui/icons-material/AttachFile';
import UploadIcon from '@mui/icons-material/FileUploadOutlined';

const DropDownBtn = ({ onAction }) => {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <p id='createText'>CREATE</p>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><button className="dropdown-item" onClick={() => onAction('createModule')}>{<ModuleIcon />}Create Module</button></li>
        <li><button className="dropdown-item" onClick={() => onAction('addLink')}>{<LinkIcon />}Add a link</button></li>
        <li><button className="dropdown-item" onClick={() => onAction('uploadFile')}>{<UploadIcon />}Upload</button></li>
      </ul>
    </div>
  );
};

export default DropDownBtn;
