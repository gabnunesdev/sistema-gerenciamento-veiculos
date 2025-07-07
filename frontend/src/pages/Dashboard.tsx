import { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import VehicleFormModal from "./VehicleFormModal";
import {
  ChevronDown,
  CirclePlus,
  Pencil,
  Trash2,
  Archive,
  ArchiveRestore,
  LogOut,
  Menu, 
} from "lucide-react";

import logo from "../assets/logo-epta.png";

import Categorize from "../assets/Categorize.svg";
import DashboardGray from "../assets/DashboardGray.svg";
import Dashboard from "../assets/Dashboard.svg";
import Check from "../assets/Check.svg";
import UserYellow from "../assets/UserYellow.svg";
import User from "../assets/User.svg";


interface Vehicle {
  id: number;
  nome: string;
  placa: string;
  status: "ativo" | "inativo";
}

export default function DashboardPage() {
  const { logout } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);


  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  
  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleOpenAddModal = () => {
    setVehicleToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle);
    setIsFormModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setVehicleToEdit(null);
  };

  const handleSaveVehicle = (savedVehicle: Vehicle) => {
    const exists = vehicles.some((v) => v.id === savedVehicle.id);
    if (exists) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === savedVehicle.id ? savedVehicle : v))
      );
    } else {
      setVehicles((prev) => [savedVehicle, ...prev]);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await api.patch(`/vehicles/${id}/archive`);
      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "inativo" } : v))
      );
    } catch (error) {
      console.error("Erro ao arquivar veículo:", error);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await api.patch(`/vehicles/${id}/restore`);
      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "ativo" } : v))
      );
    } catch (error) {
      console.error("Erro ao restaurar veículo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        "Tem certeza que deseja remover este veículo permanentemente?"
      )
    ) {
      try {
        await api.delete(`/vehicles/${id}`);
        setVehicles((prev) => prev.filter((v) => v.id !== id));
      } catch (error) {
        console.error("Erro ao remover veículo:", error);
      }
    }
  };

  const stats = useMemo(() => {
    const total = vehicles.length;
    const ativos = vehicles.filter((v) => v.status === "ativo").length;
    const inativos = total - ativos;
    return { total, ativos, inativos };
  }, [vehicles]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex">
        
        <aside
          className={`fixed inset-y-0 left-0 bg-white shadow-lg z-30 w-64 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 lg:flex lg:flex-col`}
        >
          <div className="h-16 flex items-center justify-start ml-8 ">
            <img src={logo} alt="EPTA Tecnologia Logo" className="h-11" />
          </div>
          <nav className="flex-1 px-4 py-6 border-r border-gray-100">
            <p className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navegação
            </p>
            <ul>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-blue-600 bg-gray-100 rounded-3xl font-semibold mb-1"
                >
                  <img src={Categorize} className="w-5 h-5 mr-3" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-3xl"
                >
                  <img src={DashboardGray} className="w-5 h-5 mr-3" />
                  Relatórios
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        
        <div className="flex-1 flex flex-col w-full lg:w-auto">
          
          <header className="h-16 bg-white flex items-center justify-between lg:justify-end px-4 sm:px-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <img src={User} className="w-6.5 h-6.5 rounded-full" />
                <ChevronDown
                  className={`w-6 h-auto ml-1 cursor-pointer transition-transform duration-300 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={3}
                  color="#007bff"
                />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 cursor-pointer">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2 cursor-pointer" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </header>

          
          <main className="flex-1 p-4 sm:p-8 bg-white">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Olá Gabriel,</h2>
              <p className="text-gray-500">Cadastre e gerencie seus veículos</p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow flex items-center">
                <div className="bg-blue-100 rounded-full mr-4">
                  <img src={Dashboard} className="w-16 h-16" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex items-center">
                <div className="bg-green-100 rounded-full mr-4">
                  <img src={Check} className="w-16 h-16" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ativos</p>
                  <p className="text-3xl font-bold">{stats.ativos}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex items-center">
                <div className="rounded-full mr-4">
                  <img src={UserYellow} className="w-16 h-16" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Inativos</p>
                  <p className="text-3xl font-bold">{stats.inativos}</p>
                </div>
              </div>
            </div>

            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm lg:shadow">
              <div className="mb-4">
                <button
                  onClick={handleOpenAddModal}
                  className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl flex items-center cursor-pointer hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  <CirclePlus className="w-5 h-5 mr-2 " strokeWidth={3} />
                  Cadastrar Veículo
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Veículo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 hidden sm:table-cell"
                      >
                        Placa
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={4} className="text-center p-8">
                          Carregando veículos...
                        </td>
                      </tr>
                    ) : (
                      vehicles.map((vehicle) => (
                        <tr
                          key={vehicle.id}
                          className="bg-white hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {vehicle.nome}
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            {vehicle.placa}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                  vehicle.status === "ativo"
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                              ></div>
                              <span className="hidden md:inline">
                                {vehicle.status.charAt(0).toUpperCase() +
                                  vehicle.status.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right ">
                            <div className="flex items-center justify-end space-x-2 sm:space-x-4">
                              <button
                                onClick={() => handleOpenEditModal(vehicle)}
                                title="Editar"
                                className="text-gray-500 hover:text-blue-600 cursor-pointer"
                              >
                                <Pencil
                                  className="w-5 h-5 cursor-pointer"
                                  strokeWidth={3}
                                  color="black"
                                />
                              </button>
                              {vehicle.status === "ativo" ? (
                                <button
                                  onClick={() => handleArchive(vehicle.id)}
                                  title="Arquivar"
                                  className="text-gray-500 hover:text-yellow-600 cursor-pointer"
                                >
                                  <Archive
                                    className="w-5 h-5 cursor-pointer"
                                    strokeWidth={3}
                                    color="black"
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRestore(vehicle.id)}
                                  title="Restaurar"
                                  className="text-gray-500 hover:text-green-600"
                                >
                                  <ArchiveRestore
                                    className="w-5 h-5 cursor-pointer"
                                    strokeWidth={3}
                                    color="black"
                                  />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(vehicle.id)}
                                title="Remover"
                                className="text-gray-500 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2
                                  className="w-5 h-5"
                                  strokeWidth={3}
                                  color="red"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        ></div>
      )}

      <VehicleFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVehicle}
        vehicleToEdit={vehicleToEdit}
      />
    </>
  );
}