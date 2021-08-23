import {
  signUp, signIn, googleLogin, logout,
} from './fs-login.js';
import { vistas } from '../main.js';

// SECCIÓN LOGIN HTML
const main = document.querySelector('.container');

// Crear el elemento
const formularios = document.createElement('article');
formularios.className = 'forms-container';
formularios.innerHTML = `
      <section class="signin-signup">
      <!--Formulario sign in-->
        <form action="" class="sign-in-form">
          <h1>Tomodachi</h1>
          <h2 class="title">Ingresa</h2>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" id="signin-email" placeholder="Email"/> 
          </div>
          <div> <p id="si-error-email"></p> </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" id="signin-password" placeholder="Contraseña">
          </div>
          <div> <p id="si-error-password"></p> </div>
          <input type="submit" value="Ingresar" class="button solid">
          <p class="social-text">O ingresa con:</p>
          <div class="social-media">
            <a href="#" id="googleLogin" class="social-icon google">
              <i class="fab fa-google"></i>
            </a>
          </div>
        </form>
        <!--Formulario sign up-->
        <form action="" class="sign-up-form">
          <h1>Tomodachi</h1>
          <h2 class="title">Regístrate</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" id="signup-user" placeholder="Usuario">
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" id="signup-email" placeholder="Email" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" id="signup-password" placeholder="Contraseña">
          </div>
          <div> <p id="su-error-password"></p> </div>
          <input type="submit" value="Registrar" class="button solid">
        </form>
      </section>
    </article>

    <article class="panels-container">
      <section class="panel left-panel">
        <div class="content">
          <h3>¿Eres nuevo?</h3>
          <p>
       ¡únete a nosotros, comparte y diviértete!
          </p>
          <button class="button transparent" id="registrar">Regístrate</button>
        </div>
        <img src="images/log.png" class="image knj" alt=""/>
      </section>

      <section class="panel right-panel">
        <div class="content">
          <h3>¿Eres parte de la comunidad?</h3>
          <p>
            ¡Logueate y no esperes más!
          </p>
          <button class="button transparent" id="ingresar">Ingresar</button>
        </div>
        <img src="images/bnh.png" class="image bnh" alt="" />
      </section>
`;

main.appendChild(formularios);

// FUNCIÓN DE LA BOLA
const ingresar = document.getElementById('ingresar');
const registrar = document.getElementById('registrar');
const container = document.querySelector('.container');

registrar.addEventListener('click', () => {
  container.classList.add('modoRegistro');
});

ingresar.addEventListener('click', () => {
  container.classList.remove('modoRegistro');
});

// SIGN UP - REGISTRARSE CON EMAIL Y PASSWORD
const signupForm = document.querySelector('.sign-up-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = document.getElementById('signup-user').value;
  const signupEmail = document.getElementById('signup-email').value;
  const signupPassword = document.getElementById('signup-password').value;
  const errorMsgPassword = document.getElementById('su-error-password');
  if (signupEmail === '' || signupPassword === '') {
    errorMsgPassword.innerHTML = 'Debes llenar todos los campos <br> (╯ರ ~ ರ)╯︵ ┻━┻';
  }

  signUp(signupEmail, signupPassword).then((result) => {
    const Email = result.user.email;
    localStorage.setItem('email', Email);
    console.log('signed up');
    localStorage.setItem('name', userName);
  })
    .catch((error) => {
      console.log(error.code, error.message);
    });
});

// SIGN IN - INGRESAR CON EMAIL Y PASSWORD
const signinForm = document.querySelector('.sign-in-form');

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const siginEmail = document.getElementById('signin-email').value; // INPUTS
  const signinPassword = document.getElementById('signin-password').value;
  // const errorMsgEmail = document.getElementById('si-error-email'); // MENSAJES DE ERROR
  const errorMsgPassword = document.getElementById('si-error-password'); // "signIn Error Password"

  signIn(siginEmail, signinPassword).then((result) => {
    const Email = result.user.email;
    localStorage.setItem('email', Email);
    console.log('signed in');
    vistas();
    document.querySelector('.container').style.display = 'none'; // acá oculto el main que contiene el login
    document.getElementById('header').style.display = 'flex'; // acá muestro el header con el navbar
  })
    .catch((error) => {
      console.log(error.code, error.message);
    });

  if (siginEmail === '' || signinPassword === '') {
    errorMsgPassword.innerHTML = 'Debes ingresar tu email y contraseña <br> (╯ರ ~ ರ)╯︵ ┻━┻';
  }
});

// INGRESAR CON GOOGLE
const googleBtn = document.querySelector('.google');
googleBtn.addEventListener('click', () => {
  googleLogin().then((result) => {
    const credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    console.log(credential.accessToken);
    // Envío la información del usuario al LocalStorage
    const Name = result.user.displayName;
    const Email = result.user.email;
    const Photo = result.user.photoURL;
    const User = {
      name: Name,
      email: Email,
      photo: Photo,
    };
    localStorage.setItem('user', JSON.stringify(User));
    console.log('signed in with Google');
    vistas();
    document.querySelector('.container').style.display = 'none'; // acá oculto el main que contiene el login
    document.getElementById('header').style.display = 'flex'; // acá muestro el header con el navbar
  })
    .catch((error) => {
      console.error('no se pudo iniciar sesión con gugul :c');
      console.log(error.code);
      console.log(error.message);
      // The email of the user's account used.
      console.log(error.email);
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credential);
    });
});

// LOG OUT
const Logout = document.querySelector('.fa-sign-out-alt');
Logout.addEventListener('click', () => {
  logout();
});
