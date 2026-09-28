const handleLogin = (e) => {
  e.preventDefault();

  // Mengambil password dari file .env yang tersembunyi
  const validUsername = import.meta.env.VITE_ADMIN_USER;
  const validPassword = import.meta.env.VITE_ADMIN_PASS;

  if (credentials.username === validUsername && credentials.password === validPassword) {
    localStorage.setItem("isAdminLoggedIn", "true");
    navigate("/admin/generator");
  } else {
    setError(true);
    setTimeout(() => setError(false), 3000);
  }
};