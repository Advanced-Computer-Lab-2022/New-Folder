import { useState } from "react";
import { postCourse } from "../network";

function CreateCourse() {
  const [data, setData] = useState({
    name:'',
    field: '',
    description: '',
    magnitude: '',
    currency: '',
  })

  const {name, field, description, magnitude, currency} = data
  const onSubmit = (e) =>{
    console.log(data)
    postCourse(data)
    e.preventDefault();
  }

  const onChange = (e) => {
    console.log(name)
    setData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))}
  return (
    <div>
      <form onSubmit={onSubmit}>
      <input
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
      <br></br>
      <input
              type='text'
              id='field'
              name='field'
              value={field}
              placeholder='Enter your field'
              onChange={onChange}
            />
      <br></br>
      <input
              type='text'
              id='description'
              name='description'
              value={description}
              placeholder='Enter your description'
              onChange={onChange}
            />
      <br></br>
      <input
              type='text'
              id='magnitude'
              name='magnitude'
              value={magnitude}
              placeholder='Enter your magnitude'
              onChange={onChange}
            />
      <br></br>
      <input
              type='text'
              id='currency'
              name='currency'
              value={currency}
              placeholder='Enter your currency'
              onChange={onChange}
            />
      <br></br>
      <button type='submit'>
              Submit
            </button>
      </form>
    </div>
  )
}

export default CreateCourse
