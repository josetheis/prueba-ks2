import { SubmitHandler, useForm } from "react-hook-form";
import AddUserDTO from "../../interfaces/AddUserDTO";
import { useEffect } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title";
import Button from "../Button";
import SubmitInput from "../SubmitInput";

export interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (test: AddUserDTO) => void;
}

export default function AddUser({ isOpen, onClose, onSave }: AddUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserDTO>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const onSubmit: SubmitHandler<AddUserDTO> = (data) => {
    onSave(data);
  };

  // Reseteamos el formulario cuando abrimos la modal
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>Agregar Usuario</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6">
          <input
            placeholder="Nombre"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-sm text-red-700">
              El nombre del usuario es requerido
            </span>
          )}
        </div>

        <div className="my-6">
          <input
            placeholder="Email"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            {...register("email", {
              required: {
                message: "El email es requerido",
                value: true
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El email esta en un formato erroneo",
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-700">{errors.email.message}</span>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <Button type="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <SubmitInput>Guardar</SubmitInput>
        </div>
      </form>
    </Modal>
  );
}
