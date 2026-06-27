import * as React from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Loader2, MoveRight, RefreshCcw } from 'lucide-react';
import { verifyOtp, resendOtp, ApiError } from '@/lib/api';

export const Route = createFileRoute('/(auth)/otp')({
  component: Otp,
});

function Otp() {
  const [otp, setOtp] = React.useState('');
  const navigate = useNavigate();
  const email = React.useMemo(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('email') ?? '';
  }, []);

  const setCookie = (name: string, value: string, maxAge: number) => {
    if (typeof document === 'undefined') return;
    const parts = [
      `${name}=${encodeURIComponent(value)}`,
      'path=/',
      'sameSite=lax',
    ];
    if (maxAge > 0) {
      parts.push(`max-age=${maxAge}`);
    }
    if (window.location.protocol === 'https:') {
      parts.push('secure');
    }
    document.cookie = parts.join('; ');
  };

  const verifyMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) =>
      verifyOtp(payload),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data ?? {};
      if (accessToken) {
        setCookie('accessToken', accessToken, 60 * 60);
      }
      if (refreshToken) {
        setCookie('refreshToken', refreshToken, 60 * 60 * 24 * 30);
      }

      toast.success(response.message || 'OTP verified successfully', {
        onAutoClose: () => {
          navigate({ to: '/app' });
        },
      });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Network Error Or Unknown');
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => resendOtp({ email }),
    onSuccess: (response) => {
      toast.success(response.message || 'OTP has been resent');
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Network Error Or Unknown');
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      toast.error('Email missing. Please login again to request a new OTP.');
      return;
    }

    verifyMutation.mutate({
      email,
      otp,
    });
  };

  const handleResend = () => {
    if (!email) {
      toast.error('Email missing. Please login again to request a new OTP.');
      return;
    }

    resendMutation.mutate();
  };

  const isVerifyDisabled =
    otp.trim().length < 6 || verifyMutation.isPending || !email;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="w-full max-w-md">
        <div className="space-y-6 bg-card p-10 border border-primary/10 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-accent"></div>
          <div>
            <h1 className="font-heading text-2xl font-semibold">
              Xác thực OTP
            </h1>
            <p className="text-muted-foreground text-sm">
              Nhập mã OTP được gửi đến{' '}
              <span className="font-semibold text-foreground">
                {email || 'email của bạn'}
              </span>{' '}
              để tiếp tục.
            </p>
            {!email && (
              <p className="text-sm text-destructive">
                Email không tìm thấy. Vui lòng đăng nhập lại để nhận OTP.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-muted-foreground"
              >
                Mã OTP
              </label>
              <InputOTP
                id="otp"
                maxLength={6}
                value={otp}
                onChange={setOtp}
                className="w-full"
                containerClassName="justify-center gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="secondary"
                disabled={resendMutation.isPending}
                onClick={handleResend}
                className="w-full sm:w-auto"
              >
                {resendMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Gửi lại mã
                  </>
                )}
              </Button>
              <Button
                type="submit"
                disabled={isVerifyDisabled}
                className="w-full sm:w-auto"
                variant="accent"
              >
                {verifyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Xác thực...
                  </>
                ) : (
                  <>
                    <span>Xác thực</span>
                    <MoveRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="h-px bg-primary/20"></div>
          <div className="flex justify-center gap-1 items-center text-sm text-muted-foreground">
            <p>Bạn chưa có tài khoản?</p>
            <Link
              to={'/register'}
              className="font-semibold text-sm hover:text-accent"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
