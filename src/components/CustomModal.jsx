
import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../App.css';

export default class CustomModal extends React.Component {

    render() {
		return (
            <Modal
            show={this.props.show}
            onHide={this.props.show}
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Body
                bsPrefix="default"
                style={{
                backgroundColor: "pink",
                color: "red",
                fontFamily: "Lucida Console",
                textAlign: "center" }}
            >
                <p>{this.props.content}</p>
            </Modal.Body>

            <Modal.Footer
                bsPrefix="default"
                style={{
                backgroundColor: "pink",
                color: "red",
                fontFamily: "Lucida Console",
                textAlign: "center"
                }}>
                <Button
                variant="outline-danger"
                onClick={() => {
                    console.log(this.props);
                    this.props.onCancel()}} >
                    Xác nhận
                </Button>
            </Modal.Footer>
            </Modal>
        );
    }
}