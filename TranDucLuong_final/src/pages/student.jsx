import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Modal,Row,Col } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog'
import studentService from '../service/studentService';

class Student extends Component {
    state = {  students:[],
        student:{},
        modalShow:false,
        ModalTitle:'',
    
    }
    componentDidMount(){
        this.loadData();
    }

    loadData(){
        studentService.list().then(res =>{
            this.setState({students: res.data.data})
        })
    }

    closeModal=()=>{
        this.setState({showModal:false});
    }
    showModal=(id)=>{
        if(id===0)
        {
            //add
            this.setState({student:{}})
            this.setState({ModalTitle:'New Student'});
            this.setState({modalShow:true})
        }
        else
        {
            //update
            
            this.setState({ModalTitle:'Update Student'});
            studentService.get(id).then(res =>{
                this.setState({student:res.data.data})
                this.setState({modalShow:true})
            })
        }
        this.setState({showModal:true});
    }
    // inputOnChange=(event)=>{
    //     this.setState({firstName:event.target.value})
    // }
    inputOnChange=(event)=>{
        const {name,value}=event.target;
        const newStudent={...this.state.student,[name]:value};
        this.setState({student:newStudent})
    }

    showComfirm=id=>{
        this.dialog.show({
            title: 'Greedings',
            body: 'How are you?',
            actions: [
              Dialog.Action('No',()=>{},'btn-info'),
              Dialog.Action('Yes',()=>{
                studentService.delete(id).then(res=>{
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
        if(this.state.student.id>0)
        {
            studentService.update(this.state.student.id,this.state.student).then(res =>{
                if(res.data.errorCode===0){
                    this.setState({modalShow:false});
                    this.loadData();
                }
            });
        }else{
            studentService.add(this.state.student).then(res =>{
                if(res.data.errorCode===0){
                    this.setState({modalShow:false});
                    this.loadData();
                }
            });
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
                                <h3 class="card-title">Student <small class="text-muted">list</small></h3>
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
                                        <th >#</th>
                                        
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Gender</th>                                        
                                        <th>phone</th>
                                        <th>email</th> 
                                        <th>MajorId</th> 
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.students.map((student,idx)=>{
                                        return (
                                            <tr key={student.id}>
                                                <td>{idx+1}</td>            
                                                <td>{student.firstName}</td>
                                                <td>{student.lastName}</td>
                                                <td>{student.gender}</td>
                                                <td>{student.phone}</td>
                                                <td>{student.email}</td>
                                                <td>{student.majorId}</td>
                                                <td>
                                                    <a href="#" onClick={()=>{this.showModal(student.id)}}><i class="fas fa-edit text-primary"></i></a>
                                                    <a href="#" onClick={(e)=>{e.preventDefault(); this.showComfirm(student.id)}}><i class="fas fa-trash-alt text-danger"></i></a>
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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control 
                            name="firstName"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.student.firstName ||""}  
                            placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="BasicPassword">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control 
                            name="name"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.student.lastName ||""}  
                            placeholder="" />
                        </Form.Group>  
                                                    
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}>
                                Gender
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                type="radio"
                                label="Male"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                />
                                <Form.Check
                                type="radio"
                                label="Female"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                />
                                
                            </Col>
                            </Form.Group>
                            
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                            name="name"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.student.phone ||""}  
                            placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            name="name"
                            onChange={this.inputOnChange}
                            type="text" 
                            value={this.state.student.email ||""}  
                            placeholder="" />
                        </Form.Group>  
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>MajorID</Form.Label>
                            <Form.Control as="select" custom>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </Form.Control>
                        </Form.Group>                 
                        </Form>
                        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.save}>
            Save Changes
            
          </Button>
          
        </Modal.Footer>
        
      </Modal>
     
    
            </div>
                            );
    }
}
 
export default Student;



