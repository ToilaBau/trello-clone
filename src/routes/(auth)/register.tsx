import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError, type ApiSuccess } from '@/lib/api';

export const Route = createFileRoute('/(auth)/register')({
  component: Register,
});

const registerSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Name is not empty' }),
  surname: z
    .string()
    .nonempty({ message: 'Surname is not empty' }),
  email: z
    .email({ message: 'Email invalid' })
    .nonempty({ message: ' Email not empty ' }),
  password: z.string().nonempty({ message: 'Please enter your password' }),
});

type RegisterInput = z.infer<typeof registerSchema>;

function Register() {
  const registerMutation = useMutation({
    mutationFn: async (payload: Omit<RegisterInput, 'confirmPassword'>) => {
      return api.post<any, ApiSuccess<any>>('/users/register', payload);
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Register Success', {
        onAutoClose: () => redirect({ to: '/login' })
      })
      form.reset();
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        toast.error(error.message)
      } else {
        toast.error('Network Error Or Unknown')
      }
    }
  })
  const form = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate(value);
    },
  });

  const isSubmitting = registerMutation.isPending;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="w-full max-w-md">
        <div className="space-y-4 bg-card p-10 border border-primary/10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-accent"></div>
          <div>
            <h1 className="font-heading text-2xl font-semibold">Tasker B</h1>
            <p className="text-muted-foreground text-sm">
              Getting started with TaskerB is easy.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
            id='register'
          >
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Phuc"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="surname"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Surname</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Tran Hoang"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="devb@example.com"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="••••••••"
                        autoComplete="off"
                        type="password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <div className="flex justify-end">
              <Link
                to={'/forgot'}
                className="text-accent hover:underline font-semibold tracking-wider text-sm"
              >
                Forgot password?
              </Link>
            </div>
            <Button type='submit' id='register' disabled={isSubmitting} className="w-full py-5" variant={'accent'}>
              {isSubmitting ? (
                <div className='flex'>
                  <Loader2 className='animate-spin' />
                  loading...
                </div>
              ) : (
                <>
                  <span>Register</span>
                  <MoveRight />
                </>
              )}
            </Button>
          </form>
          <div className="h-px bg-primary/20"></div>
          <div className="flex justify-center gap-1 items-center">
            <p className="text-muted-foreground text-sm">
              You have an account?
            </p>
            <Link
              to={'/login'}
              className="font-semibold text-sm hover:text-accent"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
