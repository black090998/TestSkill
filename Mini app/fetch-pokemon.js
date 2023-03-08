const fetch = require('node-fetch');
const mysql = require('mysql');

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

// Membuat koneksi ke database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'mac',
  password: 'password',
  database: 'pokemon_db'
});

connection.connect();

// Fungsi untuk mengambil data Pokemon dari API
async function fetchPokemon() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

// Fungsi untuk menyimpan data Pokemon ke dalam database
async function savePokemon() {
  const pokemonList = await fetchPokemon();
  pokemonList.forEach(pokemon => {
    const sql = `INSERT INTO pokemon (name) VALUES ('${pokemon.name}')`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error);
      }
      console.log(results);
    });
  });
}

savePokemon();

connection.end();
