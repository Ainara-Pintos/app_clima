window.addEventListener('load', ()=> {
    let lon;
    let lat

    // DOM
    let ubicacion = document.getElementById('ubicacion')
    let datos = document.getElementById('fecha')

    let temperatura = document.getElementById('temperatura')
    let descripcion = document.getElementById('descripcion')
    let imagen = document.getElementById('imagen_clima')

    let viento = document.getElementById('viento')
    let humedad = document.getElementById('humedad')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition (posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${lat}&lon=${lon}&appid=c2ebbed916342a260bb1ee83f791dbaa`
            

            fetch(url)
                .then(response => { return response.json() })
                .then(data => {

                    let fechaHoraActual = new Date();  // creo una instancia del objeto Date() que contiene información sobre el año, mes, día, hora, minutos, segundos y milisegundos actuales.

                    let horaActual = fechaHoraActual.getHours();  // obtengo la hora 
                    let minutosActuales = fechaHoraActual.getMinutes(); // obtengo los minutos
                    let diaActual = fechaHoraActual.getDate();  // obtengo el día en números

                    //creo una función que me retorne el día en letras
                    function obtenerDiaDeLaSemana(numeroDia) {
                        switch (numeroDia) {
                            case 0:
                                return 'Dom';
                            break;
                            case 1:
                                return 'Lun';
                            break;
                            case 2:
                                return 'Mar';
                            break;
                            case 3:
                                return 'Mié';
                            break;
                            case 4:
                                return 'Jue';
                            break;
                            case 5:
                                return 'Vie';
                            break;
                            case 6:
                                return 'Sáb';
                            break;
                        }
                    }
                    let numeroDia = fechaHoraActual.getDay() // obtengo el día actual (getDay debuelvee 0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
                    let diaDeLaSemana = obtenerDiaDeLaSemana(numeroDia); // obtego el día en letras
                    
                    ubicacion.textContent = data.name  // obtengo el nombre de la ciudad
                    datos.textContent = `${diaDeLaSemana} ${diaActual}, ${horaActual}:${minutosActuales}hs` // imprimo la fecha y hora del día en tiempo real

                    let codigoImg = data.weather[0].icon; // obtengo el código de tipo de clima
                    // creo un condiciona que devuelve una imagen de acuerdo al código del clima*/
                    if(codigoImg == '01d' || codigoImg == '01n'){
                        imagen.src='img/despejado.png.png';
                    }
                    else if(codigoImg == '02d' || codigoImg == '02n' || codigoImg == '03d' || codigoImg == '03n' || codigoImg == '04d' || codigoImg == '04n'){
                        imagen.src='img/nublado.png';
                    }
                    else if(codigoImg == '09d' || codigoImg == '09n'){
                        imagen.src='img/lluvioso.png.png.png';
                    }
                    else if(codigoImg == '11d' || codigoImg == '11n'){
                        imagen.src='img/tormenta.png.png';
                    }
                    else if(codigoImg == '13d' || codigoImg =='13n'){
                        imagen.src='img/nieve.png';
                    }
                    else{
                        imagen.src='img/neblina.png.png'
                    }
                    
                    temperatura.textContent = Math.round(data.main.temp) + '°C' // obtengo la temperatura y la imprimo 
                    descripcion.textContent = data.weather[0].description // obtengo la descripción del clima y la imprimo 

                    viento.textContent = `${data.wind.speed}m/s` // obtengo la velocidad del viento y la imprimo 
                    humedad.textContent = `${data.main.humidity}%` // obtengo el % de humedad y al imprimo 
                })
            .catch( error => {
                console.log(error)
            })
        })
    }
})