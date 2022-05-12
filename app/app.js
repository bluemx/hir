const api = "https://testing4.myblueengine.com/HIRGame/Services.aspx";
const { ref } = Vue;
const { useQuasar } = Quasar;
const app = Vue.createApp({
  setup(context) {
    const $q = useQuasar();

    const certificados = [
      [
        "hircasa",
        '<p>Abona un pago a tu financiamiento con el valor de $5,000.</p>',
        "$5,000",
        "Abono a Financiamiento HIR",
      ],
      [
        "amazon",
        '<p> Las Tarjetas Regalo de Amazon pueden canjearse por millones de productos de Amazon y pueden ser utilizados únicamente en la compra de productos participantes en <a href="https://www.amazon.com.mx" target="_blank">amazon.com.mx</a>.</p>',
        "$5,000",
        "Amazon",
      ],
      [
        "itunes",
        "<p>Disfruta de una experiencia de entretenimiento totalmente nueva. Utiliza la Tarjeta App Store & iTunes para comprar apps, juegos, música y películas. Válida únicamente para compras realizadas en México de Apple Media Services.</p>",
        "$5,000",
        "iTunes",
      ],
      [
        "puntosfutbol",
        "<p>Puntos Fútbol es una plataforma de entretenimiento para los fanátic@s del Fútbol, usa tu saldo para partiicpar en Trivias, Subastas, Marcadores y Retas donde podrás demostrar tus conocimientos y ganar increíbles premios.</p>",
        "$5,000",
        "Puntos Futbol",
      ]
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
      console.log('surveyCheck')
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
      if (hasSurveyID && hasSurveyID.length >= 5 && hasSurveyID.length <= 6) {
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
