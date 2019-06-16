import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';
import Chart from "react-google-charts";


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
    //  newData = JSON.stringify(this.props.text.user)
    render() {
      return (
          
        <div className='popup'>
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
                    initialValues={{name: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        this.props.loadUserData(values.name);
                        setSubmitting(false);
                    }}
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
               
           <div>
         <ul>
         <li onClick={this.togglePopup.bind(this)}>{JSON.stringify(this.props.user)}</li>
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


const mapStateToProps = (state) => {

    return {
        user: state.user,
        
    };
   
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

