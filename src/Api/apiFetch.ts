export async function apiFetch(url: string, options = {}) {
  const response = await fetch(url, options);

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("userLogin");
    window.location.href = "/";
  }

  if (response.status === 500) {
    console.log("Erro no servidor");
  }

  return response;
}