import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import SubmitInput from "../SubmitInput";
import Title from "../Title";
import { useEffect } from "react";
import AddUserDTO from "../../interfaces/AddUserDTO";
import User from "../../interfaces/User";
import Modal from "../Modal/Modal";
import EditUserDTO from "../../interfaces/EditUserDTO";

export interface EditUserProps {
    user: User;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (test: EditUserDTO) => void;
}

export default function EditUser({ isOpen, onClose, onEdit, user }: EditUserProps) {
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
    onEdit(data);
  };

  useEffect(() => {
    if(isOpen) {
        reset({
            email: user.email,
            name: user.name
        });
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>Editar Usuario</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6">
          <input
            placeholder="Nombre"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            {...register("name", { value:  user.name, required: true })}
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
                value:  user.email,
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
