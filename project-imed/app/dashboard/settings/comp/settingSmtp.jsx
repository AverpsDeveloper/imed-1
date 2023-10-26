import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import api from '@/http';

export default () => {
    const [googleSmtp, setGoogleSmtp] = useState({
        email: 'example@gmail.com',
        password: "12345",
    });

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        api('settings/smtp')
            .then(d => setGoogleSmtp(d.data.result.data.google))
    }, []);

    const smtpSchema = Yup.object().shape({
        email: Yup.string().email().required().label("Email"),
        password: Yup.string().required().label("Password"),
    })
    const ErrMessage = ({ name }) => (
        <ErrorMessage
            name={name}
            render={(msg) => (
                <div className="text-red-500 text-sm">{msg}</div>
            )}
        />);

    const onSubmitHandler = (values) => {
        api.post('settings/smtp', { google: values })
    }

    return (
        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Google SMTP Configuration Setup
                    </h3>
                </div>
                <div className="p-7">
                    <Formik
                        initialValues={googleSmtp}
                        validationSchema={smtpSchema}
                        onSubmit={onSubmitHandler}
                        enableReinitialize={true}
                    >
                        {({ errors, touched }) => {
                            return (
                                <Form >
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="email"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="email"
                                                disabled={!isEdit}
                                                name="email"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="email" />
                                        </div>
                                    </div>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="password"
                                                disabled={!isEdit}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="password" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            onClick={() => setIsEdit(!isEdit)}
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white "
                                            type="button"
                                        >
                                            {isEdit ? "View" : "Edit"}
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95 disabled:bg-opacity-60 disabled:cursor-not-allowed"
                                            type="submit"
                                            disabled={!isEdit}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )

}