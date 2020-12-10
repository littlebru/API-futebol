import "./style.css";
import React, { useState, useEffect } from "react";
import React from "react";

export default function App() {
  const [times, setTimes] = useState([]);

  var url = "https://api.api-futebol.com.br/v1/campeonatos/10/tabela";

  /* Retornando dados direto da API
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = () => {
      //test_d784188876d7d44c203723fa1d2381
      fetch(url, {
        headers: new Headers({
          Authorization: `Bearer live_aab7d3aa611512ea6ba20e07d53a1d`
        })
      })
        .then(obj => obj.json())
        .then(json => {
          //erro json
          if (json.erro) {
            console.log(json.erro);
          } else {
            setTimes(json)
            console.log(JSON.stringify(json));
          }
        })
        .catch(error => console.log(error));
    };
    requestOptions();
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);*/

  // JSON.stringify(json)

  const ultimosJogos = props => {
    if (props === "d") return <i className="fas fa-circle text-danger mr-2" />;
    else if (props === "e")
      return <i className="fas fa-circle text-secondary mr-2" />;
    else return <i className="fas fa-circle text-success mr-2" />;
  };

  // retornando dados salvos em um arquivo texto
  useEffect(() => {
    const requestOptions = () => {
      setTimes(require("./times.json"));
    };
    requestOptions();
  }, []);

  const classificacaoTimes = (props, tamanhoLista) => {
    if (props <= 4) return "text-primary";
    else if (props > tamanhoLista - 4) {
      return "text-danger";
    }
  };

  return (
    <div className="container container-sm container-lg">
      <h5 className="mt-4 mb-4">Tabela do Campeonato Brasileiro</h5>
      {console.log(times.length)}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col" />
            <th scope="col">Time</th>
            <th scope="col">P</th>
            <th scope="col">J</th>
            <th scope="col">V</th>
            <th scope="col">E</th>
            <th scope="col">D</th>
            <th scope="col">Recentes</th>
          </tr>
        </thead>
        <tbody>
          {times.map(time => {
            return (
              <tr key={time.time_id}>
                <th scope="row">
                  <img className="img-time" src={time.time.escudo} />
                </th>
                <td className={classificacaoTimes(time.posicao, times.length)}>
                  {time.time.nome_popular}
                </td>
                <td className={classificacaoTimes(time.posicao, times.length)}>
                  {time.pontos}
                </td>
                <td className={classificacaoTimes(time.posicao, times.length)}>
                  {time.jogos}
                </td>
                <td className={classificacaoTimes(time.posicao, times.length)}>
                  {time.vitorias}
                </td>
                <td className={classificacaoTimes(time.posicao, times.length)}>
                  {time.empates}
                </td>
                <td className={classificacaoTimes(time.posicao, times.length)}>
                  {time.derrotas}
                </td>
                <td className="recent-topic">
                  {time.ultimos_jogos.map(jogo => ultimosJogos(jogo))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
