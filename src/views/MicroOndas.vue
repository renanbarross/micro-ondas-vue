<script>
export default {
  data() {
    return {
      // Atributos que aparecem na tela do micro-ondas

      id: "",
      nomePrograma: "",
      alimento: "",
      caractereAquecimento: "",
      instrucoes: "",
      tempo: "",
      potencia: "",

      // Atributo referente ao processo de aquecimento

      stringInformativa: "",

      // Atributos auxiliares

      tempoArmazenado: 0,
      mensagemTempo: "",
      mensagemPotencia: "",
      tempoRestante: 0,
      ligado: false,
      pausado: false,
      intervalo: "",
      ePreDefinido: false,
    }
  },
  methods: {
    // Métodos referentes ao botão "Ligar | +30 seg"

    iniciarAquecimento() {
      clearInterval(this.intervalo);

      if (this.ligado == false && this.pausado == false) {
        if (this.tempo) {
          this.tempoArmazenado = parseInt(this.tempo);
        } else {
          this.tempoArmazenado = 30;
        }
      }

      this.mensagemTempo = "";

      this.mensagemPotencia = "";

      if (this.ePreDefinido == false) {
        if (this.tempoArmazenado < 1 || this.tempoArmazenado > 120) {
          this.mensagemTempo = "Insira um tempo válido... ";
        }
      }

      if (parseInt(this.potencia) < 0 || parseInt(this.potencia) > 10) {
        this.mensagemPotencia = "Insira uma potência válida...";
      }

      if (this.mensagemTempo == "" && this.mensagemPotencia == "") {
        if (this.ligado == false && this.pausado == false) {
          if (this.tempo) {
            this.tempoRestante = this.tempoArmazenado;
          } else {
            this.tempo = 30;
            this.tempoRestante = 30;
          }
          this.stringInformativa = this.gerarStringInformativa();
        }

        if (this.ligado == true && this.pausado == false && this.ePreDefinido == false) {
          this.tempoRestante += 30;
        }

        this.ligado = true;
        this.pausado = false;

        this.intervalo = setInterval(() => {
          if (this.ligado == true && this.pausado == false) {
            this.tempoRestante--;
            this.stringInformativa = this.gerarStringInformativa();

            if (this.tempoRestante === 0) {
              clearInterval(this.intervalo);
              this.stringInformativa = `${this.stringInformativa} ${"Aquecimento concluído"}`;
              this.nomePrograma = "";
              this.alimento = "";
              this.caractereAquecimento = "";
              this.instrucoes = "";
              this.tempo = "";
              this.potencia = "";
              this.ligado = false;
              this.tempoArmazenado = 0;
              this.ePreDefinido = false;
            }
          }
        }, 1000);
        this.tempo = this.converterTempo(this.tempoArmazenado);
      } else {
        this.stringInformativa = `${this.mensagemTempo}${this.mensagemPotencia}`;
        this.tempo = "";
      }
    },

    gerarStringInformativa() {
      let caractere = this.caractereAquecimento ? this.caractereAquecimento : ".";
      let quantidadeDeGrupos = this.tempoRestante;

      if (this.potencia) {
        var quantidadeDeCaracteresPorGrupo = parseInt(this.potencia);
      } else {
        this.potencia = 10;
        var quantidadeDeCaracteresPorGrupo = 10;
      }

      let grupo = new Array(quantidadeDeCaracteresPorGrupo).fill(caractere).join("");
      return new Array(quantidadeDeGrupos).fill(grupo).join(" ");
    },

    converterTempo(tempo) {
      let minutos = Math.floor(tempo / 60);
      let segundos = tempo % 60;

      let minutosFormatados = minutos.toString().padStart(2, "0");
      let segundosFormatados = segundos.toString().padStart(2, "0");

      return `${minutosFormatados}:${segundosFormatados}`;
    },

    // Métodos referentes ao botão "Pausar | Cancelar"

    pausar() {
      this.pausado = true;
    },

    cancelar() {
      this.nomePrograma = "";
      this.alimento = "";
      this.caractereAquecimento = "";
      this.instrucoes = "";
      this.tempo = "";
      this.potencia = "";
      this.tempoRestante = 0;
      this.stringInformativa = "";
      this.ligado = false;
      this.pausado = false;
      this.tempoArmazenado = 0;
      this.ePreDefinido = false;
      clearInterval(this.intervalo);
    },

    pausarOuCancelar() {
      if (this.pausado == false) {
        this.pausar();
      } else {
        this.cancelar();
      }
    },

    // Métodos referentes aos botões de programas de aquecimento pré-definidos

    programarPipoca() {
      this.nomePrograma = "Pipoca";
      this.alimento = "Pipoca (de micro-ondas)";
      this.caractereAquecimento = "*";
      this.instrucoes = "Observar o barulho de estouros do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento.";
      this.tempo = "180";
      this.potencia = "7";
      this.ePreDefinido = true;
    },

    programarLeite() {
      this.nomePrograma = "Leite";
      this.alimento = "Leite";
      this.caractereAquecimento = "^";
      this.instrucoes = "Cuidado com aquecimento de líquidos, o choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras.";
      this.tempo = "300";
      this.potencia = "5";
      this.ePreDefinido = true;
    },

    programarCarnesDeBoi() {
      this.nomePrograma = "Carnes de boi";
      this.alimento = "Carne em pedaço ou fatias";
      this.caractereAquecimento = "#";
      this.instrucoes = "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.";
      this.tempo = "840";
      this.potencia = "4";
      this.ePreDefinido = true;
    },

    programarFrango() {
      this.nomePrograma = "Frango";
      this.alimento = "Frango (qualquer corte)";
      this.caractereAquecimento = "!";
      this.instrucoes = "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.";
      this.tempo = "480";
      this.potencia = "7";
      this.ePreDefinido = true;
    },

    programarFeijao() {
      this.nomePrograma = "Feijão";
      this.alimento = "Feijão congelado";
      this.caractereAquecimento = "?";
      this.instrucoes = "Deixe o recipiente destampado e em casos de plástico, cuidado ao retirar o recipiente pois o mesmo pode perder resistência em altas temperaturas.";
      this.tempo = "480";
      this.potencia = "9";
      this.ePreDefinido = true;
    }
  }
}
</script>

<template>
  <main>
    <div id="painel">
      <form>
        <input type="text" v-model="nomePrograma" placeholder="Nome do programa">
        <input type="text" v-model="alimento" placeholder="Alimento">
        <input type="text" v-model="caractereAquecimento" placeholder="Caractere de aquecimento">
        <input type="text" v-model="instrucoes" placeholder="Instruções">
        <input type="text" v-model="tempo" placeholder="Tempo" :readonly="ePreDefinido">
        <input type="text" v-model="potencia" placeholder="Potência" :readonly="ePreDefinido">

        <div class="coluna-prog">
          <button type="button" class="btn-prog" @click="programarPipoca()">Pipoca</button>
          <button type="button" class="btn-prog" @click="programarLeite()">Leite</button>
          <button type="button" class="btn-prog" @click="programarCarnesDeBoi()">Carnes de boi</button>
          <button type="button" class="btn-prog" @click="programarFrango()">Frango</button>
          <button type="button" class="btn-prog" @click="programarFeijao()">Feijão</button>
        </div>

        <div class="linha-acoes">
          <button type="button" class="btn-acoes" @click="pausarOuCancelar()">Pausar | Cancelar</button>
          <button type="button" class="btn-acoes" @click="iniciarAquecimento()">Ligar | +30 seg</button>
        </div>
      </form>
    </div>

    <div id="processo">
      <label>{{ stringInformativa }}</label>
    </div>
  </main>
</template>

<style scoped>
main {
  height: fit-content;
  width: 40rem;
  background-color: rgb(129, 129, 129);
  padding: 2rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#processo {
  width: 15rem;
  margin-left: 3rem;
}

label {
  color: white;
}

#painel {
  width: 25rem;
}

form>input {
  height: 2.75rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: none;
  outline: none;
}

.btn-prog {
  height: 2.75rem;
  width: 100%;
  border: 1px solid black;
  border-radius: 0.3rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.btn-acoes {
  height: 2.75rem;
  width: fit-content;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.coluna-prog {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.linha-acoes {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.3rem;
}
</style>
