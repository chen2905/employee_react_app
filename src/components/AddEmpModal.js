import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import axios from "axios"
import qs from "qs"


export class AddEmpModal extends Component {
    constructor(props) {
        super(props)

        this.state = { deps:[], snackbaropen: false, snackbarmsg: '' }


        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch('http://ecj22:9235/api/TestDepartment')
        .then(res=>res.json()
        .then(data=>{
            this.setState({deps:data})
        })
        )
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false })
    }

    
    handleSubmit(event) {
        event.preventDefault()
        const data = { 
            EmployeeID: null, 
            EmployeeName: event.target.EmployeeName.value,
            Department:event.target.Department.value,
            MailID:event.target.MailID.value,
            DOJ:event.target.DOJ.value
        };
        const url = "api/TestEmployee"
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        };

        try {
            axios(options)
            .then((response) => {
                console.log(`data ${response.data}`)
                console.log(data)
                this.setState({ snackbaropen: true, snackbarmsg: response.data })
            })
        } catch (err) {
            console.log(err)
            this.setState({ snackbaropen: true, snackbarmsg: "Failed in Adding Employee" })
        }
    }
    render() {
        return (
            <div className="Container">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-label="Close"
                            color="inherit"
                            onClick={this.snackbarClose}
                        >
                            &#xd7;
                </IconButton>
                    ]}
                />

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeName"
                                            required
                                            placeholder="Employee Name"
                                        />
                                    </Form.Group>
                                    <Form.Control as ="select" name="Department">
                                        {
                                            this.state.deps.map(dep=>
                                            <option key={dep.DepartmentID}>
                                                {dep.DepartmentName}
                                            </option>
                                                )
                                        }
                                    </Form.Control>
                                    <Form.Group controlId="MailID">
                                        <Form.Label>MailID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="MailID"
                                            required
                                            placeholder="Email"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="DOJ">
                                        <Form.Label>DOJ</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DOJ"
                                            required
                                            placeholder="DOJ"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">Add Employee</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}