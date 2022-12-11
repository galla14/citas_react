//import React from 'react'
//Estoy importando los hooks
import {useState, useEffect} from 'react';
import Error  from './Error'



const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  //Asi se aplica un hook:
  //En este ejemplo tenemos nombre y su funcion modificadora
  //Cada vez que modificamos la variable 'nombre', lo debemos hacer por la funcion (funcion modificadora)
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      console.log(paciente)
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)

    }else {
      console.log("No hay nada")
    }
  }, [paciente])

  
  //Para poder generar un id random, para poder generar un indice, y luego buscar este mismo
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  } 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando formulario");
    
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log("Hay uno que este vacio");
      setError(true);
      return;
    }
    
    setError(false);


    //Objeto de paciente para que lo llame App.jsx
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
      setPacientes(pacientesActualizados);
      //Limpiamos el objeto
      setPaciente({})

    } else {
      //Nuevo registro
      //Generamos id
      objetoPaciente.id = generarId();
      //Se lo pasamos a setPacientes para agregar un nuevo paciente al array
      setPacientes([...pacientes, objetoPaciente]);
    }

    //Luego debemos reiniciar el formulario, ya que sino, los valores se quedan con lo ultimo que el usuario agrego
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className='font-black text-3x1 text-center'>Seguimiento pacientes</h2>

        <p className='text-lg mt-5 text-center'>
          Añade pacientes y {" "}
          <span className='text-indigo-600 font-bold'>Administrarlos</span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded-xl py-10 px-5 mb-10'
        >
        {
          error && 
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
          
        }
          <div className='mb-5'>
            <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
            <input
              id="mascota" 
              type="text" 
              placeholder='Nombre de la Mascota'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={nombre}
              onChange={ (e) => setNombre(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor="propietario" className='block text-gray-700 uppercase font-bold'>Nombre del Propietario</label>
            <input
              id="propietario" 
              type="text" 
              placeholder='Nombre del Propietario'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>Email</label>
            <input
              id="email" 
              type="email" 
              placeholder='Email'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>Alta</label>
            <input
              id="alta" 
              type="date" 
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={fecha}
              onChange={ (e) => setFecha(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>Sintomas</label>
            <textarea 
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
              placeholder='Describe Síntomas'
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value) }
              />
          </div>

          <input 
            type="submit"
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer
            transition-colors'
            value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          />

        </form>
    </div>
  )
}

export default Formulario;
