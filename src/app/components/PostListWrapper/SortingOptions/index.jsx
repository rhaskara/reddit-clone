"use client"

import { SortOptions } from '@/utils';
import { ButtonGroup, Flex } from '@chakra-ui/react';
import NavLink from '@/app/components/NavLink';
import { useSelector } from 'react-redux';

const SortComponent = ({
  subreddit,
  sortOption
}) => {
  const loading = useSelector((state) => state.listing.loading);

  return (
    <ButtonGroup spacing="4">
      <NavLink href={`/r/${subreddit}/hot`} disabled={(loading || sortOption === SortOptions.HOT)}>Hot</NavLink>
      <NavLink href={`/r/${subreddit}/new`} disabled={(loading || sortOption === SortOptions.NEW)}>New</NavLink>
      <NavLink href={`/r/${subreddit}/top`} disabled={(loading || sortOption === SortOptions.TOP)}>Top</NavLink>
    </ButtonGroup>
  );
};

export default SortComponent;
