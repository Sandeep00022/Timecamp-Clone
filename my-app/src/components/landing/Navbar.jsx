import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import Logo from "../landing/images/logo.svg"

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    
    <Box w='100%'  zIndex='11' position='sticky' top='0'>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('black', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>


        <Flex py='5' flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'start', md:'start',lg: 'left' })}
            fontFamily={'heading'}
            ml={{base:0,md:0,lg:'8rem'}}
            color={useColorModeValue('gray.800', 'white')}>
                <img src={Logo} alt="Logo"  />
          </Text>

          <Flex display={{ base: 'none', md: 'none',lg:'flex' }} ml={20}>
            <DesktopNav />
          </Flex>
        </Flex>

        
        <Stack
          flex={{ base: 1, md: 1,lg:0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          <Flex
          flex={{ base: 1, md:1,lg: 'auto' }}
          ml={{ base: -2 }}
          justify={'flex-end'}
          display={{ base: 'flex', md:'flex',lg: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex> 

        </Stack>

      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
   
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('black', 'gray.200');
  const linkHoverColor = useColorModeValue('black', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex direction={'row'}  alignItems='center' gap='2rem'>
      {NAV_ITEMS.map((navItem) => (
        <Flex  key={navItem.label}  >
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Flex>
      ))}
      <Button bgColor="#f7b801" color='white' borderRadius='20px' px='5'>Start tracking time</Button>
    </Flex>
  );
};

const DesktopSubNav = ({ label, href }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('#25cf60', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
       
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'white' }}
            fontWeight={500}>
            {label}
          </Text>


        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'white'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ lg: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Button bgColor="#f7b801" color='white' borderRadius='20px' px='5'>Start tracking time</Button>

    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
    
  );
};



const NAV_ITEMS = [
  {
    label: 'Features',
    children: [
      {
        label: 'Productivity tracking',
        href: '#',
      },
      {
        label: 'Automatic time tracking',
        href: '#',
      },
      {
        label: 'Reporting',
        href: '#',
      },
      {
        label: 'Timesheet approvals',
        href: '#',
      },
      {
        label: 'Invoicing',
        href: '#',
      },
      {
        label: 'Billing rates and budgeting',
        href: '#',
      },
      {
        label: 'Attendance',
        href: '#',
      },
    ],
  },
  {
    label: 'Pricing',
    href: '#',
  },
  {
    label: 'Integrations',
    children: [
      {
        label: 'Trello',
        href: '#',
      },
      {
        label: 'Google Calender',
        href: '#',
      },
      {
        label: 'iCal',
        href: '#',
      },
      {
        label: 'Asana',
        href: '#',
      },
      {
        label: 'Monday.com',
        href: '#',
      },
      {
        label: 'Jira',
        href: '#',
      },
      {
        label: 'All integrations',
        href: '#',
      }
    ],
  },
  
  {
    label: 'Blog',
    href: '#',
  },
  {
    label: 'Book a Demo',
    href: '#',
  },
  {
    label: 'Sign in',
    href: '/loginpage',
  },
];