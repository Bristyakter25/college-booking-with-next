
export async function loginUser({ email, password }) {
  const res = await fetch("https://college-booking-facilities-server-five.vercel.app/login", {
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
