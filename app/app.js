const api = "https://testing4.myblueengine.com/HIRGame/Services.aspx";
const { ref } = Vue;
const { useQuasar } = Quasar;
const app = Vue.createApp({
  setup(context) {
    const $q = useQuasar();

    const certificados = [
      [
        "hircasa",
        '<p>Abona un pago a tu financiamiento con el valor de $5\'000.</p>',
        "$5'000",
        "Abono a Financiamiento HIR",
      ],
      [
        "amazon",
        '<p>Las Tarjetas Regalo de Amazon.com.mx pueden canjearse por millones de productos de Amazon. Las Tarjetas Regalo de Amazon.com.mx pueden ser utilizados únicamente en la compra de productos participantes en <a href="https://www.amazon.com.mx" target="_blank">amazon.com.mx</a>.</p>',
        "$5'000",
        "Amazon",
      ],
      [
        "itunes",
        "<p>Disfruta de una experiencia de entretenimiento totalmente nueva. Utiliza la Tarjeta App Store & iTunes para comprar apps, juegos, música y películas. Válida únicamente para compras realizadas en México de Apple Media Services.</p>",
        "$5'000",
        "iTunes",
      ],
      [
        "puntosfutbol",
        "<p>Puntos Fútbol es una plataforma de entretenimiento para los fanátic@s del Fútbol, usa tu saldo para partiicpar en Trivias, Subastas, Marcadores y Retas donde podrás demostrar tus conocimientos y ganar increíbles premios.</p>",
        "$5'000",
        "Puntos Futbol",
      ],


/*
      [
        "xbox",
        "<p>Disfruta de la nueva generación de juegos y entretenimiento con Xbox. Explora consolas, juegos nuevos y clásicos, y accesorios de Xbox empezar tu colección.</p><p>No puedes usar la tarjeta regalo de Xbox para comprar directamente una suscripción a Xbox Live Gold ni ningún otro servicio de suscripción. Asegúrate que tu cuenta de facturación es de México y se encuentra en Pesos Mexicanos, de lo contrario, no podrás canjear la tarjeta regalo.</p>",
        "$200",
        "XBOX",
      ],
      [
        "xboxlive",
        "<p>Juega en línea con tu suscripción Gold de 1 mes y únete a la mejor comunidad de jugadores, encuentra rápidamente compañeros para jugar con las opciones Clubes y Buscando grupo. Podrás conseguir entre 2 y 4 juegos gratuitos todos los meses y descuentos de hasta el 50-75 % en la tienda de Xbox One. Sólo válido en México.</p>",
        "$169",
        "XBOX Live Gold",
      ],
      [
        "playstation",
        "<p>Saldo en formato de dólares en la cuenta del usuario para comprar juegos completos, descarga de contenido, comprar o rentar películas y pagar subscripciones dentro de las aplicaciones de la consola.</p>",
        "$10 USD",
        "PlayStation Store",
      ],
      [
        "spotify",
        "<p>La tarjeta de regalo es válida para planes Premium Individual.  No es posible usarlas para Premium para Estudiantes, Premium Familiar, Premium Duo ni ofertas de prueba. </p>",
        "$115",
        "Spotify",
      ],
 
      //['wow', '<p>Tarjeta pre cargada para consumir en tus restaurantes favoritos.  Válido en Starbucks, Burger King, Chili’s, California Pizza Kitchen, P.F. Chang’s, Italianni’s, The Cheesecake Factory, Vips y El Portón operados por Grupo Alsea en la República Mexicana, conoce la cobertura disponible en: <a href="https://www.wowrewards.mx/" target="_blank">www.wowrewards.mx</a>. Se deberá presentar la App de Wow Rewards con el código de la tarjeta agregada para gozar del saldo.</p>', '$250', 'Wow Rewards'],
      [
        "uber",
        "<p>Paga tus viajes de Uber y comidas de Uber Eats. Esta tarjeta puede ser canjeada a través de la aplicación móvil de Uber y Uber Eats y pude ser utilizada en las ciudades en México donde Uber Eats y/o Uber está disponible y en dónde no existan restricciones legales o regulatorias para su uso. La tarjeta no puede ser utilizada fuera de México.</p>",
        "$150",
        "Uber",
      ],
   
      [
        "facturafiel",
        "<p>Crea FacturaFiel.com  brinda a sus usuarios la mejor opción costo-beneficio existente en el mercado para expedir facturas y Comprobantes Fiscales Digitales por Internet (CFDI). Esta tarjeta es válida por 25 folios.</p>",
        "$200",
        "FacturaFiel.com",
      ],
      [
        "superdoctor",
        "<p>Tarjeta súper Doctor - 3 meses, algunos de los beneficios son: Asistencia Nutricional telefónica ilimitada, Asistencia Psicológica telefónica ilimitada,  Asistencia Médica telefónica 24/7 ilimitada, Doctor en tu Casa sin costo 3 consultas (Limitado a 1 consulta al mes), Asistencia Dental 2 consultas + limpieza sin costo, Servicio de Ambulancia sin costo (2 eventos), Asistencia VISUAL en Ópticas Devlyn, DescuentaMx disfruta de increíbles descuentos en: Farmacias, Laboratorios, Restaurantes, entretenimiento, entre otros.</p>",
        "$240",
        "Súper Doctor",
      ],
      [
        "cinepolis",
        "<p>¡Disfruta los mejores estrenos!, Cinépolis Klic es la plataforma de streaming de Cinépolis con los estrenos recién salidos del cine, las mejores películas de catálogo, series de TV y entretenimiento para toda la familia. Este código te permitirá disfrutar de 4 películas disponible en renta y renta anticipada.</p>",
        "$200",
        "Cinépolis Klic",
      ],
      //['mixup', '<p>Mixup ¡La tienda más divertida! Música, películas, libros, videojuegos, audífonos, bocinas, cables, juguetes y tecnología. Código válido únicamente para compras en línea. </p>', '$200',  'Mixup'],
      //['enviaflores', '<p>Envía flores, globos y regalos a todo México y sorprende a esa persona especial. Úsalo en <a href="https://www.enviaflores.com" target="_blank">www.enviaflores.com</a> o a la app iOS (enviaflores.com).</p>', '$250', 'Enviaflores.com'],
      [
        "gandhi",
        '<p>En Gandhi, busca y compra el libro que estás deseando de una manera Fácil y Segura. Código válido unicamente en <a href="https://www.gandhi.com.mx" target="_blank">www.gandhi.com.mx</a>, este código no es válido en tiendas físicas ni en Walmart y Palacio de Hierro.</p>',
        "$200",
        "Librerías Gandhi",
      ],
 */
    ];

    const dialogCert = ref(false);
    const dialogTerminos = ref(false);
    const dialogActivity = ref(false);
    const dialogTicket = ref(false);
    const itemActive = ref(null);
    const activity = ref();

    const chooseCertificate = ref(null);
    const idparticipacion = ref(null);
    const dialogFinish = ref(false);

    const ticketNum = ref(null);
    const surveyNum = ref(null);

    const loadgame = ref("financiandotucasa");

    const dialogError = ref(false);
    const dialogErrorTxt = ref("");

    const userip = ref();

    const loading = ref(false);

    const openit = (item) => {
      dialogCert.value = true;
      itemActive.value = item;
    };

    const chooseit = (cert) => {
      chooseCertificate.value = cert;
      dialogActivity.value = true;
      traceFN();
    };

    const closeGame = () => {
      dialogActivity.value = false;
      dialogCert.value = false;
      itemActive.value = null;
    };

    const buildRequest = (msg) => {
      const ResultVal = msg ? msg.Result || msg.score : "";
      const DesgloseVal = msg ? msg.Desglose || JSON.stringify(msg.points) : "";
      const request = {
        SurveyID: surveyNum.value || "",
        TicketID: ticketNum.value || "",
        Certificate: chooseCertificate.value || "",
        Result: ResultVal,
        Desglose: DesgloseVal,
        IPAddress: userip.value,
      };
      return request;
    };

    const finished = async (msg) => {
      //Request
      const res = await axios.post(api + "/SaveData", buildRequest(msg));
      idparticipacion.value = res.data.d;
      dialogFinish.value = true;
    };

    const receiveMessage = (event) => {
      if (event.data == "closegame") {
        closeGame();
      } else {
        try {
          var jsonparsed = JSON.parse(event.data);
          finished(jsonparsed);
        } catch (e) {
          return false;
        }
      }
    };

    window.addEventListener("message", receiveMessage);

    const activityFN = () => {
      //console.log(activity.value)
    };

    const surveyCheck = async () => {
      const res = await axios.post(api + "/ValidateSurvey", {
        SurveyID: surveyNum.value,
      });
      if (res.data.d == 0) {
        console.log("OK", res.data);
        loading.value = false;
      } else {
        dialogError.value = true;
        dialogErrorTxt.value =
          "Hemos registrado tu participación del día de hoy. <br>Gracias por tu opinión.";
      }
    };
    const ticketCheck = () => {
      dialogTicket.value = false;
      loading.value = false;
      //dialogError.value = true
      //dialogErrorTxt.value = 'Ingresa un ticket válido.'
    };

    const GETurl = () => {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const hasSurveyID = params.get("SurveyID");
      if (hasSurveyID && hasSurveyID.length >= 14 && hasSurveyID.length <= 32) {
        surveyNum.value = hasSurveyID;
        surveyCheck();
      } else {
        //dialogTicket.value = true
        dialogError.value = true;
        dialogErrorTxt.value = "Error en el código de encuesta [SurveyID].";
      }

      const loadgameParam = params.get("loadgame");
      if (loadgameParam) {
        loadgame.value = loadgameParam;
      }

      traceFN();
    };

    const traceFN = () => {
      //Feb2022
      // 1- VERIFICAR QUE SE RECIBIO DESDE SURVEY-SITE
      const res = axios.post(api + "/SaveData", buildRequest(false));
      console.log("%c traceFN!", "background: #222; color: #bada55");
      console.warn(buildRequest(false));
    };

    const getIP = async () => {
      const res = await axios.get("https://api.ipify.org");
      userip.value = res.data;
      console.log("IP:", userip.value);
      //AFTER GETTING THE IP
      GETurl();
    };
    getIP();

    return {
      certificados,
      openit,
      itemActive,
      dialogCert,
      dialogTerminos,
      dialogActivity,
      chooseit,
      idparticipacion,
      activityFN,
      dialogTicket,
      ticketNum,
      surveyNum,
      ticketCheck,
      dialogFinish,
      loadgame,
      closeGame,
      dialogError,
      dialogErrorTxt,
      loading,
    };
  },
});

function postM() {
  app.call();
}

app.use(Quasar, {
  config: {
    brand: {
      primary: "#e79f3d",
      secondary: "#492fe5",
      dark: "#050505",
      info: "#89B7E9",
    },
  },
});
app.mount("#q-app");
