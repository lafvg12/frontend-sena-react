import PropTypes from 'prop-types';
import './users.css';
import { UIButton } from '../Button';

export const UIUsers = ({ data, onDelete, onEdit }) => {
  const { id, email, rol } = data;

  return (
    <div className='container-users'>
      <p>{id}</p>
      <h3>{email}</h3>
      <p>{rol || 'admin'}</p>
      <UIButton name='delete' classColor='button-users' callback={() => onDelete(id)} />
      <UIButton name='edit' classColor='button-users' callback={() => onEdit(data)} />
    </div>
  );
}

UIUsers.propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}
