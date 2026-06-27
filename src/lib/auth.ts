export function getAccessToken(): string {
  if (typeof document === 'undefined') return '';
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'accessToken' && value) {
      return decodeURIComponent(value);
    }
  }
  return '';
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function clearAuthCookies(): void {
  if (typeof document === 'undefined') return;
  document.cookie = 'accessToken=; path=/; max-age=0';
  document.cookie = 'refreshToken=; path=/; max-age=0';
}
