import React, { Component } from "react";
import { CacheService } from "../services/cache";
import { AppointmentService, DocumentService, getFormData, UserService } from "../services/services";
import AppointmentForm from "./appointment.form";
import SignUpFormCmp from "./signupform";

export default class Account extends Component {
  // currentUser = {}

  ma_switcher = "";
  constructor() {
    super();

    this.state = {
      show_appointment_confirmation: false,
      show_password_change_alert: false,
      ma_switcher: null,
      appointments: [],
	  documents:[],
      appointment_template: null,
      profile: {},
	  document_file: null
    };

    this.resetAppointmentTemplate();
    this.refreshDocumentForm();
  }

  componentDidMount() {
    this.switcher_list = ["ma_content__appointment", "ma_content__document", "ma_content__profile", "ma_content__changepassword"];
    this.showSubComponent(this.switcher_list[2]);

    UserService.getProfile().then((res) => this.setState({ profile: res }));
    // AppointmentService.getAppointments(AppointmentService.makeCurrentAppointmentQuery()).then((future_appointment) => this.setState({ future_appointment }));
    AppointmentService.getAppointments().then((appointments) => this.setState({ appointments }));
    DocumentService.getDocuments().then((res) => this.setState({ documents: res }));

  }

  showSubComponent = (value) => {
    console.log("attemmpting showsubcomponent " + value);
    if (this.switcher_list.includes(value)) {
      console.log("set ma_switcher state to:  " + value);
      this.setState(
        {
          ma_switcher: value,
        },
        () => console.log("switch completed to: " + this.state.ma_switcher)
      );
    }
  };
  submitNewAppointment = (data) => {
    this.setState({
      show_appointment_confirmation: !this.state.show_appointment_confirmation,
    });

    data["user_id"] = CacheService.getItem("auth_info").user._id;
    this.resetAppointmentTemplate();
    AppointmentService.createAppointment(data)
      .then((res) => {
        AppointmentService.getAppointments().then((appointments) => this.setState({ appointments }));
        this.submitCancelAppointmentIntent(data);
      })
      .catch((err) => console.log("create appointment failed", err));
  };

  submitUpdateAppointment = (data) => {
    let appointment_clone = Object.assign({}, this.state.appointment_template);
    let new_appointment = Object.assign(appointment_clone, data);
    this.resetAppointmentTemplate();
    AppointmentService.updateAppointment(new_appointment)
      .then((res) => {
        AppointmentService.getAppointments().then((appointments) => this.setState({ appointments }));
      })
      .catch((err) => console.log("create appointment failed", err));
  };

  submitCancelAppointmentIntent = (data) => {
    this.resetAppointmentTemplate();
  };

  resetAppointmentTemplate = () => {
    this.setState({ appointment_template: null });
    setTimeout(() => {
      this.setState({
        appointment_template: {
          date: "",
          time: "",
          location: "",
          department: "",
          doctor: "",
        },
      });
    }, 0);
  };
  submitDeleteAppoitnment = (id) => {
    AppointmentService.deleteAppointment(id).then((res) => {
      AppointmentService.getAppointments().then((appointments) => this.setState({ appointments }));
    });
  };

  loadAppointmentForm = (apt) => {
    this.setState({ appointment_template: Object.assign({}, apt) });
  };

  showAppointmentForm = (apt) => {
    if (!!apt)
      return (
        <AppointmentForm
          submitText={"Create"}
          submitHandler={{ create: this.submitNewAppointment, update: this.submitUpdateAppointment, cancel: this.submitCancelAppointmentIntent }}
          fields={this.state.appointment_template}
        />
      );
  };

  
  submitProfileEdit = (event) => {
    event.preventDefault();

    let data = getFormData(new FormData(event.target));
    UserService.updateProfile(data).then(() => {
      UserService.getProfile().then((res) => this.setState({ profil: res }));
    });
  };

  showDocumentForm = (blank_document) => {
    if (!!blank_document)
      return (
        <form onSubmit={this.submitNewDocument} className="browse_document_form" enctype="multipart/form-data">
          <div className="row document_actions">
            <div className="document_acton_item col-1 h-50">Document Type:</div>
            <div className="document_acton_item col-6 h-50">
              <ul className="document_type_list">
                <li className="document_type_item">
                  <input type="radio" name="document_type" id="mri" value="mri" requred/>
                  <label htmlFor="mri" className="ms-2">MRI</label>
                </li>
                <li className="document_type_item">
                  <input type="radio" name="document_type" id="bloodtest" value="bloodtest" requred/>
                  <label htmlFor="bloodtest" className="ms-2">Blood test</label>
                </li>
                <li className="document_type_item">
                  <input type="radio" name="document_type" id="catscan" value="catscan" requred/>
                  <label htmlFor="catscan" className="ms-2">Cat scan</label>
                </li>
              </ul>
            </div>
            <div className="document_acton_item col-12 h-50 py-3">
              <input type="file" accept="image/*|.pdf" name="document" onChange={this.handleDocumentFileInput} requred/>
            </div>
            <div className="document_acton_item col-6 h-50">
              <button className="btn btn-light" type="submit">Save</button>
            </div>
          </div>
        </form>
      );
  };

  handleDocumentFileInput = (e) => {
	// handle validations
	this.setState({document_file: e.target.files[0]},
		()=>console.log('document file changed',this.state.document_file))
}

  submitNewDocument = (event) => {
    event.preventDefault();


	let form_data = new FormData(event.target)
	// data.file = this.state.document_file
	// form_data.append('file2', this.state.document_file)
	
    
	if (!!!this.state.document_file){
		console.log('file invalid')
		return 
	}
	
    DocumentService.createDocument(form_data).then(() => {
		this.refreshDocumentForm();
      DocumentService.getDocuments().then((res) => this.setState({ documents: res }));
    });
  };

  refreshDocumentForm = () => {
    this.setState({ document_template: null });
    setTimeout(() => {
      this.setState({ document_template: {} });
    }, 0);
  };

  showDocuments = (documents) => {
    return documents.map((doc) => {
      return (
        <li class="list-group-item d-flex">
          <div className="col document__field d-inline-block me-4">{doc.filename}</div>
          <div className="col-1 document__field d-inline-block">{doc.metadata.document_type}</div>
          <div className="col-1 document__field d-inline-block">{doc.link}</div>
          <div className="col document__field d-inline-block px-2 ms-auto"> <a href={`/documents/${doc._id}?token=${CacheService.getItem('auth_info').token}`} target="_blank">Download document</a></div>
          <div className="col-1 document__field d-inline-block">
           
            <button className="btn-success disabled" disabled={true}>
              Update
            </button>
          </div>
          <div className="col-1 document__field d-inline-block">
            <button className="btn-success" onClick={() => this.submitDeleteDocument(doc._id)}>
              Delete
            </button>
          </div>
        </li>
      );
    });
  };

  submitDeleteDocument = (id) => {
      DocumentService.deleteDocument(id).then(
    	  DocumentService.getDocuments().then(res=> this.setState({documents:res}))
      )
  };

  submitChangePassword = (event) => {
    event.preventDefault();
    this.setState({ show_password_change_alert: !this.state.show_password_change_alert });
  };

  render() {
    return (
      <div className="cmp my_account d-flex w-100 p-5 h-100">
        <div className="ma_navigation w-25 vh-100 bg-warning">
          <ul className="ma_nav__list nav d-flex flex-column h-100 p-5 pt-4">
            <li className="ma_nav__item nav-item btn btn-primary mt-4" onClick={() => this.showSubComponent("ma_content__profile")}>
              My Profile
            </li>
            <li className="ma_nav__item nav-item btn btn-primary mt-4" onClick={() => this.showSubComponent("ma_content__appointment")}>
              Make Appointment
            </li>
            <li className="ma_nav__item nav-item btn btn-primary mt-4" onClick={() => this.showSubComponent("ma_content__document")}>
              Medical Document
            </li>
            <li className="ma_nav__item nav-item btn btn-primary mt-4" onClick={() => this.showSubComponent("ma_content__changepassword")}>
              Change Password
            </li>
          </ul>
        </div>

        <div className="ma_content ma-bg-light w-75 ms-auto">
          <div className={`ma_content__appointment w-100 p-5 ${this.state.ma_switcher === "ma_content__appointment" ? "" : "d-none"}`}>
            <div className={`appointment_form`}>{this.showAppointmentForm(this.state.appointment_template)}</div>

            <div className="appointments mt-5 mb-1">
              <h1>Appointments</h1>

              <ul className="appointments_list list-group list-group-numbered mt-3">
                {this.state.appointments.map((apt, key) => {
                  return (
                    <li className="appointments__item list-group-item" key={key}>
                      <div className="row">
                        <div className="apt__col d-inline-block col">{apt.doctor}</div>
                        <div className="apt__col d-inline-block col">{apt.department}</div>
                        <div className="apt__col d-inline-block col">{apt.location}</div>
                        <div className="apt__col d-inline-block col">{apt.date}</div>
                        <div className="apt__col d-inline-block col">{apt.time}</div>
                        <div className="apt__col d-inline-block col-1 ms-auto">
                          <button className="btn btn-secondary" onClick={() => this.loadAppointmentForm(apt)}>
                            update
                          </button>
                        </div>
                        <div className="apt__col d-inline-block col-1">
                          <button className="btn btn-danger" onClick={() => this.submitDeleteAppoitnment(apt._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={`ma_content__document p-5 ${this.state.ma_switcher !== "ma_content__document" ? "d-none" : ""}`}>
            <h1>Medical Document</h1>

            {this.showDocumentForm(this.state.document_template)}

            <div className="documents__list_section pt-5">
              <h1>Documents</h1>
              <ol class="list-group list-group-numbered documents__list pt-3">{this.showDocuments(this.state.documents)}</ol>
            </div>
          </div>
          <div className={`ma_content__profile p-5 ${this.state.ma_switcher !== "ma_content__profile" ? "d-none" : ""}`}>
            <h1>My Profile</h1>
            <SignUpFormCmp fields={this.state.profile} submitHandler={this.submitProfileEdit} submitText={"Save"} legendText={"Profile"} />
          </div>
          <div className={`ma_content__changepassword p-5 ${this.state.ma_switcher !== "ma_content__changepassword" ? "d-none" : ""}`}>
            <h1>Change Password</h1>
            <form onSubmit={this.submitChangePassword} className="profile_changepassword_form ">
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPasswordold" placeholder="OldPassword" />
                <label htmlFor="floatingPassword">Old Password</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPasswordnew" placeholder="New Password" />
                <label htmlFor="floatingPassword">New Password</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPasswordconfirma" placeholder="confirm Password" />
                <label htmlFor="floatingPassword">Confirm Password</label>
              </div>

              <button type="submit" className="btn btn-light mt-5">
                Update
              </button>

              <div className={`alert alert-success ${this.state.show_password_change_alert ? "d-block" : "d-none"}`}>Your password has been changed</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
