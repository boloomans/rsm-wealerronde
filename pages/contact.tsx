import * as React from "react"
import { GetStaticPropsResult } from "next"
import Link from "next/link"
import { getResourceCollection, DrupalTaxonomyTerm } from "next-drupal"
import * as Yup from "yup"
import { Formik, Form, useField } from "formik";
import styled from "@emotion/styled";

import { contactFormSchema } from "../validations/contact"
import {Layout, LayoutProps} from "../components/layout";
import {PageHeader} from "../components/page-header";
import {getMenus} from "../lib/get-menus";

interface WebformPageProps extends LayoutProps{
  tags: DrupalTaxonomyTerm[]
}

export default function WebformPage2({ tags, menus }: WebformPageProps) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    // @ts-ignore
    const [field, meta] = useField(props);
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700" htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    // @ts-ignore
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <div className="space-y-3">
        <label className="checkbox block text-sm font-medium text-gray-700 align-middle">
          <input className="mr-3 align-[-3px]" {...field} {...props} type="checkbox" />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MySelect = ({ label, ...props }) => {
    // @ts-ignore
    const [field, meta] = useField(props);
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700" htmlFor={props.id || props.name}>{label}</label>
        <select className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const SignupForm = () => {
    return (
      <>
        <h1>Subscribe!</h1>
        <Formik
          initialValues={{
            name: 'Bo Loomans',
            email: '',
            subject: 'Test',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(5, 'Must be 5 characters or more')
              .required('Required*'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required*'),
            subject: Yup.string()
              .min(5, 'Must be 5 characters or more')
              .required('Required*'),
          })}
          onSubmit={async (values) => {
            await sleep(500);
            const response = await fetch(`/api/contact`, {
              method: "POST",
              body: JSON.stringify(values),
            })

            if (response.ok) {
              alert('Bedankt voor uw bericht')
            }

            // alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Jane"
              />

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />

              <MyTextInput
                label="Onderwerp"
                name="subject"
                type="text"
                placeholder="Hulpvraag"
              />

              <MyTextInput
                label="Bericht"
                name="message"
                type="textarea"
                placeholder="Hulpvraag"
              />

              <MySelect label="Tag" name="tag">
                <option value="">-- Select --</option>
                {tags.map((tag) => (
                  <option value={tag.drupal_internal__tid} key={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </MySelect>

              {/*<MyCheckbox name="acceptedTerms">*/}
              {/*  I accept the terms and conditions*/}
              {/*</MyCheckbox>*/}

              <button type="submit" className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-black disabled:bg-gray-500 disabled:opacity-10" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
      </>
    );
  };

  // This makes a POST to a custom API route.
  // The Drupal base URL and the webform_id are NOT exposed.
  return (
    <Layout title="Events" menus={menus}>
      <PageHeader heading="Contact" text="Test contact form" />
      <div className="container max-w-2xl px-6 py-10 mx-auto">
        <article className="prose lg:prose-xl">
          <div className="w-full p-6 space-y-4 border rounded-md shadow">
            <SignupForm/>
          </div>
          <p>
            <Link href="/" passHref>
              <a>Go back</a>
            </Link>
          </p>
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<
  GetStaticPropsResult<WebformPageProps>
  > {
  // Load tags terms for the contact form.
  return {
    props: {
      tags: await getResourceCollection("taxonomy_term--tags"),
      menus: await getMenus(context),
    },
  }
}
