"use client"
import React from 'react'
import { Disclosure } from '@headlessui/react';
const faqs = [
    {
        id: 1,
        question: 'What is your refund policy?',
        answer: `If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.`
    },
    {
        id: 2,
        question: 'How long does it take to get my order?',
        answer: `Most customers can expect to receive their food and supplies within 1 to 3 days. Orders that require prescription approval or personalization may take longer to ship.`
    },
    {
        id: 3,
        question: 'Do you offer technical support?',
        answer: `No.`
    },
    {
        id: 4,
        question: 'How much is shipping?',
        answer: `Orders over $49 ship free! All other orders ship for a flat rate of $4.95.`
    },
    {
        id: 5,
        question: 'How do I contact support?',
        answer: `We offer support over email, and the best way to contact us is through the in-app help menu.`
    }
]

const FAQSection = () => {
    return (
        <div className="container my-24 mx-auto md:px-6 xl:px-24">
            <section className="mb-32 grid grid-cols-1 md:grid-cols-2">
                <h2 className="mx-auto mb-6 pl-6 text-title-xxl font-bold">Frequently asked questions</h2>
                <div id="accordionFlushExample">
                    <div className="rounded-none border border-t-0 border-l-0 border-r-0">
                        {faqs.map((faq) => (
                            <Disclosure key={faq.id}>
                                <div className={`${faq.id}`}>
                                    <Disclosure.Button className="text-title-md group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-iTextPrimary">
                                        {faq.question}
                                        <span
                                            className="ml-auto h-5 w-5 shrink-0 rotate-[0deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#8FAEE0] dark:group-[[data-te-collapse-collapsed]]:fill-[#eee]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </span>
                                    </Disclosure.Button>

                                    <Disclosure.Panel className="text-gray-700 flex w-full justify-between rounded-lg px-4 mb-2 text-left text-sm">
                                        {faq.answer}
                                    </Disclosure.Panel>
                                </div>
                            </Disclosure>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FAQSection