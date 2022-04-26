import { Button, Form, Table, Spinner, } from "react-bootstrap";
import React from "react";
import {Controller, useForm} from 'react-hook-form'

export default function VerifyAccountForm(props: any) {

  const {
    setSelectedPage
  } = props

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitted},
    } = useForm()

  const onSubmit = (data: any) => {
    console.log(data);
  };



  return (
      <>
          <Form
              onSubmit={handleSubmit(onSubmit, (errors) => {
                  console.log('Error submitting form: ', errors)
              })}
              // noValidate={true}
              validated={isSubmitted}
              className="d-flex flex-column justify-content-center align-items-center"
          >
              <Table>
                  <tbody>
                  <tr>
                      <td width="100%">
                          <Form.Group>
                              <Form.Label>Verification Code</Form.Label>
                              <Controller
                                  render={({field}) => (
                                      <Form.Control
                                          required
                                          {...field}
                                          isInvalid={!!errors.verificationCode}
                                          placeholder="Enter verification code"
                                      />
                                  )}
                                  name="verificationCode"
                                  defaultValue=""
                                  control={control}
                                  rules={{
                                      required:
                                          'Please enter a verification code',
                                  }}
                              />
                              {errors.verificationCode && (
                                  <Form.Control.Feedback
                                      type={'invalid'}
                                  >
                                      {errors.verificationCode.message}
                                  </Form.Control.Feedback>
                              )}
                          </Form.Group>
                      </td>
                  </tr>
                  </tbody>
              </Table>
              <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="mt-1 w-100"
                  // disabled={loading}
              >
                  {/*{loading && (*/}
                  {/*    <>*/}
                  {/*        <Spinner animation="border" size="sm"/>*/}
                  {/*        &nbsp;*/}
                  {/*        &nbsp;*/}
                  {/*    </>*/}
                  {/*)}*/}
                  Submit
              </Button>
          </Form>
      </>
    // <form onSubmit={onSubmit} autoComplete="off">
    //   <h5 className="text-center">
    //     Enter Verification Code
    //   </h5>
    //
    //   <TextField
    //     name="verificationCode"
    //     label="Verification Code"
    //     variant="outlined"
    //     fullWidth
    //     margin="normal"
    //   />
    //
    //   <Button type="submit">
    //     Verify
    //   </Button>
    //
    //   <br />
    //   <br />
    //   <br />
    //
    //   <Button type="submit">
    //     Go back
    //   </Button>
    // </form>
  );
}
