import * as React from "react"
import { GetStaticPropsResult } from "next"
import Link from "next/link"
import { getResourceCollection, DrupalTaxonomyTerm } from "next-drupal"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { contactFormSchema } from "../validations/contact"
import {Layout, LayoutProps} from "../components/layout";
import {PageHeader} from "../components/page-header";
import {getMenus} from "../lib/get-menus";

type FormData = yup.TypeOf<typeof contactFormSchema>

interface WebformPageProps extends LayoutProps{
  tags: DrupalTaxonomyTerm[]
}

export default function WebformPage({ tags, menus }: WebformPageProps) {
  const [status, setStatus] = React.useState<"error" | "success">()
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: yupResolver(contactFormSchema),
  })

  // This makes a POST to a custom API route.
  // The Drupal base URL and the webform_id are NOT exposed.
  async function onSubmit(data: FormData) {
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (response.ok) {
      reset()
      return setStatus("success")
    }

    return setStatus("error")
  }

  return (
    <Layout title="Events" menus={menus}>
      <PageHeader heading="Contact" text="Test contact form" />
      <div className="container max-w-2xl px-6 py-10 mx-auto">
        <article className="prose lg:prose-xl">
          <div className="w-full max-w-md p-6 space-y-4 border rounded-md shadow">
            {status === "error" ? (
              <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">
                An error occured. Please try again.
              </div>
            ) : null}
            {status === "success" ? (
              <div className="px-4 py-2 text-sm text-green-600 bg-green-100 border-green-200 rounded-md">
                Your message has been sent. Thank you.
              </div>
            ) : null}
            {Object.values(formState.errors)?.length ? (
              <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">
                {Object.values(formState.errors).map((error, index) => (
                  <p key={index}>{error.message}</p>
                ))}
              </div>
            ) : null}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  {...register("name")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  {...register("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700"
                >
                  Team
                </label>
                <select
                  id="tag"
                  name="tag"
                  className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  {...register("tag")}
                >
                  <option value="">-- Select --</option>
                  {tags.map((tag) => (
                    <option value={tag.drupal_internal__tid} key={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  {...register("subject")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="relative block w-full h-32 px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  {...register("message")}
                ></textarea>
              </div>
              <button
                type="submit"
                data-cy="btn-submit"
                className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-black"
              >
                Submit
              </button>
            </form>
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
