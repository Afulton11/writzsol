import { ReactNode, FC } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/core'
import { useCreatePage } from '../../lib/graphql/client/hooks'
import { Page } from '../../lib/graphql/server'

interface CreatePageFormProps {
  location: string
  onCompleted: (createdPage: Page) => void
  createFormButtons: (isLoading: boolean) => ReactNode
  [rest: string]: any
}

export const CreatePageForm: FC<CreatePageFormProps> = ({
  websiteId,
  createFormButtons,
  onCompleted,
  ...rest
}) => {
  const toast = useToast()
  const { handleSubmit, register, errors } = useForm()
  const { createPage, mutationState } = useCreatePage()

  const formButtons = createFormButtons(mutationState.loading)

  const onCreatePage = async ({ path }) => {
    const { createdPage, errors } = await createPage({
      path,
      websiteId,
    })

    if (errors) {
      toast({
        title: 'Something went wrong.',
        description: 'Unable to create page. Are you logged in?',
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    }

    onCompleted(createdPage)
  }

  return (
    <form onSubmit={handleSubmit(onCreatePage)}>
      <Box {...rest}>
        <FormControl isInvalid={errors.path && errors.path.message}>
          <FormLabel>Path</FormLabel>
          <Input
            name="path"
            aria-aria-describedby="path-helper-text"
            ref={register({
              required: 'Please type a path. ',
            })}
            placeholder="Path"
          />
          <FormHelperText id="path-helper-text">
            {'A path is the ending of the website\'s url. e.g. "blog/dayOne"'}
          </FormHelperText>
          <FormErrorMessage>
            {errors.path && errors.path.message}
          </FormErrorMessage>
        </FormControl>

        {formButtons}
      </Box>
    </form>
  )
}
