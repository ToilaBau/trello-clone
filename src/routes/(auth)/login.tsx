import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import z from 'zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/(auth)/login')({
  component: Login,
});

const loginSchema = z.object({
  email: z
    .email({ message: 'Email invalid' })
    .nonempty({ message: ' Email not empty ' }),
  password: z.string().nonempty({ message: 'Please enter your password' }),
});

function Login() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      toast.success('Login Success', {
        description: JSON.stringify(value),
      });
    },
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="w-full max-w-md">
        <div className="space-y-4 bg-card p-10 border border-primary/10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-accent"></div>
          <div>
            <h1 className="font-heading text-2xl font-semibold">
              Wellcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Let complete your tasks.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <FieldGroup>
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
            <Button className="w-full py-5" variant={'accent'}>
              <span>Sign In</span>
              <MoveRight />
            </Button>
          </form>
          <div className="h-px bg-primary/20"></div>
          <div className="flex justify-center gap-1 items-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?
            </p>
            <Link
              to={'/register'}
              className="font-semibold text-sm hover:text-accent"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
