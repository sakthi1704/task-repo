import React from 'react';
import {Formik} from 'formik';
// import './dashboard.css';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';
import Chart from "react-google-charts";
import modalApp from './modalApp';
import { stat } from 'fs';


let btns;
let newData;
let data;

class Popup extends React.Component {
     data = [
        ["name", "Visitations", { role: "style" }],
       
        ["2010", 10, "color: gray"],
        ["2020", 14, "color: #76A7FA"],
        ["2030", 16, "color: blue"],
        ["2040", 22, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
        [
          "2050",
          28,
          "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"
        ]
      ];
     newData = JSON.stringify(this.props.text.user)
    render() {
      return (
          
        <div className='popup'>
        {console.log('ffbmd', JSON.stringify(this.props.text))}
          <div className='popup_inner'>
          <Chart chartType="BarChart" width="100%" height="400px" data={this.data} />
          <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }
class DashboardComponent extends React.Component {
    constructor() {
        super();
        this.state = {
          showPopup: false
        };
      }
      togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
    getComponent(event) {
        console.log('li item clicked!');
        event.currentTarget.style.backgroundColor = '#ccc';
    }
    render() {
        return (
            <div>
                <Formik
                    // accepts the initial object with the 'name' field that is empty
                    initialValues={{name: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        // after submitting disatches 'loadUserData' with entered username to saga
                        // to trigger the API request
                        this.props.loadUserData(values.name);
                        setSubmitting(false);
                    }}
                    // validating the input which should be a text and required
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Required')
                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name"><b>GitHub Name</b></label>
                                <input
                                    id="name"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    // In case, if the user didn't input the data to the search field
                                    // then the border of the field would be red
                                    className={errors.name && touched.name ? 'error' : ''}
                                />
                                {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}
                              
                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                              
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        );
                    }}
                </Formik>
               
                <div className="output">
                    
                    {JSON.stringify(this.props.user, null, 2)}
                    {/* {console.log(btns, 'btns')}
                    {console.log('props',typeof (this.props.user))} */}
                   </div> 
                 {/* {this.props.user.length >  0 ?
<ul>   

    
   { this.props.user.map( i =>{
    //    <li>i</li>
    console.log(i.full_name)
   })
}
</ul> : null} */}
                    {/* {
                   for ( let btn of btns ) {
                    btn.onclick = function() {
                      console.clear()
                      console.log(this.textContent)
                    }
                  }
                     
                    } */}
                {console.log(JSON.stringify(this.props.user), this.props.user)}
           {btns =JSON.stringify(this.props.user)}
           <div>
         <ul>
            <li onClick={this.getComponent.bind(this)}>{btns}</li>
         </ul>
         <ul>
         <li onClick={this.togglePopup.bind(this)}>{btns}</li>
       </ul>
        {this.state.showPopup ? 
          <Popup
            text={this.props.user}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
       </div>
            </div>
        );
    }
}

// making the most current state of 'user' available as props in the component
const mapStateToProps = (state) => {
    // for(let tempVal of Object.values(state.user)){
let temp =Object.values(state.user) ;
    //     for(let newVal of Object.values(tempVal))
        console.log('tempVal', typeof temp,  )
    // }
    // let temp = state.user.user !== null ? state.user.user : null
    // console.log(temp.map(full_name => full_name));
    for(let newVal in state.user){
        console.log( state.user[newVal])
    }
    Object.keys(state.user).map(function(key){
        console.log( state.user[key])
    })
    // if(state.user !== null){
    //     let temp= state.user["user"]
    //     console.log(temp,
    //         typeof temp)
    // // var result = Object.keys(temp).map(function(key) {
      
    // //     // console.log(key)
     
    // //     // Object.keys(state.user[key]).map(function(key) {
    // //         // console.log(key)
    // //     //     // return [key, state.user[key]];
    // //     //   });
    // //     // }                                                                                                                                                                                                                                                                                                                                           
    // //     // return [key, state.user[key]];
    // //   });
    // }
    return {
        user: state.user,
        
    };
   
};

// creating a function called 'loadUserData'
// that dispatches a 'LOAD_USER_DATA' action to the store
// so that saga can trigger and start the API request
const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};

// connect the Dashboard component and export it for use in <App />
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

