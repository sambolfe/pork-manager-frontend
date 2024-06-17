import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between min-h-screen bg-gray-200 p-8">
      <div className="md:w-1/2 text-center md:text-left md:flex md:flex-col md:justify-start">
        <h1 className="text-4xl font-bold mb-4">Bem vindo ao Pork Manager!</h1>
        <p className="text-lg mb-4">
          Somos uma equipe dedicada ao desenvolvimento de soluções inovadoras para o gerenciamento da criação de suínos.
        </p>
        <p className="text-lg mb-4">
          Combinamos nossa experiência em tecnologia com um profundo conhecimento do setor para oferecer um sistema completo e intuitivo que atenda às necessidades dos criadores.
        </p>
        <p className="text-lg mb-4">
          Nosso objetivo é simplificar o processo de gerenciamento de suínos, desde o cadastramento de animais até a análise de relatórios de produção. Estamos aqui para apoiar você em cada etapa do caminho, garantindo eficiência, precisão e bem-estar animal.
        </p>
        <p className="text-lg">
          Junte-se a nós e descubra como podemos ajudar a impulsionar sua produção de suínos para o próximo nível!
        </p>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
        <img src="/home.jpg" alt="Pork Manager Home" className="w-full object-cover rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Home;