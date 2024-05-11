"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Formik, Field, StyledTextArea, Form, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import api from "@/http";
import { useSearchParams } from "next/navigation";

const validationSchema = Yup.object().shape({
  page: Yup.string().required('Page name is required.'),
  slug: Yup.string().required('Seo slug is required.'),
  title: Yup.string().required('Title is required.'),
  metaTitle: Yup.string(),
  published: Yup.boolean().required('You want to publish this page.'),
  metaDescription: Yup.string(),
  // description: Yup.string().required('Page Description is required.'),
});

function ErrMessage({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 text-sm">{msg}</div>
      )}
    />
  );
}


const AddNewPage = () => {
  const params = useSearchParams();
  const paramsId = params.get("id")
  const [edit, setEdit] = useState(false); // page
  const [isEdit, setIsEdit] = useState(true); // input

  
  const [initialValues, setInitialValues] = useState({
    page: "",
    slug: '',
    title: '',
    metaTitle: '',
    published: false,
    metaDescription: '',
    description: '',
  })

  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState();

  useEffect(() => {
    if (paramsId) {
      setEdit(true)
      api.get(`/pages/${paramsId}`).then((response) => {
        setInitialValues(response.data.result.data)
        console.log("response.data.result.data.description::", response.data.result.data.description
        );
        setIsEdit(false)
        setValue(response.data.result.data.description)
      })
    }
    if (quill) {
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef]);

  const onSubmitHander = (data) => {
    if(isEdit && paramsId){
      data.id = paramsId
      data.description = value;
      api.put("/pages", data)
    }else{
      data.description = value;
      api.post("/pages", data)
    }
  };



  return (
    <> 
      <Breadcrumb pageName={edit? 'Update' : 'Add New Page' } />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col gap-9 col-span-3">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="">
                <h3 className="font-medium text-black dark:text-white">
                  {edit ? "Update Page" : "New Page Form"}
                </h3>
              </div>
              <div>
               {edit &&
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white "
                  type="button"
                >
                  {isEdit ? "View" : "Edit"}
                </button>
               } 
              </div>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitHander}
              enableReinitialize={true}
            >
              {({ errors, touched }) => {
                console.log(errors);
                return (
                  <Form >
                    <div className="p-6.5">
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Page Name
                          </label>
                          <Field
                            type="text"
                            name="page"
                            disabled={!isEdit}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Page name."
                          />
                          <ErrMessage name="page" />

                        </div>
                        <div className="w-full xl:w-1/2">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Seo Slug
                          </label>

                          <Field
                            type="text"
                            name="slug"
                            disabled={!isEdit}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="about-page."
                          />
                          <ErrMessage name="slug" />
                        </div>
                      </div>
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Title <span className="text-meta-1">*</span>
                        </label>

                        <Field
                          type="text"
                          name="title"
                          disabled={!isEdit}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Site name."
                        />
                        <ErrMessage name="title" />
                      </div>
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Meta Title <span className="text-meta-1">*</span>
                        </label>


                        <Field
                          type="text"
                          name="metaTitle"
                          disabled={!isEdit}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Site name."
                        />
                        <ErrMessage name="metaTitle" />
                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Meta Description
                        </label>
                        <Field
                          type="text"
                          name="metaDescription"
                          disabled={!isEdit}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Site name."
                        />
                        <ErrMessage name="metaDescription" />

                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Published
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">

                          <Field as="select" name="published"   disabled={!isEdit}
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                            <svg
                              className="fill-current"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                  fill=""
                                ></path>
                              </g>
                            </svg>
                          </span>
                          <ErrMessage name="published" />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Description
                        </label>
                        <div className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          <div ref={quillRef} >
                          </div>

                        </div>
                      </div>

                      <button type="submit"    disabled={!isEdit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                      {isEdit ? "Save Page" : "Update"}
                      </button>
                    </div>
                  </Form>

                )
              }}
            </Formik>
          </div>
        </div>

      </div>
    </>
  );
};

export default AddNewPage;
