import { Link } from 'react-router-dom' 

const AddBtn = ({onClick}) => {
    return (
        <Link className='btn_add' to='/home/user/new'>
           <button className='add btnRoot'>Add</button>
        </Link>
    )
}

export default AddBtn