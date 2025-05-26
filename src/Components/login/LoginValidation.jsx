/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 26 / 05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 * Este archivo (LoginValidation.jsx) es el componente el cual realiza la validacion de caracteres y faltanes de datos en el formulario de logeo.
 *
 * Tema: Renderizacion
 * Capa: Frontend
 * Contacto: benjamin.orellanaof@gmail.com || 3863531891
 */

function Validation(values) {

  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^.{6,}$/;

  if (values.email === "") {
    errors.email = "Debe ingresar un correo electrónico";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  if (values.password === "") {
    errors.password = "Debe ingresar una contraseña";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errors;
}
export default Validation;