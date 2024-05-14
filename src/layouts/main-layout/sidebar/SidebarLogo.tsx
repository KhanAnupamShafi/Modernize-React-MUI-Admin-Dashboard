import { Link, Typography } from '@mui/material';
import Logo from 'components/icons/brand/Logo';

const SidebarLogo = () => {
  return (
    <Link
      href="/"
      sx={(theme) => ({
        height: theme.spacing(8.5),
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1.5),
        // pl: theme.spacing(2.5),
      })}
    >
      <Logo fontSize={'large'} />
      <Typography variant="h4">Modernize</Typography>
    </Link>
  );
};

export default SidebarLogo;
