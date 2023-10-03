import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import { Button } from '@mui/base';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }

  const deleteAssignment = (assignmentId) => {
    setMessage(''); 
    console.log("Assignment.delete ");     
    fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
        {  
          method: 'DELETE', 
          headers: { 'Content-Type': 'application/json', }, 
          body: JSON.stringify( assignmentId )
        } )
    .then(res => {
        if (res.ok) {
          fetchAssignments();
          setMessage("Assignment Deleted.");
        } else {
          setMessage("Delete error. "+res.status);
          console.error('Delete error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Delete exception =' + err);
      });
 };  
  
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td>
                      <Link to={`/assignment/${assignments[idx].id}`} >Edit</Link>
                      </td>
                      <td>
                        <Button id ={`deleteOption${idx}`} onClick={() => deleteAssignment(`${assignments[idx].id}`)}>Delete </Button>
                      </td>
                    </tr>
                  ))}
                    <tr>
                      <td></td>
                      <td>
                        <a href = "/addAssignment">
                        <Button id ={"addAssignment"} > Add Assignment </Button>
                        </a>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>

                    </tr>
                </tbody>
              </table>
          </div>
      </div>
    )
}  

export default ListAssignment;