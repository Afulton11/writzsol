import React, { useRef } from 'react'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  Button,
} from '@chakra-ui/core'
import { CreatePageForm } from '../forms'

export function CreatePageModal({ websiteId, disabled }) {
  const initialRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon="add"
        variant="solid"
        variantColor="green"
        minH="40px"
        maxW="lg"
        disabled={disabled}
      >
        Create New Page
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="25rem"
      >
        <ModalOverlay />
        <ModalContent borderRadius={4}>
          <ModalHeader>Create New Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreatePageForm
              websiteId
              onCompleted={onClose}
              createFormButtons={(isLoading) => (
                <ModalFooter pr={0}>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    leftIcon="check"
                    variantColor="green"
                    ml={3}
                  >
                    Create
                  </Button>
                </ModalFooter>
              )}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
