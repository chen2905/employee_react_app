import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import axios from "axios"
import qs from "qs"


export class AddDepModal extends Component {
    constructor(props) {
        super(props)

        this.state = { snackbaropen: false, snackbarmsg: '' }


        this.handleSubmit = this.handleSubmit.bind(this)
    }



    snackbarClose = (event) => {
        this.setState({ snackbaropen: false })
    }


    handleSubmit(event) {
        event.preventDefault()
        const data = { DepartmentID: null, DepartmentName: event.target.DepartmentName.value };
        const url = "api/TestDepartment"
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
            this.setState({ snackbaropen: true, snackbarmsg: "Failed in Adding Department" })
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
                            Add Department
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>DepartmentName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DepartmentName"
                                            required
                                            placeholder="Department Name"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">Add Department</Button>
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