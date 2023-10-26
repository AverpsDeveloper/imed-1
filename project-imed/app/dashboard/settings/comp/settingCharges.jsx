import api from '@/http';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';



export default () => {
    const [charges, setCharges] = useState({
        serviceCharge: 0,
        serviceRate: 0
    });

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        api('settings/charge')
            .then(d => setCharges(d.data.result.data))
    }, []);

    const chargeSchema = Yup.object().shape({
        serviceCharge: Yup.number().required().label("Service Charge"),
        serviceRate: Yup.number().required().label("Service Rate"),
    })
    const ErrMessage = ({ name }) => (
        <ErrorMessage
            name={name}
            render={(msg) => (
                <div className="text-red-500 text-sm">{msg}</div>
            )}
        />);

    const onSubmitHandler = (values) => {
        api.post('settings/charge', values)
    }

    return (
        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Charges
                    </h3>
                </div>
                <div className="p-7">
                    <Formik
                        initialValues={charges}
                        validationSchema={chargeSchema}
                        onSubmit={onSubmitHandler}
                        enableReinitialize={true}
                    >
                        {({ errors, touched }) => {
                            return (
                                <Form >
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="serviceCharge"
                                        >
                                            Service Charge
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                disabled={!isEdit}
                                                name="serviceCharge"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="serviceCharge" />
                                        </div>
                                    </div>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="serviceRate"
                                        >
                                            Service Rate
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="serviceRate"
                                                disabled={!isEdit}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                            />
                                            <ErrMessage name="serviceRate" />
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