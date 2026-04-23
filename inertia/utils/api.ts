function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export async function csrfPost<T = Record<string, unknown>>(url: string): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  })
  if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`)
  return res.json() as Promise<T>
}
