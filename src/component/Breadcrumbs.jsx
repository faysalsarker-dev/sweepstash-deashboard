/* eslint-disable react/prop-types */

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const BasicBreadcrumbs = ({ links }) => {


  return (
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link, index) => (
          link.href ? (
            <Link 
              key={index} 
              underline="hover" 
              color="inherit" 
              href={link.href}
            >
              {link.label}
            </Link>
          ) : (
            <Typography key={index} className='text-primary'>
              {link.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BasicBreadcrumbs;
