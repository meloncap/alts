import React from 'react';
import VirtualList from 'react-tiny-virtual-list';
import PropTypes from 'prop-types';

const DefaultItemHeight = 40;

export default class CustomMenuList extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    maxHeight: PropTypes.number.isRequired,
    getValue: PropTypes.func.isRequired
  }

  renderItem = (props) => {
    const { children } = this.props;
    if (Array.isArray(children)) {
      return (
        <li style={props.style} key={props.index}>
          {children[props.index]}
        </li>
      );
    }
    return (
      <li
        key={props.index}
        className="react-virtualized-menu-placeholder"
      >
        {children.props.children}
      </li>
    );
  }

  render() {
    const { options, children, maxHeight, getValue } = this.props;

    const [value] = getValue();
    const initialOffset = options.indexOf(value) * DefaultItemHeight;
    const childrenOptions = React.Children.toArray(children);
    const wrapperHeight = maxHeight < childrenOptions.length * DefaultItemHeight ?
      maxHeight : childrenOptions.length * DefaultItemHeight;

    return (
      <span className="react-virtualized-list-wrapper">
        <VirtualList
          width="100%"
          height={wrapperHeight + 6}
          scrollOffset={initialOffset}
          itemCount={childrenOptions.length}
          itemSize={DefaultItemHeight}
          renderItem={this.renderItem}
        />
      </span>
    );
  }
}