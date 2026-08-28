'use client'

import { useState } from "react"

const PaymentMethod = ({setPayment, payment}) => {
    
    // console.log(payment);
    
    return (
        <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="mb-5 text-2xl font-bold text-gray-900">
                Payment Method
            </h2>

            <div className="space-y-3">
                <label className={`flex cursor-pointer items-center gap-4 rounded-xl hover:border-primary p-4 ${payment === 'cod' ? 'border-2 border-primary bg-orange-50' : 'border border-gray-200'}`}>
                    <input
                        onChange={() => setPayment('cod')}
                        type="radio"
                        name="payment"
                        defaultChecked
                        
                        className="h-5 w-5 accent-primary"
                    />
                    <div>
                        <p className="font-semibold text-gray-900">
                        Cash on Delivery
                        </p>
                        <p className="text-sm text-gray-500">
                        Pay when your order arrives.
                        </p>
                    </div>
                </label>

                <label className={`flex cursor-pointer items-center gap-4 rounded-xl hover:border-primary p-4 ${payment === 'stripe' ? 'border-2 border-primary bg-orange-50' : 'border border-gray-200'}`}>
                    <input
                        onChange={() => setPayment('stripe')}
                        type="radio"
                        name="payment"
                        className="h-5 w-5 accent-primary"
                    />
                    <div>
                        <p className="font-semibold text-gray-900">
                        Online Payment
                        </p>
                        <p className="text-sm text-gray-500">
                        Pay securely using your card or mobile payment.
                        </p>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default PaymentMethod