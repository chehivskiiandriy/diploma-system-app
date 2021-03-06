import { Children, isValidElement } from 'react';
import { useSelector } from 'react-redux';

import { userRoleSelector } from '../store/user/selectors';

const SwitchByRole = ({ children }) => {
  const type = useSelector(userRoleSelector);

  let element = null;

  Children.forEach(children, child => {
    if (!element && isValidElement(child) && child.props.type === type) {
      element = child;
    }
  });

  return element;
};

export default SwitchByRole;
