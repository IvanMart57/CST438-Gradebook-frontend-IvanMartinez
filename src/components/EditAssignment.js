import React, {useState, useEffect, useRef}  from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function EditAssignment(props) { 

  const nameRef = useRef();
  const idRef = useRef();
  const dateRef = useRef();


  let assignmentId=0;
  const [message, setMessage] = useState('');
  const [assignment, setAssignment] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const path = window.location.pathname;
  const s = /\d+$/.exec(path)[0];
  console.log("Edit assignmentId="+s);
  assignmentId=s;
  const headers = ['Assignment Name', 'Course Id', 'Due Date'];
  useEffect(() => {
    fetchDetails()
   }, [] )

 
  const fetchDetails = ( ) => {
      setMessage('');
      console.log("fetchDetails "+assignmentId);
      fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json()) 
      .then((data) => { setAssignment(data) })        
      .catch(err => { 
        setMessage("Exception. "+err);
        console.error("fetch grades error "+ err);
      });
      setName(assignment.courseTitle);
      setId(assignment.id);
      setDate (assignment.dueDate);
    }

    const saveAssignmentChanges= ( ) => {
      setMessage(''); 
      console.log(nameRef.current.value);
      console.log(idRef.current.value);
      console.log(dateRef.current.value);
      console.log("Assignment.edit ");    
  
      let name = nameRef.current.value;
      let courseId = idRef.current.value;
      let dueDate = dateRef.current.value;

      fetch(`${SERVER_URL}/assignment/update/?id=${courseId}&name=${name}&date=${dueDate}` , 
          {  
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', }, 
          } )
      .then(res => {
          if (res.ok) {
            setMessage("Assignment changes saved.");
          } else {
            setMessage("Edit error. "+res.status);
            console.error('Edit assignment error =' + res.status);
      }})
        .catch(err => {
            setMessage("Exception. "+err);
            console.error('Edit assignment exception =' + err);
        });
   }; 

  return (
      <div>
      <Link to={`/`} >Home</Link>
       <h3>Assignment Grades</h3>
        <div margin="auto" >
          <h4 id="gmessage" >{message}&nbsp;</h4>
          <table className="Center"> 
            <thead>
              <tr>
                {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>
              <input
                name="assignent"
                ref={nameRef} 
                id = "name"
                placeholder='Enter Here'
                value = {name}
                onChange={e => setName(e.target.value)}
                type="text"
              />
                </td>
                <td>
                  <input
                name="assignent"
                ref={idRef} 
                value = {id}
                id = "id"
                onChange={e => setId(e.target.value)}
                placeholder='Enter Valid Id'
                type="text"
              />
                </td>
                <td>
                <input
                name="assignent"
                id = "date"
                ref={dateRef}
                value = {date} 
                placeholder='YYYY-MM-DD'
                onChange={e => setDate(e.target.value)}
                type="text"
              />
                </td>
                <td>
                <button id="editAssignment" type="button" margin="auto" onClick = {saveAssignmentChanges}>Edit Assignment</button>
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

export default EditAssignment;