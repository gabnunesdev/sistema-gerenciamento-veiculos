import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Car, X } from "lucide-react";
import api from "../services/api";
import { useState, useEffect } from "react";


const vehicleSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  placa: z
    .string()
    .min(7, { message: "A placa deve ter pelo menos 7 caracteres." })
    .max(8),
});


type VehicleFormInputs = z.infer<typeof vehicleSchema>;


interface Vehicle {
  id: number;
  nome: string;
  placa: string;
  status: "ativo" | "inativo";
}


interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (savedVehicle: Vehicle) => void;
  vehicleToEdit?: Vehicle | null;
}

export default function VehicleFormModal({
  isOpen,
  onClose,
  onSave,
  vehicleToEdit,
}: VehicleFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!vehicleToEdit;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleFormInputs>({
    resolver: zodResolver(vehicleSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && vehicleToEdit) {
        reset({ nome: vehicleToEdit.nome, placa: vehicleToEdit.placa });
      } else {
        reset({ nome: "", placa: "" });
      }
    }
  }, [isOpen, isEditMode, vehicleToEdit, reset]);

  const onSubmit = async (data: VehicleFormInputs) => {
    setIsSubmitting(true);
    try {
      let response;
      if (isEditMode && vehicleToEdit) {
       
        response = await api.put(`/vehicles/${vehicleToEdit.id}`, data);
      } else {
        
        response = await api.post("/vehicles", data);
      }
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      alert("Falha ao salvar o veículo. Tente novamente.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  if (!isOpen) {
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black/75 bg-blend-overlay flex justify-center items-center z-50">
  
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-800">
 
              {isEditMode ? "Editar Veículo" : "Cadastrar Novo Veículo"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Veículo
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Digite o nome do veículo"
              {...register("nome")}
              className={`w-full px-4 py-2 border ${
                errors.nome ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.nome && (
              <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="placa"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Placa do Veículo
            </label>
            <input
              id="placa"
              type="text"
              placeholder="Digite a placa do veículo"
              {...register("placa")}
              className={`w-full px-4 py-2 border ${
                errors.placa ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.placa && (
              <p className="text-red-500 text-xs mt-1">
                {errors.placa.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
 
            {isSubmitting
              ? "Salvando..."
              : isEditMode
              ? "Salvar Alterações"
              : "Criar Veículo"}
          </button>
        </form>
      </div>
    </div>
  );
}
