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
      <div className="container mx-auto max-w-2xl px-6 py-10">
        <article className="prose lg:prose-xl">
          <div className="w-full max-w-md space-y-4 rounded-md border p-6 shadow">
            {status === "error" ? (
              <div className="text-red-600 bg-red-100 border-red-200 rounded-md px-4 py-2 text-sm">
                An error occured. Please try again.
              </div>
            ) : null}
            {status === "success" ? (
              <div className="text-green-600 bg-green-100 border-green-200 rounded-md px-4 py-2 text-sm">
                Your message has been sent. Thank you.
              </div>
            ) : null}
            {Object.values(formState.errors)?.length ? (
              <div className="text-red-600 bg-red-100 border-red-200 rounded-md px-4 py-2 text-sm">
                {Object.values(formState.errors).map((error, index) => (
                  <p key={index}>{error.message}</p>
                ))}
              </div>
            ) : null}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-black focus:border-black relative mt-1 block w-full appearance-none rounded-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                  {...register("name")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-black focus:border-black relative mt-1 block w-full appearance-none rounded-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                  {...register("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="tag"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Team
                </label>
                <select
                  id="tag"
                  name="tag"
                  className="text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-black focus:border-black relative mt-1 block w-full appearance-none rounded-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
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
                  className="text-gray-700 block text-sm font-medium"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  className="text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-black focus:border-black relative mt-1 block w-full appearance-none rounded-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                  {...register("subject")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="text-gray-900 placeholder:text-gray-500 border-gray-300 focus:ring-black focus:border-black relative mt-1 block h-32 w-full appearance-none rounded-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                  {...register("message")}
                ></textarea>
              </div>
              <button
                type="submit"
                data-cy="btn-submit"
                className="text-white bg-black border-transparent hover:bg-black flex justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm"
              >
                Submit
              </button>
            </form>
          </div>
          <p>
            <Link href="/" passHref>
              Go back
            </Link>
          </p>
        </article>
      </div>
    </Layout>
  );
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
