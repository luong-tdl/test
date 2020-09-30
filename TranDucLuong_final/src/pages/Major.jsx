import React, { Component } from 'react';
// import majorService from '../service/majorService';
import Button from 'react-bootstrap/Button';
import { Form, Modal,Col,Row } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog'
import instructorsService from '../service/instructorsService';


class Major extends Component{

    state   =   {
        instructors:[],
        instructor:{},
        modalShow:false,
        ModalTitle:'',
        // majors:[],
        // major:{},
        


    }
    componentDidMount(){
        this.loadData();
    }

    loadData(){
        // majorService.list().then(res =>{
        //     this.setState({majors:  res.data.data})
        // })
        instructorsService.list().then(res =>{
            this.setState({instructors:  res.data.data})
        })
    }

    closeModal=()=>{
        this.setState({showModal:false});
    }
    showModal=(id)=>{
        if(id===0)
        {
            //add
            this.setState({instructor:{}})
            this.setState({ModalTitle:'Instructor'});
            this.setState({modalShow:true})
        }
        else
        {
            //update
            
            this.setState({ModalTitle:'Update Instuctor'});
            instructorsService.get(id).then(res =>{
                this.setState({instructor:res.data.data})
                this.setState({modalShow:true})
            })
        }
        this.setState({showModal:true});
    }
    inputOnChange=(event)=>{
        const {name,value}=event.target;
        const newInstructor={...this.state.instructor,[name]:value};
        this.setState({instructor:newInstructor})
        console.log(newInstructor);
    }

    onChangeMale = () => {
        this.setState(initialState => ({
          isApple: !initialState.isAvocado,
        }));
      }
      onChangeFemale = () => {
        this.setState(initialState => ({
          isApple: !initialState.isAvocado,
        }));
      }
    showComfirm=id=>{
        this.dialog.show({
            title: 'Greedings',
            body: 'How are you?',
            actions: [
              Dialog.Action('No',()=>{},'btn-info'),
              Dialog.Action('Yes',()=>{
                instructorsService.delete(id).then(res=>{
                    if(res.data.errorCode===0){
                        this.setState({modalShow:false});
                        this.loadData();
                    }
                });
              })
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
              console.log('closed by clicking background.')
            }
          })
        
    }
    save=()=>{
        if(this.state.instructor.id>0)
        {
            instructorsService.update(this.state.instructor.id,this.state.instructor).then(res =>{
                if(res.data.errorCode===0){
                    this.setState({modalShow:false});
                    this.loadData();
                }
            });
        }else{
           instructorsService.add(this.state.instructor).then(res =>{
                if(res.data.errorCode===0){
                    this.setState({modalShow:false});
                    this.loadData();
                }
            });
            // majorService.add(this.state.major).then(res =>{
            //     if(res.data.errorCode===0){
            //         this.setState({modalShow:false});
            //         this.loadData();
            //     }
            // });
        }
    }
    render(){
        return(
            
            <div>
                                <div class="container mt-4">
                <div class="card border-primary bt-primary-5">
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                {/* <h3 class="card-title">Instructor <small class="text-muted">list</small></h3> */}
                                <h3 class="card-title">Instructor</h3>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-primary" onClick={()=>this.showModal(0)} data-toggle="modal" data-target="#editModal"><i class="fas fa-plus"></i> Add</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover table-striped">
                                <thead>
                                    <tr class="table-primary">
                                        <th >Account</th>
                                        <th>Full name</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.instructors.map((instructor,idx)=>{
                                        return (
                                            <tr key={instructor.id}>
                                                {/* <td>{idx+1}</td> */}
                                                <td>{instructor.code}</td>
                                                <td>{instructor.firstName} {instructor.lastName}</td>
                                                <td>{instructor.gender}</td>
                                                <td>{instructor.phone}</td>
                                                <td>{instructor.email}</td>
                                                <td>
                                                    <a href="#" onClick={()=>{this.showModal(instructor.id)}}><i class="fas fa-edit text-primary"></i></a>
                                                    <a href="#" onClick={(e)=>{e.preventDefault(); this.showComfirm(instructor.id)}}><i class="fas fa-trash-alt text-danger"></i></a>
                                                    <Dialog ref={(component) => { this.dialog = component }} />
                                                </td>
                                            </tr>
                                            
                                        )
                                    })}
                                    
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>


             

      <Modal show={this.state.showModal} onHide={this.closeModal} animation={false}>
        <Modal.Header closeButton>
                                <Modal.Title>{this.state.ModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

                    <Form>                       
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Account
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control 
                            name="code"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.instructor.code||""}  
                            placeholder="Account" /> 
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Fullname
                            </Form.Label>
                            <Col sm={6}>
                            <Form.Control 
                            name="lastName"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.instructor.lastName ||""}  
                            placeholder="LastName" />  
                            </Col>
                            <Col sm={4}>
                            <Form.Control 
                            name="firstName"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.instructor.firstName ||""}  
                            placeholder="Firstname" />  
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Gender
                            </Form.Label>
                            <Col sm={2}>
                            <Form.Check
                                type="radio"
                                label="Male"
                                name="gender"
                                value="0"
                                id="formHorizontalRadios2"
                                onChange={this.inputOnChange}
                                />
                            </Col>
                            <Col sm={2}>
                                <Form.Check
                                type="radio"
                                label="Female"
                                name="gender"
                                id="formHorizontalRadios1"
                                value="1"
                                onChange={this.inputOnChange}
                                />
                            </Col>
                            
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Phone
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control 
                            name="phone"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.instructor.phone ||""}  
                            placeholder="Phone"/>
                            </Col>
                        </Form.Group> 
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Email
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control 
                            name="email"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.instructor.email ||""}  
                            placeholder="Email" />
                            </Col>
                        </Form.Group> 
                                              
                        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.save}>
            Save
          </Button>
          
        </Modal.Footer>
        
      </Modal>
     
    
            </div>
                            );
    }
}
export default Major;