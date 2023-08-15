<template>
  <section class="login_container">
    <form class="login" @submit.prevent="handleLogin">
      <h2>Welcome Back</h2>
      <input
        type="email"
        placeholder="Email address"
        v-model="login_form.email"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="login_form.password"
      />
      <input class="button" type="submit" value="Login" />
    </form>
    <div>
      Don't have an account yet?
      <RouterLink to="/register">Register</RouterLink>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const login_form = ref({});

    const handleLogin = () => {
      if (login_form.value) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: login_form.value.email,
            password: login_form.value.password,
          }),
        };
        fetch("http://localhost:8000/api/login", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log({ data });
          });
      }
    };

    return {
      login_form,
      handleLogin,
    };
  },
};
</script>

<style>
.login_container {
  padding: 2rem;
  width: 40rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.2px 0.2px 3px 0.3px hsla(348, 90%, 61%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

.button:hover {
  opacity: 0.9;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.login input:not([type="submit"]) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
  background-color: rgb(245, 66, 101);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
