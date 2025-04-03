require("dotenv").config(); // Ficheiro .env
const { Client } = require("pg"); // require do Postgresql
const ping = require('ping'); // Require Ping
const dns = require('dns'); // Require DNS
const { hostname } = require("os");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

const devices = [
    "192.168.1.127", "192.168.1.159", "192.168.1.138", 
    "85.245.13.195", "192.168.1.165", "192.168.1.149", 
    "192.168.1.80", "192.168.1.160",  "192.168.1.118", 
    "192.168.1.166", "192.168.1.65", "192.168.1.161",
    "192.168.1.76", "192.168.1.124", "192.168.1.140", 
    "192.168.1.103", "192.168.1.119", "192.168.1.167", 
    "192.168.1.130", "85.245.13.1", "192.168.1.168", 
    "192.168.1.83", "192.168.1.99", "192.168.1.147",
    "192.168.1.94", "192.168.1.142", "192.168.1.158", 
    "192.168.1.89","192.168.1.121", "192.168.1.169", "192.168.1.84"
];

(async () => {
  try {
    await client.connect();
    console.log("Connected to Data Base!");

    await client.query("use empresa");
    console.log("Data Base Selected!");

    const resolverDNS = async (device) => {
        return new Promise((resolve, reject) => {
          dns.reverse(device, (err, hostnames) => {
            if (err) {
              resolve(device); // Se ocorrer erro, retorna o próprio IP
            } else {
              resolve(hostnames.length > 0 ? hostnames[0] : device); // Se não houver hostname, retorna o IP
            }
          });
        });
    };

    for (let i = 0; i < devices.length; i++) {
        const device = devices[i];

        let Data = new Date();
        let Ano = Data.getFullYear();
        let Mes = Data.getMonth() + 1;
        let Dia = Data.getDate();
        let Horas = Data.getHours();
        let Minutos = Data.getMinutes();
        let Segundos = Data.getSeconds();

        if (Dia < 10) {
            Dia = "0" + Dia;
        }
        if (Mes < 10) {
            Mes = "0" + Mes;
        }
        if (Horas < 10) {
            Horas = "0" + Horas;
        }
        if (Minutos < 10) {
            Minutos = "0" + Minutos;
        }
        if (Segundos < 10) {
            Segundos = "0" + Segundos;
        }

        const DataAtual = Ano + "/" + Mes  + "/" + Dia + " || " + Horas + ":" + Minutos + ":" + Segundos;

        const res = await ping.promise.probe(device);
        
        let DNS = await resolverDNS(device);

        if (res.alive) {
            console.log(`Dispositivo ${device} está online 🟢`);
            const query = await client.query(
                "INSERT INTO dispositivos (hostname, ip, data_last_ping, status) VALUES ($1, $2, $3, $4)",
                [DNS, device, DataAtual, 'Online']
            );
            console.log("Resultado da query: ", query);
        } else {
            console.log(`Dispositivo ${device} está offline 🔴`);
            const query = await client.query(
                "INSERT INTO dispositivos (hostname, ip, data_last_ping, status) VALUES ($1, $2, $3, $4)",
                [DNS, device, DataAtual, 'Offline']
            );
            console.log("Resultado da query: ", query);
        }
    }

  } catch (err) {
    console.error("Erro ao conectar ou executar a query:", err);
  } finally {
    await client.end();
    console.log("Connection closed.");
  }
})();