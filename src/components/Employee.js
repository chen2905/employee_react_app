import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Button,ButtonToolbar } from 'react-bootstrap'
import{AddEmpModal} from './AddEmpModal'
import{EditEmpModal} from './EditEmpModal'
import axios from "axios"
import qs from "qs"
export class Employee extends Component {

    constructor(props) {
        super(props)//have to use super in order to init this
        this.state = { 
            emps: [],
            addModalShow:false,
            editModalShow:false
        }
    }
    componentDidMount() {
        this.refreshList()
    }
    componentDidUpdate() {
        this.refreshList()
    }
    refreshList() {
        fetch('http://ecj22:9235/api/TestEmployee')
        .then(res=>res.json()
        .then(data=>{
            this.setState({emps:data})
        })
        )

    }
    deleteEmp(empid){
        if(window.confirm(`Are you sure?`)){
        //console.log (`data before putting :${data.DepartmentName}`)
        
        const url = `api/TestEmployee/${empid}`
        const options = {
            method: 'DELETE',
            url,
        }
        try {
            axios(options)
            .then((response) => {
               console.log(response.data)
            })
        } catch (err) {
            console.log(err)
            //this.setState({ snackbaropen: true, snackbarmsg: "Failed in Adding Department" })
        }
        }


    }
    render() {
        const {emps,empid,empname,empdep,empmailid,empdoj}=this.state
        let addModalClose =()=> this.setState({addModalShow:false})
        let editModalClose =()=> this.setState({editModalShow:false})
        return (

            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Employee Name</th>
                    <th>department</th>
                    <th>Mail</th>
                    <th>DOJ</th>
                    <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        emps.map(emp =>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DOJ}</td>
                                <td> <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                            onClick={()=> this.setState({
                                                editModalShow:true,
                                                empid:emp.EmployeeID,
                                                empname:emp.EmployeeName,
                                                empdep:emp.Department,
                                                empmailid:emp.MailID,
                                                empdoj:emp.DOJ
                                            })}
                                            >Edit</Button> 
                                
                                
                                <Button className="mr-2" variant="danger"
                                            onClick={()=> this.deleteEmp(emp.EmployeeID)}
                                            >Delete</Button>
                                     </ButtonToolbar>
                                     <EditEmpModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            empid={empid}
                                            empname={empname}
                                            empdep={empdep}
                                            empmailid={empmailid}
                                            empdoj={empdoj}
                                           
                                    />                  
                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </Table> 
            <ButtonToolbar>
                    <Button variant ="primary"
                    onClick={ ()=>this.setState({addModalShow:true})}
                    >
                    Add Employee           
                    </Button>
                    <AddEmpModal
                    show={this.state.addModalShow}
                    onHide ={addModalClose}
                    />
                </ButtonToolbar>
        </div>
        )
    }
}