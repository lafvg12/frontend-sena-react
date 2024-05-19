import PropTypes from 'prop-types';

const UIButton = ( { name, classColor, callback } ) => {

    return (
        <>
        <button onClick={callback} className={classColor}>{name}</button>
        </>
    )
}

UIButton.propTypes = {
    name: PropTypes.string.isRequired,
    classColor: PropTypes.string.isRequired,
    callback: PropTypes.func
}

export { UIButton}