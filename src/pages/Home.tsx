import { Logo } from "../components/Logo";

import LogoReact from "../assets/react.svg";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  const navigation = useNavigate();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigation("/event");
  }

  return (
    <div className="min-h-screen bg-background bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto z-[1]">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React JS</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-tight">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Seu nome completo"
              className=" bg-gray-900 rounded px-5 h-14"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Digite seu e-mail"
              className=" bg-gray-900 rounded px-5 h-14"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:bg-opacity-50"
            >
              garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src={LogoReact} className="absolute" alt="" />
      <img src="/src/assets/code.png" className="mt-10" alt="" />
    </div>
  );
}
