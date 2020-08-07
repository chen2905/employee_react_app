import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Button,ButtonToolbar } from 'react-bootstrap'
import{AddDepModal} from './AddDepModal'
import{EditDepModal} from './EditDepModal'
import axios from "axios"
import qs from "qs"

export class Department extends Component {


    constructor(props) {
        super(props)//have to use super in order to init this
        this.state = { 
            deps: [], 
            addModalShow:false ,
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
        fetch('http://ecj22:9235/api/TestDepartment')
        .then(res=>res.json()
        .then(data=>{
            this.setState({deps:data})
        })
        )

    }

    deleteDep(depid){
        if(window.confirm(`Are you sure?`)){
        //console.log (`data before putting :${data.DepartmentName}`)
        
        const url = `api/TestDepartment/${depid}`
        const options = {
            method: 'DELETE',
            url,
        }
        try {
            //const instance = axios.create()
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
        const {deps,depid,depname}=this.state
        let addModalClose =()=> this.setState({addModalShow:false})
        let editModalClose =()=> this.setState({editModalShow:false})
        return (
          

            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deps.map(dep =>
                                <tr key={dep.DepartmentID}>
                                    <td>{dep.DepartmentID}</td>
                                    <td>{dep.DepartmentName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=> this.setState({
                                                editModalShow:true,
                                                depid:dep.DepartmentID,
                                                depname:dep.DepartmentName})}
                                            >Edit</Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=> this.deleteDep(dep.DepartmentID)}
                                            >Delete</Button>
                                            <EditDepModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname}
                                            />
                                        </ButtonToolbar>
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
                    Add Department           
                    </Button>
                    <AddDepModal
                    show={this.state.addModalShow}
                    onHide ={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}