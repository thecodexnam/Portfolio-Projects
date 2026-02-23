'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        goal: '',
        whatsapp: '',
        weight: '',
        height: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                age: '',
                gender: '',
                goal: '',
                whatsapp: '',
                weight: '',
                height: '',
            });
        }, 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative group">
            {/* Dynamic Background Glow for Form */}
            <div className="absolute -inset-1 bg-gradient-to-br from-ocean-blue/20 via-transparent to-ocean-teal/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative glass p-8 sm:p-12 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all shadow-2xl shadow-black/50 overflow-hidden">
                {/* Internal Decorative Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-ocean-blue/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-ocean-teal/5 rounded-full -ml-32 -mb-32 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 space-y-12">
                    {submitted ? (
                        <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-gradient-to-br from-ocean-blue to-ocean-teal rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-ocean-blue/40">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-white uppercase tracking-tight">Application Sent!</h3>
                                <p className="text-gray-400 text-lg">Thank you, <span className="text-white font-bold">{formData.name}</span>. We&apos;ll reach out via WhatsApp within 24 hours.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Personal Information Group */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className="h-px flex-grow bg-gradient-to-r from-transparent to-white/10"></div>
                                    <h3 className="text-sm font-black text-ocean-blue uppercase tracking-[0.2em] whitespace-nowrap">
                                        Personal Info
                                    </h3>
                                    <div className="h-px flex-grow bg-gradient-to-l from-transparent to-white/10"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-ocean-blue/50 focus:ring-1 focus:ring-ocean-blue/30 transition-all hover:bg-white/[0.07]"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Age */}
                                    <div className="space-y-2">
                                        <label htmlFor="age" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            id="age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            required
                                            min={15}
                                            max={80}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-ocean-blue/50 focus:ring-1 focus:ring-ocean-blue/30 transition-all hover:bg-white/[0.07]"
                                            placeholder="25"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="space-y-2">
                                        <label htmlFor="gender" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-ocean-blue/50 focus:ring-1 focus:ring-ocean-blue/30 transition-all hover:bg-white/[0.07] appearance-none"
                                        >
                                            <option value="" className="bg-[#0f0f0f]">Select</option>
                                            <option value="male" className="bg-[#0f0f0f]">Male</option>
                                            <option value="female" className="bg-[#0f0f0f]">Female</option>
                                            <option value="other" className="bg-[#0f0f0f]">Other</option>
                                        </select>
                                    </div>

                                    {/* WhatsApp */}
                                    <div className="space-y-2">
                                        <label htmlFor="whatsapp" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                            WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            id="whatsapp"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-ocean-blue/50 focus:ring-1 focus:ring-ocean-blue/30 transition-all hover:bg-white/[0.07]"
                                            placeholder="+91"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Fitness Details Group */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className="h-px flex-grow bg-gradient-to-r from-transparent to-white/10"></div>
                                    <h3 className="text-sm font-black text-ocean-teal uppercase tracking-[0.2em] whitespace-nowrap">
                                        Fitness Goal
                                    </h3>
                                    <div className="h-px flex-grow bg-gradient-to-l from-transparent to-white/10"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Goal */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label htmlFor="goal" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                            What is your main objective?
                                        </label>
                                        <select
                                            id="goal"
                                            name="goal"
                                            value={formData.goal}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-ocean-blue/50 focus:ring-1 focus:ring-ocean-blue/30 transition-all hover:bg-white/[0.07] appearance-none"
                                        >
                                            <option value="" className="bg-[#0f0f0f]">Choose Goal</option>
                                            <option value="fat-loss" className="bg-[#0f0f0f]">Fat Loss</option>
                                            <option value="muscle-gain" className="bg-[#0f0f0f]">Muscle Gain</option>
                                            <option value="stage-prep" className="bg-[#0f0f0f]">Stage Prep</option>
                                            <option value="general-fitness" className="bg-[#0f0f0f]">General Fitness</option>
                                        </select>
                                    </div>

                                    {/* Weight */}
                                    <div className="space-y-2">
                                        <label htmlFor="weight" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            id="weight"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-ocean-blue/50 focus:ring-1 focus:ring-ocean-blue/30 transition-all hover:bg-white/[0.07]"
                                            placeholder="75"
                                        />
                                    </div>

                                    {/* Height */}
                                    <div className="space-y-2">
                                        <label htmlFor="height" className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                            Height (cm)
                                        </label>
                                        <input
                                            type="number"
                                            id="height"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-ocean-blue/50 focus:ring-1 focus:ring-ocean-blue/30 transition-all hover:bg-white/[0.07]"
                                            placeholder="175"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full relative overflow-hidden group/btn"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo opacity-100 transition-opacity duration-500 group-hover/btn:opacity-90"></div>
                                    <div className="relative z-10 flex items-center justify-center space-x-3 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all group-hover/btn:tracking-widest filter drop-shadow-lg uppercase">
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Submitting...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Apply for Coaching</span>
                                                <svg className="w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </div>
                                </button>
                                <p className="text-center text-gray-500 text-xs mt-6 font-medium uppercase tracking-[0.2em]">
                                    Secure & Confidential Application
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
