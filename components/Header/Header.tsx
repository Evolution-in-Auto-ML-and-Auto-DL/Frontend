import {
  createStyles,
  Header,
  // HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  // SimpleGrid,
  ThemeIcon,
  // Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  Image,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const user = {
    "name": "Athena",
    "image": "https://cdn-icons-png.flaticon.com/512/1483/1483105.png",
    "image2": "https://cdn-icons-png.flaticon.com/512/1430/1430162.png",
  };

  return (
    <Box pb={40}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Title order={3}>Athena</Title>

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="#" className={classes.link}>
              Home
            </a>

            <a href="#" className={classes.link}>
              Features
            </a>
            <a href="#about-us" className={classes.link}>
              About
            </a>
            <a href="#" className={classes.link}>
              Support
            </a>
          </Group>

          {user ? (
          <>
            <Group className={classes.hiddenMobile}>
            <Text>{user.name}</Text>
              {user?.image ? (<Image
                src={user?.image2}
                radius="md"
                width={40}
                height={40}
              />) : (<>Image Placeholder</>)}
              <ColorSchemeToggle />
            </Group>
          </>
          ) : (
          <>
            <Group className={classes.hiddenMobile}>
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
              <ColorSchemeToggle />
            </Group>
          </>)}

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Features
          </a>
          <a href="/about-us" className={classes.link}>
            About Us
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Group position="center">
            <ColorSchemeToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
