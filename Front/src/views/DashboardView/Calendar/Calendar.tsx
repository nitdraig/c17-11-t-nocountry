import {
  Button,
  Calendar,
  Card,
  CardBody,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Appointment {
  title: string;
  description: string;
  name: string;
  time: string;
  notes: string;
}

const Calendario = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment>({
    title: "Cuidado de Flupy",
    description: "Paseo, peluquería y alimentación",
    name: "Roberto Perez",
    time: "10:00 AM - 11:00 AM",
    notes: "Entregar correa y peine",
  });
  const [savedAppointments, setSavedAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Appointment
  ) => {
    const { value } = event.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [field]: value,
    });
  };

  const saveAppointment = () => {
    if (appointmentDetails.notes.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "No se aceptan notas vacías!",
        confirmButtonColor: "#F97D05",
        confirmButtonText: "Entendido",
      });
      return;
    }
    setSavedAppointments([...savedAppointments, appointmentDetails]);
    setAppointmentDetails({
      title: "",
      description: "",
      name: "",
      time: "",
      notes: "",
    });
  };

  const deleteAppointment = (index: number) => {
    const updatedAppointments = [...savedAppointments];
    updatedAppointments.splice(index, 1);
    setSavedAppointments(updatedAppointments);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="lg:text-4xl lg:mt-20 mt-2 text-2xl uppercase font-semibold  text-center">
        Tus citas agendadas
      </h3>
      <>
        {isLoading ? (
          <>
            <div className="text-center ">
              <Spinner color="warning" label="Cargando" />
            </div>
          </>
        ) : (
          <>
            <div className="lg:ml-32 ml-2   mt-10 mx-4 mb-10  lg:mt-16 lg:flex">
              <Calendar
                aria-label="Date (Show Month and Year Picker)"
                showMonthAndYearPickers
                className="shadow-lg shadow-[#F97D05] hover:rotate-1 transition duration-600"
                color="warning"
              />
              <div className="ml-8">
                <Card className="w-80 shadow-lg  shadow-[#F97D05]/60 hover:shadow-[#F97D05] transition duration-600">
                  <CardBody>
                    <Input
                      label="Título"
                      placeholder="Título de la cita"
                      value={appointmentDetails.title}
                      className="mb-4"
                      onChange={(e) => handleInputChange(e, "title")}
                    />
                    <Input
                      label="Descripción"
                      placeholder="Descripción de la cita"
                      value={appointmentDetails.description}
                      className="mb-4"
                      onChange={(e) => handleInputChange(e, "description")}
                    />
                    <Input
                      label="Nombre"
                      placeholder="Nombre del cliente"
                      value={appointmentDetails.name}
                      className="mb-4"
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                    <Input
                      label="Horario"
                      placeholder="Horario de la cita"
                      value={appointmentDetails.time}
                      className="mb-4"
                      onChange={(e) => handleInputChange(e, "time")}
                    />
                    <Input
                      label="Notas"
                      placeholder="Agrega notas aquí..."
                      value={appointmentDetails.notes}
                      className="mb-4"
                      onChange={(e) => handleInputChange(e, "notes")}
                    />
                    <Button color="warning" onClick={saveAppointment}>
                      Guardar Notas
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
            <h3 className="lg:text-4xl lg:mt-10 mt-2 text-2xl uppercase font-semibold  text-center">
              Tus notas
            </h3>
            <div className="lg:ml-96 ml-2  mt-10  mb-10  lg:mt-8 lg:flex flex-wrap text-center">
              {savedAppointments.length === 0 ? (
                <p>No hay notas guardadas</p>
              ) : (
                savedAppointments.map((appointment, index) => (
                  <Card
                    key={index}
                    className="w-80 shadow-lg  shadow-[#F97D05]/60 mt-4 mr-4 relative hover:rotate-3 transition duration-600"
                  >
                    <CardBody>
                      <h5 className="text-lg font-semibold mb-4">
                        {appointment.title}
                      </h5>
                      <p className="text-sm mb-2">{appointment.description}</p>
                      <p className="text-sm mb-2">Nombre: {appointment.name}</p>
                      <p className="text-sm mb-2">Hora: {appointment.time}</p>
                      <p className="text-sm mb-2">Notas: {appointment.notes}</p>
                      <button
                        onClick={() => deleteAppointment(index)}
                        className="absolute w-10  top-2 right-2 hover:text-red-600 hover:bg-transparent text-zinc-500 "
                      >
                        X
                      </button>
                    </CardBody>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Calendario;
