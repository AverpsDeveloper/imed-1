import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import api from '@/http';

export default () => {
    const [site, setSite] = useState({
        name: 'example@gmail.com',
        url: "12345",
        adminEmail: "",
        supportEmail: ""
    });

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        api('settings/site')
            .then(d => setSite(d.data.result.data))
    }, []);

    const siteSchema = Yup.object().shape({
        name: Yup.string().required().label("Name"),
        url: Yup.string().required().label("URL"),
        adminEmail: Yup.string().email().required().label("Admin Email"),
        supportEmail: Yup.string().email().required().label("Support Email"),
    })
    const ErrMessage = ({ name }) => (
        <ErrorMessage
            name={name}
            render={(msg) => (
                <div className="text-red-500 text-sm">{msg}</div>
            )}
        />);

    const onSubmitHandler = (values) => {
        api.post('settings/site', values)
    }

    return (
        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Configuration and Settings
                    </h3>
                </div>
                <div className="p-7">
                    <Formik
                        initialValues={site}
                        validationSchema={siteSchema}
                        onSubmit={onSubmitHandler}
                        enableReinitialize={true}
                    >
                        {({ errors, touched }) => {
                            return (
                                <Form >
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="name"
                                        >
                                            name
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                disabled={!isEdit}
                                                name="name"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="name" />
                                        </div>
                                    </div>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="url"
                                        >
                                            url
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="url"
                                                disabled={!isEdit}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="url" />
                                        </div>
                                    </div>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="adminEmail"
                                        >
                                            Admin Email
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="adminEmail"
                                                disabled={!isEdit}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="adminEmail" />
                                        </div>
                                    </div>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="supportEmail"
                                        >
                                            Support Email
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="supportEmail"
                                                disabled={!isEdit}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="supportEmail" />
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