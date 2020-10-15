import { Button, ButtonProps } from '@chakra-ui/core';
import { useSession } from 'next-auth/client';
import NextLink, { LinkProps } from 'next/link';
import { FC } from 'react';

export default function SessionButtons(buttonProps?: ButtonProps) {
  const [session, isSessionLoading] = useSession();

  const LinkButton: FC<LinkProps> = (linkProps) => (
    <NextLink {...linkProps}>
      <Button isLoading={isSessionLoading} {...buttonProps}>
        {linkProps.children}
      </Button>
    </NextLink>
  );

  return (
    <>
      <LinkButton href="/api/auth/signin">
        {session ? 'Link Account' : 'Sign Up or Sign In'}
      </LinkButton>
      {session && (
        <LinkButton href="/api/auth/signout">{'Sign Out'}</LinkButton>
      )}
    </>
  );
}
