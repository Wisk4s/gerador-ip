function calculaIP() {
      var enderecoIP = document.getElementById("enderecoIP").value;
      var resultado = document.getElementById("resultado");

      // Verificar se o endereço IP é válido
      if (!enderecoIPValido(enderecoIP)) {
        resultado.innerHTML = '<p class="msgerro">Endereço IP inválido.</p>';
        return;
      }

      // Converter o endereço IP para uma matriz de números
      var parteIP = enderecoIP.split(".").map(function(part) {
        return parseInt(part, 10);
      });

      // Determinar a classe do endereço IP
      var classeIP = "";
      var mascara = "";
      if (parteIP[0] >= 1 && parteIP[0] <= 127) {
        classeIP = "Classe A";
        mascara = "255.0.0.0";
      } else if (parteIP[0] >= 128 && parteIP[0] <= 191) {
        classeIP = "Classe B";
        mascara = "255.255.0.0";
      } else if (parteIP[0] >= 192 && parteIP[0] <= 223) {
        classeIP = "Classe C";
        mascara = "255.255.255.0";
      } else {
        classeIP = "Classe inválida";
      }

      // Verificar se o endereço IP é público ou privado
      var tipoIP = "";
      if (
        (parteIP[0] == 10) ||
        (parteIP[0] == 172 && parteIP[1] >= 16 && parteIP[1] <= 31) ||
        (parteIP[0] == 192 && parteIP[1] == 168)
      ) {
        tipoIP = "Privado";
      } else {
        tipoIP = "Público";
      }

      // Exibir o resultado na página
      resultado.innerHTML = '<strong><p>Classe: <span class="resultado"></strong>' + classeIP + '</span></p>' +
                                  '<strong><p>Máscara Padrão: <span class="resultado"></strong>' + mascara + '</span></p>' +
                                  '<strong><p>Tipo: <span class="resultado"></strong>' + tipoIP + '</span></p>';
    }

    function enderecoIPValido(enderecoIP) {
      var padrao = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
      var partes = enderecoIP.match(padrao);

      if (partes === null) {
        return false;
      }

      for (var i = 1; i <= 4; i++) {
        if (parseInt(partes[i], 10) > 255) {
          return false;
        }
      }

      return true;
    }