
export async function loginUser({ email, password }) {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  if (data.success && data.user) {
    return data.user; 
  }

  return null;
}
