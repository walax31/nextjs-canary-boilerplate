import {Box, Button, Checkbox, Container, FormHelperText, TextField, Typography} from '@material-ui/core'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import Joi from 'joi'
import {joiResolver} from '@hookform/resolvers/joi'
import {FC, FormEvent} from 'react'
import NextLink from '../components/Link'

interface FormData {
  email: string
  firstName: string
  lastName: string
  password: string
  policy: boolean
}

const schema = Joi.object({
  email: Joi.string().email({tlds: {allow: false}}).max(255).required(),
  firstName: Joi.string().max(255).description('First name is required').required(),
  lastName: Joi.string().max(255).description('Last name is required').required(),
  password: Joi.string().max(255).description('password is required').required(),
  policy: Joi.boolean().invalid(false),
})

const RegisterPage: FC = () => {
  const router = useRouter()
  const {register, handleSubmit, errors, formState, getValues} = useForm<FormData>({
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false,
    },
    mode: 'all',
  })

  const touched = formState.touched
  const values = getValues()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('sdsdsd')
    alert(JSON.stringify(formState, null, 2))

    void router.push('/dashboard')
  }

  return (
      <>
        <Head>
          <title>Register | Material Kit</title>
        </Head>
        <Box
            sx={{
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
            }}
        >
          <Container maxWidth='sm'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{mb: 3}}>
                <Typography
                    color='textPrimary'
                    variant='h2'
                >
                  Create new account
                </Typography>
                <Typography
                    color='textSecondary'
                    gutterBottom
                    variant='body2'
                >
                  Use your email to create new account
                </Typography>
                <code>
                  {JSON.stringify(formState.errors)}
                </code>
                <hr />
                <code>
                  {JSON.stringify(touched)}
                </code>
                <hr />
                <code>
                  {JSON.stringify(errors)}
                </code>
              </Box>
              <TextField
                  error={Boolean(errors.firstName?.message)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName?.message}
                  label='First name'
                  margin='normal'
                  name='firstName'
                  inputRef={register}
                  value={values.firstName}
                  variant='outlined'
              />
              <TextField
                  error={Boolean(errors.lastName?.message)}
                  fullWidth
                  helperText={errors.lastName?.message}
                  label='Last name'
                  margin='normal'
                  name='lastName'
                  inputRef={register}
                  value={values.lastName}
                  variant='outlined'
              />
              <TextField
                  error={Boolean(errors.email?.message)}
                  fullWidth
                  helperText={errors.email?.message}
                  label='Email Address'
                  margin='normal'
                  name='email'
                  inputRef={register}
                  type='email'
                  value={values.email}
                  variant='outlined'
              />
              <TextField
                  error={Boolean(errors.password?.message)}
                  fullWidth
                  helperText={errors.password?.message}
                  label='Password'
                  margin='normal'
                  name='password'
                  inputRef={register}
                  type='password'
                  value={values.password}
                  variant='outlined'
              />
              <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1,
                  }}
              >
                <Checkbox
                    checked={values.policy}
                    name='policy'
                    inputRef={register}
                />
                <Typography
                    color='textSecondary'
                    variant='body1'
                >
                  I have read the
                  {' '}
                  <NextLink href='#' color='primary' underline='always' variant='h6'>
                    Terms and Conditions
                  </NextLink>
                </Typography>
              </Box>
              {Boolean(errors.policy?.message) && (
                  <FormHelperText error>
                    This field must be checked
                  </FormHelperText>
              )}
              <Box sx={{py: 2}}>
                <Button
                    color='primary'
                    // disabled={formState.isSubmitted && !formState.isDirty}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                >
                  Sign up now
                </Button>
              </Box>
              <Typography
                  color='textSecondary'
                  variant='body1'
              >
                Have an account?
                {' '}
                <NextLink href='/login' variant='h6'>
                  Sign in
                </NextLink>
              </Typography>
            </form>
          </Container>
        </Box>
      </>
  )
}

export default RegisterPage
