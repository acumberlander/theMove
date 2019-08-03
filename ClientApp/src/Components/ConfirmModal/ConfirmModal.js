import React, { Component } from 'react'
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
// import BackendRequests from '../../Helpers/Data/BackendRequests/BackendRequests';
import './ConfirmModal.scss';

export default class ConfirmModal extends Component {
	state = {
		modalOpen: false,
	}
	
	  toggle() {
		this.setState(prevState => ({
		  modalOpen: !prevState.modalOpen
		}));
	  }

	render() {
		const { modalOpen } =this.state;
		
		return (
			<div>
				<Modal
					isOpen={modalOpen}
					toggle={this.toggle}
				>
					<ModalBody>
						<p>Add location to your itinerary?</p>
					</ModalBody>
					<ModalFooter>
						<div className="confirmButtonsDiv">
							<Button>Yes</Button>
							<Button>Cancel</Button>
						</div>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}
