import PropTypes from 'prop-types';

const UIButton = ( { name } ) => {

    return (
        <>
        <button>{name}5656</button>
        </>
    )
}

UIButton.propTypes = {
    name: PropTypes.string.isRequired
}

export { UIButton}