import React from 'react'
import './DropUpBtn.css'
import EditIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
const DropUpBtn = ({onEdit,onDelete}) => {
    return (
        <>
            <div className="btn-group dropdown" >
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id='edit-dropdown'>
                    <EditIcon/>
                </button>
                <ul className="dropdown-menu" id='edit-dropdown-menu'>
                    <li><button className='edit-btns' onClick={onEdit}>Edit</button></li>
                    <li><button onClick={onDelete} className='edit-btns'><DeleteIcon/></button></li>
                </ul>
            </div>
        </>
    )
}

export default DropUpBtn
