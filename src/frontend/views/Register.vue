<template>
  <section class="register_container">
    <form class="register" @submit.prevent="register">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First name"
        v-model="register_form.fName"
      />
      <input
        type="text"
        placeholder="Last name"
        v-model="register_form.lName"
      />
      <input
        type="email"
        placeholder="Email address"
        v-model="register_form.email"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="register_form.password"
      />
      <input class="button" type="submit" value="Register" />
    </form>
    <div>Already have an account? <a href="/">Login</a></div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});

    const login = () => {
      console.log(login_form);
    };

    const register = () => {
      console.log(register_form);
    };

    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>

<style>
.register_container {
  padding: 2rem;
  width: 40rem;
  border-radius: 0.5rem;
  box-shadow: 0.2px 0.2px 3px 0.3px hsla(348, 90%, 61%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to bottom right,
    rgb(245, 66, 101) 0%,
    rgb(189, 28, 60) 100%
  );
  color: #fff;
}

form {
  flex: 1 1 0%;
  padding: 3rem 1rem 1rem;
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

form.register input:not([type="submit"]) {
  color: #fff;
  border-bottom: 2px solid #fff;
}

form.register input[type="submit"] {
  background-color: #fff;
  color: rgb(245, 66, 101);
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
