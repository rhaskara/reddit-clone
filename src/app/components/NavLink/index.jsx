"use client"

import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

const NavLink = ({ href, children, disabled }) => {
  return (
    <NextLink href={href} passHref>
      <Button variant="link" size="sm" isDisabled={disabled}>
        {children}
      </Button>
    </NextLink>
  );
};

export default NavLink;