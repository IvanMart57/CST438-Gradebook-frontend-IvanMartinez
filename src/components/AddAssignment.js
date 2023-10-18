import React, { useState, useRef } from 'react';
import "../App.css"
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function AddAssignment(props) { 
  var assignment;
  const nameRef = useRef();
  const idRef = useRef();
  const dateRef = useRef();

  const [message, setMessage] = useState('');
  const headers = ['Assignment Name', 'Course Id', 'Due Date'];

  const clearValues = ( ) => {
    nameRef.current.value = "";
    idRef.current.value = "";
    dateRef.current.value = "";
  }

  const saveAssignment= ( ) => {
    setMessage(''); 
    console.log(nameRef.current.value);
    console.log(idRef.current.value);
    console.log(dateRef.current.value);
    console.log("Assignment.save ");     

    let name = nameRef.current.value;
    let courseId = idRef.current.value;
    let dueDate = dateRef.current.value;
    fetch(`${SERVER_URL}/assignment/new?id=${courseId}&name=${name}&due=${dueDate}` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', }, 
        } )
    .then(res => {
        if (res.ok) {
          clearValues();
          setMessage("Assignment saved.");
        } else {
          setMessage("Save error. "+res.status);
          console.error('Save assignment error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Save assignment exception =' + err);
      });
 }; 


  return (
      <div>
        <div>
        <Link to={`/`} >Home</Link>
        <h4 id="gmessage" >{message}&nbsp;</h4>
        <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                    <th> 
                  </th>
                  <th> 

                  </th>
                  <th>
                     </th>
                  </tr>
   
                </thead>
                <tbody>
                  
                    <tr>
                      <td>
                    <input
                      name="assignent"
                      id = "name"
                      ref={nameRef} 
                      placeholder='Enter Here'
                      type="text"
                    />
                      </td>
                      <td>
                        <input
                      name="assignent"
                      id = "idInput"
                      ref={idRef} 
                      placeholder='Enter Valid Id'
                      type="text"
                    />
                      </td>
                      <td>
                        <input
                      name="assignent"
                      id = "date"
                      ref={dateRef} 
                      placeholder='YYYY-MM-DD'
                      type="text"
                    />
                      </td>
                      <td>
                      <button id="sAssignment" type="button" margin="auto" onClick = {saveAssignment}>Save Assignment</button>
                      </td>
                      <td></td>
                      <td>
            
                      </td>
                    </tr>
                </tbody>
              </table>
        </div>
      </div>
  ); 
}

export default AddAssignment;