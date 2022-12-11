import Paciente from "./Paciente";
import { useEffect } from "react";

const ListadoPacientes = ({pacientes, setPaciente, paciente, eliminarPaciente}) => {

    useEffect(() => {
        console.log("Nuevo Paciente")
      }, [paciente])
    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll mx-5">

            {pacientes && pacientes.length ? (
                <>
                    <h2 className='font-black text-3x1 text-center'>Listado pacientes</h2>

                    <p className="text-xl mt-5 text-center">
                        Administra tus {" "}
                        <span className="text-indigo-600 font-bold">Pacientes y citas</span>
                    </p>
        
                    { pacientes.map( paciente => (
                            <Paciente
                                key={paciente.id}
                                paciente={paciente}
                                setPaciente={setPaciente}
                                eliminarPaciente={eliminarPaciente}
                            />
                    ))}
                </>
            ) : (
                <>
                     <h2 className='font-black text-3x1 text-center'>No hay pacientes</h2>

                    <p className="text-xl mt-5 text-center">
                        Comienza agregando pacientes {" "}
                        <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
                    </p>
                </>
            )}
            
            
            
           
        </div>
    )
}

export default ListadoPacientes;