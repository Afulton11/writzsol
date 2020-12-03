import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  useToast,
  Checkbox,
} from '@chakra-ui/core'
import {
  GET_USER_WEBSITES,
  useCreateWebsiteMutation,
} from '../../lib/graphql/client/website'
import { useUser } from '../../utils/hooks/useUser'
import { useCreateWebsite } from '../../lib/graphql/client/hooks/useCreateWebsite'

export function CreateWebsiteModal({ openAuthModal, disabled }) {
  const [user, isUserLoading] = useUser()
  const initialRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const { handleSubmit, register, errors } = useForm()

  const [status, setStatus] = useState('PRIVATE')
  const { createWebsite, loading } = useCreateWebsite()

  const onCreateWebsite = async (
    { title, location, defaultTheme, status },
    onClose
  ) => {
    const { errors } = await createWebsite({
      title,
      location,
      defaultTheme,
      status,
    })

    if (errors) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create user website. Are you logged in?',
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    }

    onClose()
  }

  const onOpenCreateModal = () => {
    if (!isUserLoading && !user) {
      return openAuthModal()
    }

    onOpen()
  }

  return (
    <>
      <Button
        onClick={onOpenCreateModal}
        leftIcon="add"
        variant="solid"
        variantColor="green"
        minH="40px"
        w="100%"
        disabled={disabled}
      >
        Create New Website
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="25rem"
      >
        <ModalOverlay />
        <ModalContent borderRadius={4}>
          <form
            onSubmit={handleSubmit((data) => {
              onCreateWebsite(
                {
                  status,
                  title: data.title,
                  location: data.location,
                  defaultTheme: data.defaultTheme,
                },
                onClose
              )
            })}
          >
            <ModalHeader>Create New Website</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.title && errors.title.message}>
                <FormLabel>Website Title</FormLabel>
                <Input
                  name="title"
                  ref={register({
                    required: 'Please type a website title',
                  })}
                  placeholder="Writzsol"
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={errors.location && errors.location.message}
              >
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  ref={register({
                    required: 'Please enter a site location.',
                  })}
                  placeholder="andrew.writzsol.com"
                />
                <FormErrorMessage>
                  {errors.location && errors.location.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={errors.defaultTheme && errors.defaultTheme.message}
              >
                <FormLabel>Default Theme</FormLabel>
                <Input
                  name="defaultTheme"
                  ref={register({
                    required: 'Please type a default theme.',
                  })}
                  placeholder="light"
                />
                <FormErrorMessage>
                  {errors.defaultTheme && errors.defaultTheme.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mt={4}>
                <Checkbox
                  onChange={(e) =>
                    setStatus(e.target.value ? 'PUBLISHED' : 'PRIVATE')
                  }
                >
                  Make Public
                </Checkbox>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                isLoading={loading}
                type="submit"
                leftIcon="check"
                variantColor="green"
                ml={3}
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
