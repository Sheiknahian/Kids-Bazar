'use client'

import Image from "next/image"

const PaymentModal = ({setModal, setGateway}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                    Select Payment Method
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                    Choose your preferred online payment option
                    </p>
                </div>

                <button onClick={() => {setModal(false)}}  className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                    </svg>
                </button>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">

            {/* bKash */}
            <button className="group cursor-pointer flex w-full items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition hover:border-primary hover:bg-primary/5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E2136E]">
                    <Image width={500} height={500} alt="bkash" src={'/bkash.png'}></Image>
                </div>

                <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-gray-900">
                    bKash
                </p>
                <p className="text-sm text-gray-500">
                    Pay securely with bKash
                </p>
                </div>

                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 18 6-6-6-6"
                />
                </svg>
            </button>

            {/* Stripe */}
            <button onClick={() => setGateway('stripe')} className="group cursor-pointer flex w-full items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition hover:border-primary hover:bg-primary/5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#635BFF]">
                <svg
                    viewBox="0 0 64 64"
                    className="h-9 w-9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                    x="7"
                    y="15"
                    width="50"
                    height="34"
                    rx="7"
                    fill="white"
                    />
                    <path
                    d="M42 25c-2-1-5-2-8-2-5 0-8 3-8 7 0 7 10 6 10 9 0 1-1 2-3 2-3 0-6-1-9-3v6c2 1 5 2 9 2 5 0 8-3 8-7 0-7-10-6-10-9 0-1 1-2 3-2 3 0 6 1 8 2v-5Z"
                    fill="#635BFF"
                    />
                </svg>
                </div>

                <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-gray-900">
                    Stripe
                </p>
                <p className="text-sm text-gray-500">
                    Debit or credit card
                </p>
                </div>

                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-primary"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 18 6-6-6-6"
                />
                </svg>
            </button>

            </div>

            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-4 w-4"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3 5 6v5c0 4.5 2.9 8.4 7 10 4.1-1.6 7-5.5 7-10V6l-7-3Z"
                />
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 12 2 2 4-4"
                />
            </svg>

            Secure & encrypted payment
            </div>

        </div>
    </div>
  )
}

export default PaymentModal