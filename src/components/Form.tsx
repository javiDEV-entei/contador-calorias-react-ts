import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import {v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from '../reducers/activity-reducer';




type FormProps = {
  dispatch: Dispatch<ActivityActions>
}

    const initialState: Activity = {
      id: uuidv4(),
      category: 1,
      name: '',
      calories: 0
    }

export default function Form({dispatch}:FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)
  


  const handleChange = (e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) =>{
    const isNumberField = ['category', 'calories'].includes(e.target.id)// metodo que verifica si el id del elemento es igual al de category o calories que son los campos con types numericos

    setActivity({
      ...activity,
      [e.target.id]: isNumberField? +e.target.value : e.target.value
    })
    
  }

  const isValidActivity =() =>{
    const {name, calories} = activity
    //validar que la actividad no este vacia y que las calorias sean mayores a 0
    return name.trim()!== '' && calories > 0;
    

  }
  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    dispatch({type: 'save-activity', payload: {newActivity: activity}})

    setActivity({
      ...initialState,
      id: uuidv4()// genera un nuevo id para la actividad
    })// reiniciar el state de la actividad al inicial 
  }


  return (
    <form 
    className=" space-y-5 bg-white shadow p-10 rounded-lg"
    onSubmit={handleSubmit}
    >
        <div className=" grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Catogoria:</label>

                <select className=" border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}

                >
                

                  {categories.map(category =>(
                    <option key={category.id} value={category.id}>

                      {category.name}
                    </option>
                  ))}

                </select>

        </div>
        <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>

        <input 
        id="name"
        type="text"
        className=" border-slate-300 p-2 rounded-lg"
        placeholder="Ej. Comida, jugo de naranaja, ensalada, Ejercicio, Pesas, Bicicleta"
        value={activity.name}
        onChange={handleChange}
         />
                  
        </div>

        <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>

        <input 
        id="calories"
        type="number"
        className=" border-slate-300 p-2 rounded-lg"
        placeholder="Calorias: ej. 300 o 500"
        value={activity.calories}
        onChange={handleChange}
         />       
        </div>

        <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.calories === 1 ?'Guardar Comida' : 'Guardar ejercicio'}
        disabled={!isValidActivity()}

        />
        

    </form>
  )
}
