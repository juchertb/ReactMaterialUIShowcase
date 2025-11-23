import * as React from 'react';
import Link, { LinkProps } from '@mui/material/Link';
import { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  useLocation,
} from 'react-router';
import HomeIcon from "@mui/icons-material/Home";

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  '/authentication': 'Authentication',
  '/database': 'Database',
  '/storage': 'Storage',
  '/hosting': 'Hosting',
  '/functions': 'Functions',
  '/machine-learning': 'Machine Learning',
  '/profile': 'Profile',
  "/settings": "Settings",
  "/sales": "Sales",
  "/analytics": "Analytics",
  "/ecommerce": "Ecommerce",
  "/ecommerce/products": "Products",
  "/ecommerce/orders": "Orders"
};

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton component={RouterLink as any} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItemButton>
    </li>
  );
}

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

export default function RouterBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const objectName: string = location.state?.objectName;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white", marginTop: "5px" }}>
      <LinkRouter underline="hover" color="inherit" to="/analytics">
        <HomeIcon />
      </LinkRouter>
      {pathnames.map((value, index) => {
        let last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        // when the route cannot be found then it is likely the item id.
        // Should not be a hyperlink in this case
        let name: string = breadcrumbNameMap[to];
        if (!name) {
          name = to.substring(to.lastIndexOf('/') + 1, to.length);
          last = true;
        }
        return last ? (
          <Typography key={to} sx={{ color: 'white' }}>
            {
              //decodeURI(name)
              objectName}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {name}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}