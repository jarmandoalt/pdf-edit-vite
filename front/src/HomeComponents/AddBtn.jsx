import { Link } from 'react-router-dom' 

const AddBtn = ({onClick}) => {
    return (
        <Link to='/home/user/new'>
           <button className='addBtn'>Crear Plantilla</button>
        </Link>
    )
}

export default AddBtn