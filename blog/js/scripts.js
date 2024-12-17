/*!
* Start Bootstrap - Blog Home v5.0.9 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
        function fbq(){
         
         };
          function wppbut() {
            console.log("Wpp")
            fbq('track', 'Contact',{});
            window.location.replace("https://api.whatsapp.com/send?phone=+54 9 11 3293-5668&text=Hola%20vengo%20de%20tu%20blog.%20%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre:");
          };
          
          function smbut(link) {
            console.log("sm")
            fbq('trackCustom', 'SocialMedia', {}); window.location.replace(link); };
    // Escuchar el clic en el botón para mostrar el cartel
    document.getElementById('btnMostrar').addEventListener('click', () => {
      const cartel = document.getElementById('NoAyuda');
      cartel.classList.toggle('d-none');  // Alterna entre ocultar y mostrar
    });

 document.getElementById('btnOcultar').addEventListener('click', () => {
  const elemento = document.getElementById('NoAyuda');
  if (elemento) {
    elemento.style.display = 'none';
  }
});


$( document ).ready(function () {
    $("#anythingSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myDIV .card").filter(function () {
            $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
     });
 });

