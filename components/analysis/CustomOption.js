import PropTypes from 'prop-types';
import { components } from 'react-select';

const CustomOption = ({ children, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const { onMouseMove, onKeyPress, onInput, onLoad, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return (
        <components.Option {...newProps} className="custom-option">
            {children}
        </components.Option>
    );
};

CustomOption.propTypes = {
    innerProps: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

export default CustomOption;