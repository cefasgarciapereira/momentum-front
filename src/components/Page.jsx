import { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { usePageStyles } from './styles';

const Page = forwardRef(({ title, children, className, ...rest }, ref) => {
  const classes = usePageStyles();
  return (
    <div ref={ref} {...rest} className={className ? className : classes.root}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Page;