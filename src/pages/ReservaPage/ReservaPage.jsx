import DetailInformacao from "../../Components/DetailInformacao/DetailInformacao";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/NavBar/Navbar";
import ReservaHeader from "../../Components/ReservaHeader/ReservaHeader";
import Reserva from "../../Components/Reserva/Reserva";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import dadosVeiculo from "../../data/contents.json";

export function ReservaPage() {
  const [veiculo, setVeiculo] = useState([]);
  const veiculoId = useParams();
  const navigate = useNavigate();

  const estaLogado = !!localStorage.getItem("usuarioLogado");

  const verificarLogin = () => {
    console.log(estaLogado);

    if (!estaLogado) {
      console.log("Redirecionando para /login");

      navigate("/login");
      Swal.fire({
        icon: "error",
        title: "Atenção:",
        text: "Para realizar a reserva você deverá estar logado.",
        confirmButtonColor: "#f0572d",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else {
          navigate("/login");
        }
      });
    }
  };

  const getVeiculo = () => {
    const veiculoEncontrado = dadosVeiculo.find(
      (item) => item.id === parseInt(veiculoId.id)
    );
    setVeiculo(veiculoEncontrado);

    console.log(veiculoEncontrado);
  };

  useEffect(() => {
    getVeiculo();
    verificarLogin();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      transitionDelay: 300,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <ReservaHeader veiculo={veiculo} />
        <Reserva veiculo={veiculo} />
        <DetailInformacao />
      </main>
      <Footer />
    </>
  );
}
