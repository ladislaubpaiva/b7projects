const selector = (e) => document.querySelector(e);
selector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = selector('#searchInput').value;
  if (input !== '') {
    clearInfo();
    showWarning('Carregando');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=26c6bee2afbc6b0f398940682889fb7a&units=metric&lang=pt`;
    const results = await fetch(url);
    const response = await results.json();
    if (response.cod === 200) {
      showInfo({
        name: response.name,
        country: response.sys.country,
        temp: response.main.temp,
        tempIcon: response.weather[0].icon,
        windSpeed: response.wind.speed,
        windAngle: response.wind.deg
      }
      );
    } else {
      clearInfo();
      showWarning('Não Encontrado');
    }
  } else {
    clearInfo();
    showWarning('Precisa digitar o nome da cidade');
  }
});
function showWarning (msg) {
  selector('.aviso').innerText = msg;
};
function clearInfo () {
  selector('.resultado').style.display = 'none';
}
function showInfo (response) {
  showWarning('');
  selector('.titulo').innerText = `${response.name}, ${response.country}`;
  selector('.tempInfo span').innerText = `${response.temp}`;
  selector('.ventoInfo strong').innerText = `${response.windSpeed}`;
  selector('.temp img').src = `http://openweathermap.org/img/wn/${response.tempIcon}@2x.png`;
  selector('.ventoPonto').style.transform = `rotate(${response.windAngle - 90}deg)`;
  selector('.resultado').style.display = 'block';
}
