

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import logo from "../assets/logo-epta.png";
import image from "../assets/image.svg";
import { useAuth } from "../contexts/AuthContext";


const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});


type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setApiError(error.response.data.message || "Credenciais inválidas.");
      } else {
        setApiError("Não foi possível conectar ao servidor.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg lg:flex overflow-hidden">
        {/* Seção do Formulário */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="EPTA Tecnologia Logo" className="w-32" />
            </div>
            <p className="text-center text-gray-600 mb-8">
              Bem-vindo de volta! Insira seus dados.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  {...register("email")}
                  className={`w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                  className={`w-full px-4 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {apiError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{apiError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-xl/15 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-8">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="font-semibold text-blue-500 hover:underline"
              >
                Cadastre-se gratuitamente!
              </a>
            </p>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 bg-blue-100 items-center justify-center p-8">
          <img src={image} className="w-10" alt="" />
        </div>
      </div>
    </div>
  );
}
