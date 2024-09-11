import React from 'react'
import {Formik,Form,Field,ErrorMessage,FieldArray, FastField} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { useState } from 'react'
const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments:'',
    address:'',
    social:{
        facebook:'',
        twitter:''
    },
    phoneNumbers: ['', ''],
    phNumbers:['']
  }
  const savedValues = {
    name: 'Mani',
    email: 'Mani@example.com',
    channel: 'raect',
    comments: 'Welcome to Formik',
    address: '221B Baker Street',
    social: {
      facebook: '',
      twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
  }
const onSubmit=(values,onSubmitProps)=>{
    console.log('Form data',values)
    console.log('on submit props',onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
   }
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    channel: Yup.string().required('Required')
  })
  const validateComments=(value)=>{
    let error
    if(!value){
      error='Required'
    }
    return error
  }
function YoutubeForm() {
  const [formValues, setFormValues] = useState(null)
  return (
     <Formik
      initialValues={formValues || initialValues}
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
      //validateOnMount
      enableReinitialize
      >
        {/* <Formik  
        initialValues={initialValues} 
        onSubmit={onSubmit}
         validationSchema={validationSchema} 
         validateOnChange={false}
         validateOnBlur={false}
        > */}
        {formik=>{
            console.log('Formik props', formik)
            return(
              <Form>
      <div className='form-control'>
        <label htmlFor='name'>Name</label>
        <Field type='text'  id='name' name='name' placeholder="Enter name"></Field>
        <ErrorMessage name='name' component={TextError}/>
        </div>
        <div className='form-control'>
        <label htmlFor='email'>Email</label>
        <Field type='email' name='email' id='email'></Field>
        <ErrorMessage name='email'>
            {errorMsg=><div className='error'>{errorMsg}</div>}
        </ErrorMessage>
        </div>
        <div className='form-control'>
        <label htmlFor='channel'>Channel</label>
        <Field type='text' name='channel' id='channel'></Field>
        <ErrorMessage name='channel'/>
        </div>
        <div className='form-control'>
        <label htmlFor='comments'>Comments</label>
        <Field as='textarea' type='text' name='comments' id='comments' validate={validateComments}></Field>
        <ErrorMessage name='comments' component={TextError}></ErrorMessage>
        </div>
        <div className='form-control'>
        <label htmlFor='address'>Address</label>
        {/* <Field name='address'> */}
        <FastField name='address'>
        {
                (props)=>{
                  console.log('fastfield')
                    const {field,form,meta}=props
                    console.log('render props',props)
                  return (<div>
                    <input type='text' id='address' {...field}></input>
                  {meta.touched &&meta.error?<div>{meta.error}</div>:null}
                  </div> 
                  )
                }
            }
        {/* </Field> */}
        </FastField>
        </div>
        <div className='form-control'>
        <label htmlFor='facebook'>facebook</label>
        <Field  type='text' name='social.facebook' id='facebook'></Field>
        </div>
        <div className='form-control'>
        <label htmlFor='twitter'>twitter</label>
        <Field  type='text' name='social.twitter' id='twitter'></Field>
        </div>

        <div className='form-control'>
              <label htmlFor='primaryPh'>Primary phone number</label>
              <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
            </div>

            <div className='form-control'>
              <label htmlFor='secondaryPh'>Secondary phone number</label>
              <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
            </div>
            <div className='form-control'>
              <label>List of phone numbers</label>
              <FieldArray name='phNumbers'>
                {fieldArrayProps => {
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phNumbers } = values
                  // console.log('fieldArrayProps', fieldArrayProps)
                  // console.log('Form errors', form.errors)
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              {''}
                             - {''}   
                            </button>
                          )}
                          <button type='button' onClick={() => push('')}>
                          {''}
                          +{''}
                      </button>
                        </div>
                      ))}
                      
                    </div>
                  )
                }}
              </FieldArray>
            </div>
            {/* <button type='submit'disabled={!formik.isValid}>Submit</button> */}
        {/* <button type='submit'disabled={!(formik.dirty &&formik.isValid)}>Submit</button> */}
        <button type='button' onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type='reset'>Reset</button>
        <button type='submit'disabled={!formik.isValid ||formik.isSubmitting}>Submit</button>
      </Form>
            )
        }}
      
    </Formik>
    
  )
}

export default YoutubeForm
